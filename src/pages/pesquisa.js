import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { getProdutos } from '../services';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list';
import { Buscar } from '../asyncStorage';
import { AutoFocus } from 'expo-camera';

let img = [
  require('../../assets/mercado1/Feira.jpeg'),
  require('../../assets/mercado1/Frutas.jpeg'),
  require('../../assets/mercado1/Grãos.jpeg'),
]


export default function Pesquisa(props) {

  const [products, setProducts] = useState("")
  const [produtos, setProdutos] = useState("")
  const [secoes, setSecoes] = useState("")

  const BuscarToken = async (chave) => {
    const valor = await AsyncStorage.getItem(chave)
    setToken(valor)
  }

  const BuscarIdMercado = async (chave) => {
    const valor = await AsyncStorage.getItem(chave)
    setIdMercado(valor)
  }

  const [idMercado, setIdMercado] = useState(idMercado)
  const [token, setToken] = useState(token)
  const [flag, setFlag] = useState(false)

  //useEffect para executar quando entrar no componente
  useEffect(() => {
    setToken(BuscarToken('token'))
    setToken(token)
    setIdMercado(BuscarIdMercado('idMercado'))
    setIdMercado(idMercado)
    if (!flag) {
      setTimeout(() => {
        setToken(token)
        setIdMercado(idMercado)
        setFlag(true)
      }, 1000);
    }
  }, [token])


  //getProdutos
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("access-token", token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://findshop-dev.azurewebsites.net/api/v1/products/", requestOptions)
      .then(response => response.json())
      .then(result => {
        setProducts(result)
        validateProducts(products, idMercado)
      })
      .catch(error => console.log('error', error));
  }, [token])


  const [selected, setSelected] = useState("")
  let secao = selected.split('#')[1]
  let prduto = selected.split('#')[0]
  //let imagem = require('../../assets/mercado'+idMercado+'/'+secao+'.png')

  console.log(products)
  console.log(produtos)

  function validateProducts(produtos, mercado) {
    var returnProducts = [];
    var returnSession = [];
    var auxObj;
    var nameConcat;
    var nameSession;
    let count = -1
    for (var i = 0; i < produtos.length; i++) {

      if (produtos[i].establishment_session_id == 1)
        nameSession = 'Grãos';
      else if (produtos[i].establishment_session_id == 2)
        nameSession = 'Frutas';
      else
        nameSession = 'Feira';

      if (produtos[i].establishmentid == mercado) {
        count = count + 1
        nameConcat = produtos[i].name + '#' + nameSession + '#' + count + '#' + produtos[i].image;
        auxObj = [{ key: nameConcat, value: produtos[i].name }];
        returnProducts.push(auxObj[0]);

        nameConcatSecao = '#' + nameSession + '#' + count;
        auxObjSecao = [{ key: nameConcatSecao, value: nameSession }];
        returnSession.push(auxObjSecao[0]);
      }
    }
    setProdutos(returnProducts);
    setSecoes(returnSession);
  }


  const [listaProdutos, setListaProdutos] = useState("")

  function addProduto(produto){
    var returnProducts = !listaProdutos.length ? [] : JSON.parse(listaProdutos) ;
    var auxObj =[{ produto: produto.split('#')[0], secao: produto.split('#')[1], idSecao: produto.split('#')[2], imagem: produto.split('#')[3], index: !listaProdutos.length ? 0 : JSON.parse(listaProdutos).length}];
    returnProducts.push(auxObj[0]);
    var jsonValue = JSON.stringify(returnProducts)
    setListaProdutos(jsonValue)
    AsyncStorage.setItem('listaProdutos', jsonValue)
    alert('Produto: '+ produto.split('#')[0]+' adicionado à lista de produtos')
  }

  return (

    <View style={styles.body}>

      <View style={styles.container}>
        <SelectList data={produtos} setSelected={setSelected}
          placeholder='Produto'
          boxStyles={styles.input}
          inputStyles={styles.input}
          dropdownStyles={styles.inputDrop}
          dropdownItemStyles={styles.inputDropItem}
          dropdownTextStyles={styles.inputDropText}>
        </SelectList>
      </View>

      <View style={styles.container}>
        <SelectList data={secoes} setSelected={setSelected}
          placeholder='Seção'
          boxStyles={styles.input}
          inputStyles={styles.input}
          dropdownStyles={styles.inputDrop}
          dropdownItemStyles={styles.inputDropItem}
          dropdownTextStyles={styles.inputDropText}>
        </SelectList>
      </View>


      <View style={styles.produtos}>
        <View style={styles.chartProduto}>
          <Image style={styles.imgSecao} source={require('../../assets/seção.png')} />
          <View style={styles.infoItem}>
            <Text style={styles.item}>{selected.split('#')[1]}</Text>
          </View>
        </View>

        <View style={styles.chartProduto}>
          <Image style={{ width: '25%', height: '80%' }} source={{ uri: selected.split('#')[3] }} />
          <View style={styles.infoItem}>
            <Text style={styles.item}>{selected.split('#')[0]}</Text>
            <Text style={styles.secao}>{selected.split('#')[1]}</Text>
          </View>
          <TouchableOpacity style={styles.addItem} onPress={() => addProduto(selected)}>
            <Ionicons name="add" size={40} color={color1} />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Image style ={styles.mapa} source={img[selected.split('#')[2]]} />
        </View>

      </View>

    </View>
  );
}

const colorBg = 'white';
const color1 = '#DE4C45';
const color2 = '#C1C5C7';

const styles = StyleSheet.create({
  body: {
    backgroundColor: colorBg,
    flex: 1,
    paddingTop: 50,
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginVertical: 10,
    width: '100%',
  },

  input: {
    fontFamily: 'Montserrat_400Regular',
    width: '95%',
    backgroundColor: color2,
    borderColor: colorBg,
    color: color1
  },

  inputDrop: {
    fontFamily: 'Montserrat_400Regular',
    backgroundColor: color2,
    borderColor: colorBg,
    maxHeight: 100
  },

  inputDropText: {
    color: color1
  },


  produtos: {
    height: 300,
    width: "100%",
    height: "46%",
    padding: 25,

  },

  imgSecao: {
    width: 70,
    height: 70
  },

  chartProduto: {
    width: "100%",
    height: 100,
    flexDirection: 'row',
    marginVertical: "5%"
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

  addItem: {
    position: 'absolute',
    right: 3,
    marginTop: "6%",
  },

  mapa: {
    height: '80%',
    width: '100%',
  }
});
