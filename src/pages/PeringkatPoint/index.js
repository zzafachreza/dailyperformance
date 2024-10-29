import { View, Text, TouchableNativeFeedbackComponent, SafeAreaView, StyleSheet, ScrollView, FlatList, TouchableWithoutFeedback, Linking } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { MyHeader, MyInput, MyPicker } from '../../components'
import Orientation from 'react-native-orientation-locker'
import { TouchableNativeFeedback } from 'react-native'
import { MyDimensi, colors, fonts } from '../../utils'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage'
import { Icon } from 'react-native-elements'
import { showMessage } from 'react-native-flash-message'



export default function PeringkatPoint({ navigation, route }) {
  const user = route.params;

  const backPage = () => {
    navigation.goBack()
  };

  const [data, setData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [kolom, setKolom] = useState('');
  const [tsh, setTsh] = useState([]);


  useEffect(() => {
    Orientation.lockToLandscapeLeft();
    axios.post(apiURL + 'point').then(res => {
      // console.log(res.data);
      setData(res.data);
      setTemp(res.data);
      scrollToIndex()
    });

    axios.post(apiURL + 'point_tsh').then(res => {
      console.log(res.data);
      setTsh(res.data);

    });



  }, []);

  const flatlistRef = useRef();
  const scrollToIndex = () => {
    const Filtered = data.filter(i => i.nama_lengkap.toLowerCase().indexOf(user.nama_lengkap.toLowerCase()) > -1);
    console.log(Filtered[0].no)
    let index = parseFloat(Filtered[0].no) - 1;
    flatlistRef.current.scrollToIndex({ animated: true, index: index })
  }

  const MyBadge = ({ label, value }) => {
    return (
      <View style={{
        marginTop: 5,
        flex: 1,
        marginHorizontal: 2,
        borderWidth: 1,
        borderColor: colors.primary,
        overflow: 'hidden',
        borderRadius: 5,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Text style={{
          flex: 1,
          fontFamily: fonts.secondary[600],
          fontSize: 8
        }}>{label}</Text>
        <Text style={{
          backgroundColor: colors.primary,
          padding: 5,
          marginLeft: 10,
          fontFamily: fonts.secondary[800],
          fontSize: 10,
          color: colors.white
        }}>{value}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader judul="Point & Perinkat" onPress={backPage} />
      <View style={{
        flex: 1,
      }}>

        {/* <View style={{
          flexDirection: 'row',
          padding: 10,
        }}>
          <View style={{
            flex: 0.5,
            paddingTop: 5,
          }}>
            <MyPicker onValueChange={x => setKolom(x)} iconname="options" data={[
              { label: '', value: '' },
              { label: 'LOB', value: 'lob' },
              { label: 'TSH', value: 'tsh' },
              { label: 'SL', value: 'nama_lengkap' },
            ]} label="Filter By" />
          </View>
          <View style={{
            flex: 1,
            paddingLeft: 5,
          }}>
            <MyInput label="Masukan kata kunci" onEndEditing={x => {
              const key = x.nativeEvent.text;
              if (key.length > 0 && kolom.length > 0) {
                console.log(key);
                console.log(kolom);
                const Filtered = data.filter(i => i[kolom].toLowerCase().indexOf(key.toLowerCase()) > -1);
                console.log(Filtered);
                if (Filtered.length > 0) {
                  setData(Filtered);
                } else {
                  showMessage({ message: 'Kata kunci tidak ditemukan' })
                }
              } else {
                setData(temp);
                showMessage({ message: 'Wajib masukan filter by dan kata kunci' })
              }

            }} iconname="search" />
          </View>
        </View> */}


        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <View>
            <View style={{
              flexDirection: 'row'
            }}>
              <Text style={{
                fontSize: MyDimensi / 5,
                fontFamily: fonts.secondary[600],
                color: colors.black,
                textAlign: 'center',
                flex: 1,
                marginHorizontal: 10,
                width: 0,
              }}></Text>

              <Text style={styles.judul}>TSH</Text>
              <Text style={styles.judul}>TOTAL POINT</Text>

              <Text style={styles.judul}>DEVICE</Text>
              <Text style={styles.judul}>ACC</Text>
              <Text style={styles.judul}>VAS</Text>
              <Text style={styles.judul}>TV</Text>
              <Text style={styles.judul}>TI</Text>
              <Text style={styles.judul}>TEC</Text>
              <Text style={styles.judul}>UT</Text>
              <Text style={styles.judul}>PRIO</Text>
              <Text style={styles.judul}>ISAT</Text>
              <Text style={styles.judul}>TSEL</Text>
              <Text style={styles.judul}>SF</Text>
              <Text style={styles.judul}>SAMSUNG</Text>
              <Text style={styles.judul}>OPPO</Text>
              <Text style={styles.judul}>VIVO</Text>
              <Text style={styles.judul}>MEDPOINT</Text>
              <Text style={styles.judul}>MY ERASPACE</Text>
              <Text style={styles.judul}>LEARNING STATUS</Text>
              <Text style={styles.judul}>AUDIT COMPLIANCE</Text>


            </View>



            <FlatList data={tsh} renderItem={({ item, index }) => {
              return (
                <View style={{
                  borderBottomWidth: 1,
                }}>
                  <TouchableWithoutFeedback onPress={() => {
                    let TMP = [...tsh];

                    if (TMP[index].cek > 0) {
                      TMP[index].cek = 0;
                    } else {
                      TMP[index].cek = 1;
                    }


                    setTsh(TMP);

                  }}>
                    <View style={{
                      padding: 10,
                      flexDirection: 'row',
                      alignItems: 'center'

                    }}>

                      <View style={{
                        backgroundColor: item.cek > 0 ? colors.secondary : colors.primary,
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <Icon size={15} type='ionicon' name={item.cek > 0 ? 'remove' : 'add'} color={colors.white} />
                      </View>

                      <Text style={{
                        fontSize: MyDimensi / 5,
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        textAlign: 'left',
                        marginHorizontal: 20,
                        width: tsh.filter(i => i.cek > 0).length > 0 ? 220 : 160,
                      }}>{item.tsh}</Text>
                      <Text style={styles.tulisan}>{item.TOTAL}</Text>
                      <Text style={styles.tulisan}>{item.DEVICE}</Text>
                      <Text style={styles.tulisan}>{item.ACC}</Text>
                      <Text style={styles.tulisan}>{item.VAS}</Text>
                      <Text style={styles.tulisan}>{item.TV}</Text>
                      <Text style={styles.tulisan}>{item.TI}</Text>
                      <Text style={styles.tulisan}>{item.TEC}</Text>
                      <Text style={styles.tulisan}>{item.UT}</Text>
                      <Text style={styles.tulisan}>{item.PRIO}</Text>
                      <Text style={styles.tulisan}>{item.ISAT}</Text>
                      <Text style={styles.tulisan}>{item.TSEL}</Text>
                      <Text style={styles.tulisan}>{item.SF}</Text>
                      <Text style={styles.tulisan}>{item.SAMSUNG}</Text>
                      <Text style={styles.tulisan}>{item.OPPO}</Text>
                      <Text style={styles.tulisan}>{item.VIVO}</Text>
                      <Text style={styles.tulisan}>{item.MEDPOINT}</Text>
                      <Text style={styles.tulisan}>{item.MY_ERASPACE}</Text>
                      <Text style={styles.tulisan}>{item.LEARNING_STATUS}</Text>
                      <Text style={styles.tulisan}>{item.AUDIT_COMPLIANCE}</Text>


                    </View>
                  </TouchableWithoutFeedback>

                  {item.cek > 0 &&
                    <View style={{
                      padding: 10,
                      backgroundColor: colors.border
                    }}>
                      <View style={{
                        flexDirection: 'row'
                      }}>
                        <Text style={{
                          fontSize: MyDimensi / 5,
                          fontFamily: fonts.secondary[600],
                          color: colors.black,
                          textAlign: 'center',
                          flex: 1,
                          marginHorizontal: 10,
                          width: 50,
                        }}></Text>

                        <Text style={styles.judul}></Text>
                        <Text style={styles.judul}>TSH</Text>
                        <Text style={styles.judul}>Nama Store Leader</Text>
                        <Text style={styles.judul}>TOTAL POINT</Text>
                        <Text style={styles.judul}>DEVICE</Text>
                        <Text style={styles.judul}>ACC</Text>
                        <Text style={styles.judul}>VAS</Text>
                        <Text style={styles.judul}>TV</Text>
                        <Text style={styles.judul}>TI</Text>
                        <Text style={styles.judul}>TEC</Text>
                        <Text style={styles.judul}>UT</Text>
                        <Text style={styles.judul}>PRIO</Text>
                        <Text style={styles.judul}>ISAT</Text>
                        <Text style={styles.judul}>TSEL</Text>
                        <Text style={styles.judul}>SF</Text>
                        <Text style={styles.judul}>SAMSUNG</Text>
                        <Text style={styles.judul}>OPPO</Text>
                        <Text style={styles.judul}>VIVO</Text>
                        <Text style={styles.judul}>MEDPOINT</Text>
                        <Text style={styles.judul}>MY ERASPACE</Text>
                        <Text style={styles.judul}>LEARNING STATUS</Text>
                        <Text style={styles.judul}>AUDIT COMPLIANCE</Text>


                      </View>
                      <FlatList ref={flatlistRef} data={data.filter(x => x.tsh == item.tsh)} renderItem={({ item, index }) => {
                        return (
                          <View style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderBottomColor: colors.border,
                            paddingVertical: 5,
                          }}>

                            <View style={{
                              flex: 1,
                              marginHorizontal: 10,
                              width: 50,
                              flexDirection: 'row'
                            }}>

                              {item.arrow > 0 && <Icon size={15} type='ionicon' name='arrow-up-circle' color={colors.success} />}

                              {item.arrow == 0 && <Icon size={15} type='ionicon' name='arrow-down-circle' color={colors.danger} />}
                              <Text style={{
                                fontSize: MyDimensi / 5,
                                fontFamily: fonts.secondary[400],
                                color: colors.black,
                                textAlign: 'center',

                              }}>{item.no}</Text>
                            </View>
                            <Text style={styles.tulisan}>{item.lob}</Text>
                            <Text style={styles.tulisan}>{item.tsh}</Text>
                            <Text style={styles.tulisan}>{item.nama_lengkap}</Text>
                            <Text style={styles.tulisan}>{item.TOTAL}</Text>
                            <Text style={styles.tulisan}>{item.DEVICE}</Text>
                            <Text style={styles.tulisan}>{item.ACC}</Text>
                            <Text style={styles.tulisan}>{item.VAS}</Text>
                            <Text style={styles.tulisan}>{item.TV}</Text>
                            <Text style={styles.tulisan}>{item.TI}</Text>
                            <Text style={styles.tulisan}>{item.TEC}</Text>
                            <Text style={styles.tulisan}>{item.UT}</Text>
                            <Text style={styles.tulisan}>{item.PRIO}</Text>
                            <Text style={styles.tulisan}>{item.ISAT}</Text>
                            <Text style={styles.tulisan}>{item.TSEL}</Text>
                            <Text style={styles.tulisan}>{item.SF}</Text>
                            <Text style={styles.tulisan}>{item.SAMSUNG}</Text>
                            <Text style={styles.tulisan}>{item.OPPO}</Text>
                            <Text style={styles.tulisan}>{item.VIVO}</Text>
                            <Text style={styles.tulisan}>{item.MEDPOINT}</Text>
                            <Text style={styles.tulisan}>{item.MY_ERASPACE}</Text>
                            <Text style={styles.tulisan}>{item.LEARNING_STATUS}</Text>
                            <Text style={styles.tulisan}>{item.AUDIT_COMPLIANCE}</Text>

                          </View>
                        )
                      }} />
                    </View>
                  }
                </View>

              )
            }} />


            {/* <FlatList ref={flatlistRef} data={data} renderItem={({ item, index }) => {
              return (
                <View style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingVertical: 5,
                }}>

                  <View style={{
                    flex: 1,
                    marginHorizontal: 10,
                    width: 50,
                    flexDirection: 'row'
                  }}>

                    {item.arrow > 0 && <Icon type='ionicon' name='arrow-up-circle' color={colors.success} />}

                    {item.arrow == 0 && <Icon type='ionicon' name='arrow-down-circle' color={colors.danger} />}
                    <Text style={{
                      fontSize: MyDimensi / 3,
                      fontFamily: fonts.secondary[400],
                      color: colors.black,
                      textAlign: 'center',

                    }}>{item.no}</Text>
                  </View>
                  <Text style={styles.tulisan}>{item.lob}</Text>
                  <Text style={styles.tulisan}>{item.tsh}</Text>
                  <Text style={styles.tulisan}>{item.nama_lengkap}</Text>
                  <Text style={{
                    fontSize: MyDimensi / 3,
                    fontFamily: fonts.secondary[400],
                    color: colors.black,
                    textAlign: 'center',
                    flex: 1,
                    marginHorizontal: 10,
                    width: 400,
                  }}>{item.area}</Text>
                  <Text style={styles.tulisan}>{item.DEVICE}</Text>
                  <Text style={styles.tulisan}>{item.ACC}</Text>
                  <Text style={styles.tulisan}>{item.VAS}</Text>
                  <Text style={styles.tulisan}>{item.TV}</Text>
                  <Text style={styles.tulisan}>{item.TI}</Text>
                  <Text style={styles.tulisan}>{item.TEC}</Text>
                  <Text style={styles.tulisan}>{item.UT}</Text>
                  <Text style={styles.tulisan}>{item.PRIO}</Text>
                  <Text style={styles.tulisan}>{item.ISAT}</Text>
                  <Text style={styles.tulisan}>{item.TSEL}</Text>
                  <Text style={styles.tulisan}>{item.SF}</Text>
                  <Text style={styles.tulisan}>{item.SAMSUNG}</Text>
                  <Text style={styles.tulisan}>{item.OPPO}</Text>
                  <Text style={styles.tulisan}>{item.VIVO}</Text>
                  <Text style={styles.tulisan}>{item.MEDPOINT}</Text>
                  <Text style={styles.tulisan}>{item.MY_ERASPACE}</Text>
                  <Text style={styles.tulisan}>{item.LEARNING_STATUS}</Text>
                  <Text style={styles.tulisan}>{item.AUDIT_COMPLIANCE}</Text>
                  <Text style={styles.tulisan}>{item.TOTAL}</Text>
                </View>
              )
            }} /> */}
          </View>
        </ScrollView>
      </View>

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  judul: {
    fontSize: MyDimensi / 5,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 10,
    width: 200,
  },
  tulisan: {
    fontSize: MyDimensi / 5,
    fontFamily: fonts.secondary[400],
    color: colors.black,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 10,
    width: 200,
  },

})