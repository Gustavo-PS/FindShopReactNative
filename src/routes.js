import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import Pesquisa from "./pages/pesquisa";
import Lista from "./pages/lista/lista";
import HomeMapa from "./pages/homeMapa/homeMapa";
import Scan from "./pages/scan";
import Settings from "./pages/settings";
import { ListaStackRoutes } from "./pages/lista/listaStackRoutes";
import { HomeMapaStackRoutes } from "./pages/homeMapa/homeMapaStackRoutes"

const Tab = createBottomTabNavigator();

export default function Routes(props) {
    return (

        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#626465',
                tabBarInactiveTintColor: 'white',
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#DE4C45',
                    height: 60,
                    borderRadius: 8,
                    color: '#F6EEE0',
                    position: 'absolute',

                    bottom: 7,
                    left: 7,
                    right: 7,
                    elevation: 0,
                },
                headerShown: false,
            }}>

            <Tab.Screen
                name="Home"
                component={HomeMapaStackRoutes}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name="map" size={30} color={color} />
                        }
                        return <Ionicons name="map" size={size} color={color} />
                    }
                }}
            />

            <Tab.Screen
                name="Pesquisa"
                component={Pesquisa}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name="search" size={30} color={color} />
                        }
                        return <Ionicons name="search" size={size} color={color} />
                    }
                }}
            />


            <Tab.Screen
                name="Lista"
                component={ListaStackRoutes}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name="list" size={30} color={color} />
                        }
                        return <Ionicons name="list" size={size} color={color} />
                    }
                }}
            />



            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name="log-out" size={30} color={color} />
                        }
                        return <Ionicons name="log-out" size={size} color={color} />
                    }
                }}
            />

        </Tab.Navigator>
    )
}



