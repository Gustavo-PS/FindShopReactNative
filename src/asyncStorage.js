import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';

  export const Armazenar = async (chave, valor) => {
    await AsyncStorage.setItem(chave, valor)
  }

  export const Buscar = async (chave, setValor) => {
    const valor = await AsyncStorage.getItem(chave)
    setValor(valor)
  }

  export const Apagar = (chave) => {
    AsyncStorage.clear()
  }