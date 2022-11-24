import React, { useEffect, useState } from 'react';
import { Armazenar, Buscar, Apagar } from './asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function postLogin(guid, id) {

    debugger

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "establishment": id,
        "password": guid
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://findshop-dev.azurewebsites.net/api/v1/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.token)
            AsyncStorage.setItem('token', result.token)
            getMercado(result.token, id)
        })
        .catch(error => console.log('error', error));

}


export function getMercado(token, id) {

    debugger

    var myHeaders = new Headers();
    myHeaders.append("access-token", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://findshop-dev.azurewebsites.net/api/v1/establishments/" + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.name)
            AsyncStorage.setItem('mercado', result.name);
        })
        .catch(error => console.log('error', error));


}


export const getProdutos = (token, idMercado) => {

    debugger

    var myHeaders = new Headers();
    myHeaders.append("access-token", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://findshop-dev.azurewebsites.net/api/v1/products/" + idMercado, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log('abc')
            console.log(result.name)
            return result.name          
        })       
        .catch(error => console.log('error', error));
}
