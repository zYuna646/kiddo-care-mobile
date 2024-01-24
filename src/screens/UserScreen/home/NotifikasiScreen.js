import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ArrowButton from "../../../component/Button/ArrowButton";
import NotifikasiCard from "../../../component/Card/NotifikasiCard";

export default function NotifikasiScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignSelf: "center", width: "90%" }}>
      <View style={{ marginTop: "10%" }}>
        <ArrowButton
          title="Notifikasi"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.containerText}>Belum Dibaca</Text>
        <NotifikasiCard title="Anak Anda Stunting Selamat" date="2 jan 14:00" />
      </View>

      <View style={styles.container}>
        <Text style={styles.containerText}>Telah Dibaca</Text>
        <NotifikasiCard title="Anak Anda Stunting Selamat" date="2 jan 14:00" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
  },

  containerText: {
    fontFamily: "Poppins-Light",
    fontSize: 12,
    alignSelf: "flex-start",
  },
});
