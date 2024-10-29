import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { MyButton, MyGap } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { MYAPP, getData } from '../../utils/localStorage';

export default function Splash({ navigation }) {

  const img = new Animated.Value(windowWidth / 3);
  const text = new Animated.Value(0);
  Animated.timing(img, {
    toValue: windowWidth / 2,
    duration: 750,
    useNativeDriver: false,
  }).start();

  Animated.timing(text, {
    toValue: windowHeight / 4.5,
    duration: 1000,
    useNativeDriver: false,
  }).start();

  useEffect(() => {
    setTimeout(() => {
      getData('user').then(res => {
        if (!res) {
          navigation.replace('Login')
        } else {
          // navigation.replace('GetStarted')
          navigation.replace('MainApp')
        }
      })
    }, 1200)
  }, [])

  return (
    <SafeAreaView style={{
      flex: 1,
      padding: 0,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      position: 'relative'

    }}>


      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Animated.Image
          source={require('../../assets/icon.png')}
          resizeMode="contain"
          style={{
            marginBottom: 40,
            width: img,
            height: img
          }}
        />


        <ActivityIndicator color={colors.white} size="large" />

      </View>



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
