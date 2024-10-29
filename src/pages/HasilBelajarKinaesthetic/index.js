import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { MyDimensi, colors, fonts } from '../../utils'
import { TouchableNativeFeedback } from 'react-native'


export default function HasilBelajarKinaesthetic({navigation}) {
    
    const HandleBack = () => {
        navigation.goBack();
    }

  return (
    <View style={{flex:1, backgroundColor:'white'}}>
     
        {/* HEADER */}
        <View style={{padding:10, backgroundColor:colors.secondary, borderBottomEndRadius:5, borderBottomStartRadius:5, flexDirection:'row',}}>

        <TouchableNativeFeedback onPress={HandleBack}>
            <Image source={require('../../assets/left-arrow.png')} style={{
                height:35,
                width:35,
                tintColor:'white'
            }}/>
        </TouchableNativeFeedback>

        <Text style={{
            fontFamily: fonts.primary[600],
            fontSize: MyDimensi / 4,
            color:'white',
            flex:1,
            textAlign:"center",
            left: -12,
            top:5,
        }}>
          Hasil Gaya Belajar Kinaesthetic
        </Text>
        </View>

        {/* END HEADER */}

        {/* HASIL SOAL GAYA BELAJAR KINAESTHETIC */}
        <ScrollView>
{/* NANTI DISINI ANDA MASUKAN HASILNYA */}
        </ScrollView>

        {/* BOTTOM TAB SELESAI */}
        {/* AKAN NAVIGATE KE HALAMAN HASIL VISUAL */}
        <View style={{flexDirection:'row',padding:10}}>
        <View style={{
            flex:1,
            alignItems:"flex-start"
        }}>
            <TouchableNativeFeedback onPress={HandleBack}>
            <View style={{flexDirection:"row", }}>
                <Image source={require('../../assets/back.png')} style={{
                    height:30,
                    width:30,

                }}/>
            <Text style={{
                fontFamily: fonts.primary[400],
                fontSize: MyDimensi / 4.1,
                top:5,
            }}>
                Back
            </Text>
            </View>
            </TouchableNativeFeedback>
        </View>
        </View>
        {/* END BOTTOM TAB SELESAI */}

    </View>
  )
}