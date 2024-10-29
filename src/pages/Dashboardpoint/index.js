import { View, Text, TouchableNativeFeedbackComponent, SafeAreaView, ScrollView, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyHeader } from '../../components'
import Orientation from 'react-native-orientation-locker'
import { TouchableNativeFeedback } from 'react-native'
import { MyDimensi, colors, fonts, windowHeight } from '../../utils'
import { apiURL, getData } from '../../utils/localStorage'
import axios from 'axios'
import ProgressCircle from 'react-native-progress-circle'
import moment from 'moment'
import { showMessage } from 'react-native-flash-message'


export default function DashboardPoint({ navigation, route }) {

  const backPage = () => {
    navigation.goBack()
  }

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});



  useEffect(() => {
    getData('user').then(uu => {
      setUser(uu)
    })

    axios.post(apiURL + 'target', {
      username: route.params.username
    }).then(res => {
      setLoading(false);
      console.log(res.data.data);
      if (!res.data.data) {
        showMessage({ message: 'Maaf data tidak ada' })
      } else {
        setData(res.data.data);
      }

    })
  }, []);

  const MyDash = ({ judul, persen, target, capai, gap, est, warna }) => {
    return (
      <View style={{
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        height: windowHeight / 4.5,
        padding: 10,

      }}>
        <ProgressCircle
          percent={parseFloat(persen).toFixed(2)}
          radius={50}
          borderWidth={10}
          color={warna}
          shadowColor={colors.border}
          bgColor="#fff"
        >
          <Text style={{ fontSize: 15, fontFamily: fonts.secondary[600] }}>{parseFloat(persen).toFixed(2)}%</Text>
        </ProgressCircle>
        <View style={{
          flex: 1,
          paddingLeft: 10,
        }}>
          <Text style={{
            fontFamily: fonts.secondary[800],
            fontSize: 15,
            marginBottom: 10,
          }}>{judul} {moment().format('MMMM YYYY')}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 12, flex: 0.5, }}>TARGET</Text>
            <Text style={{ flex: 0.2, fontFamily: fonts.secondary[600], fontSize: 12, }}>:</Text>
            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 14, flex: 1, }}>{new Intl.NumberFormat().format(target)}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 12, flex: 0.5, }}>ACHIVE</Text>
            <Text style={{ flex: 0.2, fontFamily: fonts.secondary[600], fontSize: 12, }}>:</Text>
            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 14, flex: 1, }}>{new Intl.NumberFormat().format(capai)}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 12, flex: 0.5, }}>ESTIMASI</Text>
            <Text style={{ flex: 0.2, fontFamily: fonts.secondary[600], fontSize: 12, }}>:</Text>
            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 14, flex: 1, }}>{new Intl.NumberFormat().format(Math.abs(est))}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 12, flex: 0.5, }}>GAP</Text>
            <Text style={{ flex: 0.2, fontFamily: fonts.secondary[600], fontSize: 12, }}>:</Text>
            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 14, flex: 1, }}>{new Intl.NumberFormat().format(Math.abs(gap))}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader judul="Dashboard Point" onPress={backPage} />

      {!loading && <View style={{
        flex: 1,
      }}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
            <View style={{
              width: 110,
              height: 110,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 55,
              backgroundColor: colors.primary,
            }}>
              <Image source={{
                uri: user.foto_user
              }} style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }} />
            </View>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: MyDimensi / 2.5,
              marginTop: 10,
            }}>{user.nama_lengkap}</Text>
            <Text style={{
              fontFamily: fonts.secondary[800],
              fontSize: MyDimensi / 2.5,
              marginTop: 5,
            }}>{user.area}</Text>
          </View>

          <MyDash judul="DEVICE"
            persen={data.device_persen}
            target={data.device_target}
            capai={data.device_capai}
            warna={colors.danger}
            est={data.device_estimasi}
            gap={data.device_gap} />

          <MyDash judul="AKSESORIS"
            persen={data.aksesoris_persen}
            target={data.aksesoris_target}
            capai={data.aksesoris_capai}
            warna={colors.warning}
            est={data.aksesoris_estimasi}
            gap={data.aksesoris_gap} />

          <MyDash judul="OPERATOR"
            persen={data.operator_persen}
            target={data.operator_target}
            capai={data.operator_capai}
            est={data.operator_estimasi}
            warna={colors.secondary}
            gap={data.operator_gap} />

          <MyDash judul="BOLTECH"
            persen={data.boltech_persen}
            target={data.boltech_target}
            capai={data.boltech_capai}
            warna={colors.success}
            est={data.boltech_estimasi}
            gap={data.boltech_gap} />

        </ScrollView>

      </View>}

      {loading && <View style={{
        flex: 1, justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>}
    </SafeAreaView>
  )
}