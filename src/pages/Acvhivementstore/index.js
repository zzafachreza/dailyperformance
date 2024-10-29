import React, { useEffect } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { MyHeader } from '../../components';
import Orientation from 'react-native-orientation-locker';
import { colors, fonts } from '../../utils';
import { useFocusEffect } from '@react-navigation/native';

export default function Acvhivement({ navigation }) {
  useFocusEffect(
    React.useCallback(() => {
      // Mengatur orientasi layar menjadi landscape setelah rendering komponen utama
      Orientation.lockToLandscape();

      // Membersihkan pengaturan orientasi ketika komponen di-unmount
      return () => {
        Orientation.unlockAllOrientations();
      };
    }, [])
  );

  const backPage = () => {
    // Tunggu beberapa saat sebelum kembali ke halaman sebelumnya
    setTimeout(() => {
      navigation.goBack();
    }, 500); // Ubah sesuai kebutuhan Anda

    // Atau menggunakan perintah di bawah ini tanpa perlu memberikan waktu
    // navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {/* HEADER */}
      <View>
        <MyHeader judul="Acvhivment Store" onPress={backPage} />
      </View>
      <View>
        {/* MASUKAN CONTENT UNTUK DASHBOARD POINT */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
          {/* 1 */}
          <TouchableNativeFeedback onPress={() => navigation.navigate('DashboardCategory')}>
            <View style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 5, marginRight: 10 }}>
              <Text style={{ color: colors.white, fontFamily: fonts.primary[400] }}>DASHBOARD</Text>
            </View>
          </TouchableNativeFeedback>

          {/* 2 */}
          <TouchableNativeFeedback>
            <View style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 5 }}>
              <Text style={{ color: colors.white, fontFamily: fonts.primary[400] }}>ACVHIVEMENT STORE</Text>
            </View>
          </TouchableNativeFeedback>

          {/* 3 */}
          <TouchableNativeFeedback onPress={() => navigation.navigate('PeringkatPoint')}>
            <View style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 5, marginLeft: 10 }}>
              <Text style={{ color: colors.white, fontFamily: fonts.primary[400] }}>PERINGKAT POINT</Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        {/* NANTI DISINI MASUKAN CONTENT ACVHIVEMENTSTORE */}
        <View>
          {/* SCORE */}
        </View>
      </View>
    </View>
  );
}
