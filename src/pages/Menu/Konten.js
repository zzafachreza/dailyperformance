import { View, Text, StyleSheet, TouchableNativeFeedbackComponent, SafeAreaView, ScrollView, FlatList, TouchableWithoutFeedback, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyHeader } from '../../components'
import Orientation from 'react-native-orientation-locker'
import { TouchableNativeFeedback } from 'react-native'
import { colors, fonts } from '../../utils'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage'
import { Icon } from 'react-native-elements'
import { WebView } from 'react-native-webview';
export default function Konten({ navigation, route }) {

    const item = route.params;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader judul={item.judul} onPress={() => navigation.goBack()} />
            <View style={{
                flex: 1,
            }}>
                <WebView source={{ uri: item.link }} style={{ flex: 1 }} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})