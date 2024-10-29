import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts, windowWidth } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker, MyCalendar } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP } from '../../utils/localStorage';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Icon } from 'react-native-elements';
import SweetAlert from 'react-native-sweet-alert';

export default function Register({ navigation }) {




    const [loading, setLoading] = useState(false);
    const [sama, setSama] = useState(true)
    const [data, setData] = useState({
        api_token: api_token,
        username: '',
        nama_lengkap: '',
        password: '',
        repassword: '',


    });

    const simpan = () => {


        console.log(data);
        if (
            data.nama_lengkap.length === 0 &&
            data.username.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Formulir pendaftaran tidak boleh kosong !',
            });
        } else if (data.nama_lengkap.length === 0) {
            showMessage({
                message: 'Masukan nama lengkap',
            });
        }

        else if (data.username.length === 0) {
            showMessage({
                message: 'Masukan nomor username',
            });
        }
        else if (data.password.length === 0) {
            showMessage({
                message: 'Masukan kata sandi kamu',
            });
        } else if (data.repassword.length === 0) {
            showMessage({
                message: 'Ulangi kata sandi kamu',
            });
        } else {



            setLoading(true);
            axios
                .post(apiURL + 'register', data)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'error',
                            cancellable: true
                        },
                            callback => navigation.navigate('Login'));

                    } else {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'success',
                            cancellable: true
                        },
                            callback => navigation.navigate('Login'));

                    }


                });
        }
    };



    return (
        <>
            <ImageBackground
                style={{
                    flex: 1,
                    backgroundColor: colors.background,
                    padding: 10,
                    position: 'relative'
                }}>

                {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
                <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>




                    <View style={{
                        paddingHorizontal: 10,
                    }}>
                        <Text style={{
                            fontSize: MyDimensi / 2,
                            fontFamily: fonts.primary[800],
                            color: colors.black,
                        }}>Daftar</Text>
                        <Text style={{
                            fontSize: MyDimensi / 4,
                            fontFamily: fonts.primary[400],
                            color: colors.black,
                            marginBottom: 10,
                        }}>Silahkan daftar agar bisa login</Text>


                        {/* INPUT NAMA */}
                        <MyInput label="Nama Lengkap" onChangeText={value =>
                            setData({
                                ...data,
                                nama_lengkap: value,
                            })
                        } iconname='person-outline' placeholder='Masukan nama lengkap' />

                        {/* INPUT USERNAME */}
                        <MyGap jarak={20} />
                        <MyInput label="Username" onChangeText={value =>
                            setData({
                                ...data,
                                username: value,
                            })
                        } iconname="at-outline" placeholder='Masukan username' />

                        {/*INPUT KATA SANDI */}
                        <MyGap jarak={20} />
                        <MyInput
                            placeholder="Masukan kata sandi"
                            label="Kata Sandi"
                            iconname="lock-closed-outline"
                            secureTextEntry
                            value={data.password}
                            onChangeText={value =>
                                setData({
                                    ...data,
                                    password: value,
                                })
                            }
                        />

                        {/* INPUT KATA SANDI ULANG */}
                        <MyGap jarak={20} />
                        <MyInput
                            borderColor={sama ? colors.primary : colors.danger}
                            borderWidth={sama ? 1 : 1}
                            placeholder="Masukan ulang kata sandi"
                            label="Masukan ulang kata sandi"
                            iconname="lock-closed-outline"
                            secureTextEntry
                            value={data.repassword}
                            onChangeText={value => {

                                if (value !== data.password) {
                                    setSama(false)
                                } else {
                                    setSama(true)
                                }

                                setData({
                                    ...data,
                                    repassword: value,
                                })
                            }

                            }
                        />
                    </View>
                    <MyGap jarak={20} />




                    {!loading &&
                        <View style={{
                            padding: 10
                        }}>
                            <MyButton

                                warna={colors.primary}
                                title="Daftar"
                                Icons="log-in"
                                onPress={simpan}
                            />

                        </View>
                    }

                    <MyGap jarak={10} />
                    {loading && <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ActivityIndicator color={colors.primary} size="large" />
                    </View>}
                </ScrollView>

            </ImageBackground>

        </>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
