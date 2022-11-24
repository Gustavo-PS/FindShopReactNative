import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import navMapa from './navMapa';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

let img = [
  require('../../../assets/mercado1/Feira.jpeg'),
  require('../../../assets/mercado1/Frutas.jpeg'),
  require('../../../assets/mercado1/Grãos.jpeg'),
]

export default function Lista({ navigation }) {


  debugger

  const BuscarMercado = async (chave) => {
    const valor = await AsyncStorage.getItem(chave)
    setMercado(valor)
  }

  const [mercado, setMercado] = useState(mercado)
  const [flag, setFlag] = useState(false)

  //useEffect para executar quando entrar no componente
  useEffect(() => {
    setMercado(BuscarMercado('listaProdutos'))
    setMercado(mercado)
    if (!flag) {
      setTimeout(() => {
        setMercado(mercado)
        setFlag(true)
      }, 1000);
    }
  }, [mercado])

  var produtos = mercado != undefined ? JSON.parse(mercado) : [{ key: "teste", valor: "teste" }];
  //alert(mercado);

  const [imagem, setImagem] = useState(null)

  function selectProduto(produto) {
    setImagem(img[produto])
    setMercado(BuscarMercado('listaProdutos'))
    setMercado(mercado)
  }

  function deleteProduto(i) {
    let data = JSON.parse(mercado)
    data.splice(i,1)
    setMercado(JSON.stringify(data))
    alert('Produto Excluído com sucesso!')
    AsyncStorage.setItem('listaProdutos', JSON.stringify(data))
  }

  function findProduto(i) {
    return i.index === 1;
  }

  return (

    <View style={styles.body}>

      <View style={styles.produtos}>
        <ScrollView >
          {produtos.map((produto) => {
            return (

              <View style={styles.chartProduto}>
                <TouchableOpacity style={styles.chartProduto} onPress={() => selectProduto(produto.idSecao)}>
                  <Image style={{ width: '25%', height: '80%' }} source={{ uri: produto.imagem }} />
                  <View style={styles.infoItem}>
                    <Text style={styles.item}>{produto.produto}</Text>
                    <Text style={styles.secao}>{produto.secao}</Text>
                  </View>

                  <TouchableOpacity style={styles.deleteItem} onPress={() => deleteProduto(produto.index)}>
                    <Ionicons name="trash" size={35} color={color1} />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <Image style={styles.mapa} source={imagem} />
      <TouchableOpacity style={styles.btnNavegar} onPress={() => navigation.navigate('NavMapa', { imagem: imagem })}>
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
    backgroundColor: colorBg,
    paddingTop: '10%',
    height: "100%"
  },

  produtos: {
    height: 300,
    width: "100%",
    height: "46%",
    padding: 25
  },

  chartProduto: {
    width: "100%",
    height: 100,
    flexDirection: 'row'
  },

  infoItem: {
    marginTop: 10
  },

  item: {
    fontFamily: 'Montserrat_400Regular',
    color: color1,
    fontSize: 26,
    marginLeft: 20
  },

  secao: {
    fontFamily: 'Montserrat_400Regular',
    color: color1,
    fontSize: 18,
    marginLeft: 20,
  },

  deleteItem: {
    position: 'absolute',
    right: 3,
    marginTop: "6%",
  },

  btnNavegar: {
    backgroundColor: color2,
    width: "60%",
    height: "7%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: '4%'
  },

  txtBtnNavegar: {
    fontFamily: 'Montserrat_400Regular',
    color: color1,
    margin: 5,
    fontSize: 18
  },

  mapa: {
    height: '28%',
    width: '65%',
    margin: "4%"
  }
});
