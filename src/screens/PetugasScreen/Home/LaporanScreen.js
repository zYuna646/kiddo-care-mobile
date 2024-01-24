import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";


export default function LaporanScreen() {
  return (
    <View style={{ flex: 1, alignSelf: "center", width: "90%" }}>
    <View style={{ marginTop: "10%" }}>
      <Text
        style={{
          alignSelf: "flex-start",
          fontFamily: "Poppins-Bold",
          fontSize: 18,
        }}
      >
        Klasifikasi Stunting
      </Text>
    </View>
    <View style={{ marginTop: "5%" }}>
      <TouchableOpacity>
        <Image
          source={require("../../../../assets/img/laporan_peserta.png")}
          style={{ alignSelf: "center", marginTop: "2%", borderRadius:15 }}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          source={require("../../../../assets/img/laporan_pengukuran.png")}
          style={{ alignSelf: "center", marginTop: "2%" }}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          source={require("../../../../assets/img/laporan_bantuan.png")}
          style={{ alignSelf: "center", marginTop: "2%" }}
        />
      </TouchableOpacity>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({})