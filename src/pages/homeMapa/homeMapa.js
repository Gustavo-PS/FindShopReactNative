import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { Armazenar, Buscar, Apagar } from '../../asyncStorage';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMercado } from '../../services';
import { RefreshControl } from 'react-native-web';


export default function HomeMapa({ navigation }) {

  const BuscarMercado = async (chave) => {
    const valor = await AsyncStorage.getItem(chave)
    setMercado(valor)
  }

  const [mercado, setMercado] = useState(mercado)
  const [flag, setFlag] = useState(false)

  //useEffect para executar quando entrar no componente
  useEffect(() => {
    setMercado(BuscarMercado('mercado'))
    setMercado(mercado)
    if (!flag) {
      setTimeout(() => {
        setMercado(mercado)
        setFlag(true)
      }, 1000);
    }
  }, [mercado])


  if (mercado == null) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View style={styles.body}>
      <Text style={styles.titulo}>Você está em:</Text>
      <Text style={styles.titulo}>{mercado}</Text>
      <Image style={styles.mapa} source={require('../../../assets/mapa.png')} />
      <Text style={styles.endereco}>Estrada dos Alvarengas, 4001 - São Bernardo do Campo - SP, 09850-550</Text>

      <TouchableOpacity style={styles.btnNavegar} onPress={() => navigation.navigate('NavMapa')}>
        <Text style={styles.txtBtnNavegar}>Navegar no Mapa</Text>
        <Ionicons name="map" size={18} color={color1} />
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const colorBg = 'white';
const color1 = '#DE4C45';
const color2 = '#C1C5C7';

const styles = StyleSheet.create({

  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorBg,
  },
  titulo: {
    fontSize: 30,
    color: color1,
    fontFamily: 'Montserrat_500Medium',
    textAlign: 'center'
  },

  endereco: {
    fontSize: 15,
    color: color1,
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'center',
    marginHorizontal: '10%'
  },
  mapa: {
    height: 300,
    width: 300,
    marginVertical: 40
  },
  btnNavegar: {
    backgroundColor: color2,
    width: "60%",
    height: "7%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: '7%'
  },

  txtBtnNavegar: {
    fontFamily: 'Montserrat_400Regular',
    color: color1,
    margin: 5,
    fontSize: 18
  },
});
