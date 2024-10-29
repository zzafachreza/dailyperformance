import { View, Text, TouchableNativeFeedbackComponent, SafeAreaView, ScrollView, FlatList, TouchableWithoutFeedback, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyHeader } from '../../components'
import Orientation from 'react-native-orientation-locker'
import { TouchableNativeFeedback } from 'react-native'
import { colors, fonts } from '../../utils'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage'
import { Icon } from 'react-native-elements'



export default function LinkSubmission({ navigation }) {

    const backPage = () => {
        navigation.goBack()
    };

    const [data, setData] = useState([]);


    useEffect(() => {
        axios.post(apiURL + 'linksubmmision').then(res => {
            console.log(res.data);
            setData(res.data);
        })
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader judul="Link Submission" onPress={backPage} />
            <View style={{
                flex: 1,
                padding: 20,
            }}>
                <FlatList data={data} renderItem={({ item, index }) => {
                    return (
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Konten', item)}>
                            <View style={{
                                padding: 20,
                                marginVertical: 10,
                                borderRadius: 10,
                                backgroundColor: colors.secondary,
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[600],
                                    color: colors.white,
                                    fontSize: 14,
                                }}>{item.judul}</Text>
                                <Icon type='ionicon' name='open-outline' color={colors.white} />
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }} />
            </View>
        </SafeAreaView>
    )
}