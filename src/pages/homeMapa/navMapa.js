import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons'


export default function NavMapa({navigation}) {
  const width = Dimensions.get("window").width;
  const altura = width;
  const largura = width;

  const scaleImg = useSharedValue(1);

  const pinchZoom = Gesture.Pinch().onUpdate((e) => {
    scaleImg.value = e.scale;
  });

  const colorBg = 'white';
  const color1 = '#DE4C45';
  const color2 = '#C1C5C7';
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorBg,
      alignItems: 'center',
      justifyContent: 'center'
    },

    mapa: {
      width: largura,
      height: altura
    },

    btnBack:{
      marginRight:"80%",
      marginTop:"15%"
    }
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleImg.value }],
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate('HomeMapa')}>
          <Ionicons name="arrow-back" size={30} color={color1} />
        </TouchableOpacity>
      <SafeAreaView style={[styles.container, animatedStyle]}>
        <GestureDetector gesture={pinchZoom}>
          <Animated.Image style={styles.mapa} source={require('../../../assets/mapa.png')} />
        </GestureDetector>
      </SafeAreaView>
    </View>

  );
}

