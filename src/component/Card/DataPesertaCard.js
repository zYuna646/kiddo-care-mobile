import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import IconMenuButton from "../Button/IconMenuButton";

export default function DataPesertaCard({ name, nik, onPress, Gambar = null, onPressHapus, onPressEdit }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          width: 390,
          height: 80,
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
            source={
              Gambar != null
                ? { uri: Gambar }
                : require("../../../assets/img/profile.png")
            }
            resizeMode="cover"
            style={{ height: 41, width: 41, alignSelf: "center" }}
          />
        </View>
        <View style={{ flex: 3, justifyContent: "center" }}>
          <Text style={{ fontFamily: "Poppins-Bold", fontSize: 14 }}>
            {name}
          </Text>
          <Text style={{ fontFamily: "Poppins-Medium", fontSize: 12 }}>
            {nik}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent:'center'
          }}
        >
          
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
