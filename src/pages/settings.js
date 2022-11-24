import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, BackHandler } from 'react-native';
import { Armazenar, Buscar, Apagar } from '../asyncStorage';
import { NativeModules } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import CodePush from 'react-native-code-push';
import RNRestart from 'react-native-restart';
import { Updates } from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Settings() {
  const Logoff = (chave) => {
    AsyncStorage.clear()
    alert('Até mais!')
    BackHandler.exitApp();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ao sair do mercado você exclui sua lista de produtos e perde o acesso ao menu do mercado, voce está certo disso?</Text>
      <TouchableOpacity style={styles.btnLogoff} onPress={() => Logoff('mercado')}>
        <Text style={styles.txtBtnLogoff}>Sair do mercado</Text>
        <Ionicons name="log-out" size={24} color={color1} />
      </TouchableOpacity>
      <Image style={styles.mapa} source={require('../../assets/logout.png')} />
    </View>
  );
}

const colorBg = 'white';
const color1 = '#DE4C45';
const color2 = '#C1C5C7';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorBg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 25,
    color: color1,
    fontFamily: 'Montserrat_400Regular',
    marginHorizontal:"15%",
    textAlign:'center',
    marginVertical: '7%'
  },

  btnLogoff: {
    backgroundColor: color2,
    width: "60%",
    height: "7%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: '7%'
  },

  txtBtnLogoff: {
    fontFamily: 'Montserrat_400Regular',
    color: color1,
    margin: 5,
    fontSize: 18
  },

  mapa: {
    height: 220,
    width: 300,
    marginVertical: 20
  },
});
