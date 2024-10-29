import { View, Text, TouchableNativeFeedbackComponent, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyHeader } from '../../components'
import Orientation from 'react-native-orientation-locker'
import { TouchableNativeFeedback } from 'react-native'
import { colors, fonts, windowHeight } from '../../utils'
import { apiURL } from '../../utils/localStorage'
import axios from 'axios'
import ProgressCircle from 'react-native-progress-circle'
import moment from 'moment'
import { showMessage } from 'react-native-flash-message'


export default function ScoreAudit({ navigation, route }) {

  const backPage = () => {
    navigation.goBack()
  }

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    axios.post(apiURL + 'audit', {
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

  const MyDash = ({ judul, persen, target, capai, gap, warna }) => {
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
      <MyHeader judul="Score Audit" onPress={backPage} />

      {!loading && <View style={{
        flex: 1,
      }}>

        <View style={{
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}>
          <View style={{
            flexDirection: 'row'
          }}>
            <Text style={{
              flex: 1,
              fontFamily: fonts.secondary[800],
              fontSize: 20,
            }}>Periode Audit</Text>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: 20,
            }}>{data.periode}</Text>
          </View>
          <View style={{
            flexDirection: 'row'
          }}>
            <Text style={{
              flex: 1,
              fontFamily: fonts.secondary[800],
              fontSize: 20,
            }}>Auditor</Text>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: 20,
            }}>{data.auditor}</Text>
          </View>
          <View style={{
            flexDirection: 'row'
          }}>
            <Text style={{
              flex: 1,
              fontFamily: fonts.secondary[800],
              fontSize: 20,
            }}>Store Leader</Text>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: 20,
            }}>{route.params.nama_lengkap}</Text>
          </View>

        </View>
        <View style={{
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}>
          <Text style={{
            fontFamily: fonts.secondary[800],
            fontSize: 20,
          }}>Penemuan Audit</Text>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 20,
          }}>{data.penemuan}</Text>

        </View>
        <View style={{
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          flexDirection: 'row',
        }}>
          <Text style={{
            flex: 1,
            fontFamily: fonts.secondary[800],
            fontSize: 20,
          }}>Score Audit</Text>
          <ProgressCircle
            percent={parseFloat(data.skor).toFixed(2)}
            radius={80}
            borderWidth={15}
            color={colors.primary}
            shadowColor={colors.border}
            bgColor="#fff"
          >
            <Text style={{ fontSize: 15, fontFamily: fonts.secondary[600] }}>{parseFloat(data.skor).toFixed(0)}%</Text>
          </ProgressCircle>
        </View>

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