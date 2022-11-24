import { StyleSheet, Text, View, Image, ActivityIndicator, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getMercado, postLogin } from './src/services';

import { Armazenar, Buscar, Apagar } from './src/asyncStorage';
import Pesquisa from './src/pages/pesquisa';


export default function App() {


  const BuscarMercado = async (chave) => {
    const valor = await AsyncStorage.getItem(chave)
    setMercado(valor)
  }

  const [mercado, setMercado] = useState(BuscarMercado('idMercado'));

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold
  });

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  //useEffect para executar quando entrar no componente
  useEffect(() => {
    setMercado(BuscarMercado('idMercado'))
    setMercado(mercado)
  }, [])

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    if (data.length == 38) {
      setScanned(true);
      AsyncStorage.setItem('idMercado', data.split('#')[1])
      postLogin(data.split('#')[0], data.split('#')[1])
      alert('Código Escaneado com Sucesso!')
    } else {
      alert('Código Inválido!')
    }
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!fontsLoaded) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }

  if (mercado == null) {
    return (
      <NavigationContainer style={styles.container}>
        <Text style={styles.titulo}>Bem Vindo!</Text>
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          >
          </BarCodeScanner>
          {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
        <Text style={styles.subtitulo}>Escaneie o QR code do mercado para começar</Text>
      </NavigationContainer>

    );
  } 

    return (
      <NavigationContainer>
        <Routes></Routes>
      </NavigationContainer>
    );


}

const colorBg = '#DE4C45';
const color1 = '#F6EEE0';
const color2 = '#C1C5C7';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorBg,
  },

  titulo: {
    fontSize: 40,
    color: color1,
    fontFamily: 'Montserrat_500Medium',
    backgroundColor: colorBg,
    textAlign: 'center',
    paddingTop: "20%"
  },

  subtitulo: {
    fontSize: 20,
    color: color1,
    fontFamily: 'Montserrat_400Regular',
    backgroundColor: colorBg,
    textAlign: 'center',
    paddingBottom: "10%",
    paddingHorizontal: "3%"
  },
});
