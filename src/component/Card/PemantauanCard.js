import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";

import { LinearGradient } from "expo-linear-gradient";

export default function PemantauanCard({
  id,
  name,
  kelamin,
  nama_ibu,
  status,
  no_ktp,
  index,
  onPress
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        style={styles.card}
        colors={["#63C7FF", "#00A3FF"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={
              kelamin === "Perempuan"
                ? require("../../../assets/img/StatusP.png")
                : require("../../../assets/img/StatusL.png")
            }
            resizeMode="cover"
            style={{ height: 70, width: 70 }}
          />
        </View>

        <View style={{ flex: 3 }}>
          <Text style={styles.cardName}>{name}</Text>
          <Text style={styles.cardSecond}>{no_ktp}</Text>
          <Text style={styles.cardDetail}>Anak Ke-{index + 1}</Text>
          <Text style={styles.cardDetail}>Kelamin : {kelamin}</Text>
          <Text style={styles.cardDetail}>Nama Ibu : {nama_ibu}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center", marginRight: "2%" }}>
          <Image
            source={
              status
                ? require("../../../assets/img/PemantauanStunting.png")
                : require("../../../assets/img/PemantauanStunting.png")
            }
          />
          <Text style={{ textAlign: "center", fontFamily:'Poppins-Bold', fontSize:8, color:'white' }}>
            {status ? "Stunting" : "Belum Mengukur Bulan Ini"}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    height: 125,
    width: "100%",
    marginTop: "5%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "middle",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 5 },
  },

  cardName: {
    fontFamily: "Poppins-Bold",
    color: "white",
    fontSize: 14,
  },

  cardSecond: {
    fontFamily: "Poppins-Bold",
    color: "black",
    fontSize: 12,
  },

  cardDetail: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#343A40",
  },

  cardContent: {
    flexDirection: "row",
  },
});
