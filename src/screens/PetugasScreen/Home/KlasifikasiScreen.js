import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function KlasifikasiScreen({navigation}) {
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
        <TouchableOpacity onPress={() => {
          navigation.navigate('PertumbuhanAnak')
        }}>
          <Image
            source={require("../../../../assets/img/pertumbuhan_anak.png")}
            style={{ alignSelf: "center", marginTop: "2%" }}
          />
        </TouchableOpacity> 

        <TouchableOpacity onPress={() => {
          navigation.navigate('HasilPengukuran')
        }}>
          <Image
            source={require("../../../../assets/img/hasil_pengukuran.png")}
            style={{ alignSelf: "center", marginTop: "2%" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
