import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Register,
  Account,
  AccountEdit,
  Konten,
  TanyaJawab,
  Notifikasi,
  Artikel,
  ArtikelDetail,
  Video,
  VideoDetail,
  Resep,
  ResepDetail,
  AsupanMpasi,
  AsupanAsi,
  StatusGizi,
  StatusGiziHasil,
  Kursioner,
  KursionerVark,
  GayaBelajarVisual,
  HasilBelajarVisual,
  GayaBelajarAudio,
  HasilBelajarAudio,
  GayaBelajarReading,
  HasilBelajarReading,
  GayaBelajarKinaesthetic,
  HasilBelajarKinaesthetic,
  DashboardPoint,
  ScoreAudit,
  Acvhivement,
  PeringkatPoint,
  LinkSubmission,


} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '../components';
import DashboardCategory from '../pages/Dashbaordcategory';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator initialRouteName='Produk' tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default function Router() {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          // headerTitle: 'Detail',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          headerTitle: 'Daftar Pengguna',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="DashboardPoint"
        component={DashboardPoint}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="ScoreAudit"
        component={ScoreAudit}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="Acvhivementstore"
        component={Acvhivement}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="PeringkatPoint"
        component={PeringkatPoint}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="DashboardCategory"
        component={DashboardCategory}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="HasilBelajarAudio"
        component={HasilBelajarAudio}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="BelajarReading"
        component={GayaBelajarReading}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="HasilBelajarReading"
        component={HasilBelajarReading}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="BelajarKinaesthetic"
        component={GayaBelajarKinaesthetic}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="HasilBelajarKinaesthetic"
        component={HasilBelajarKinaesthetic}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,

        }}
      />
      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: false,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: '#000',
        }}
      />


      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Artikel"
        component={Artikel}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ArtikelDetail"
        component={ArtikelDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Video"
        component={Video}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="VideoDetail"
        component={VideoDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Resep"
        component={Resep}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="ResepDetail"
        component={ResepDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AsupanMpasi"
        component={AsupanMpasi}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="AsupanAsi"
        component={AsupanAsi}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="StatusGizi"
        component={StatusGizi}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="StatusGiziHasil"
        component={StatusGiziHasil}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="LinkSubmission"
        component={LinkSubmission}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="Konten"
        component={Konten}
        options={{
          headerShown: false,
        }}
      />















    </Stack.Navigator>
  );
}
