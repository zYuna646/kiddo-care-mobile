import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function SignInScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.PrymaryText}>Selamat Datang</Text>
          <Text style={styles.PrymaryText}>Kembali!</Text>
          <Text style={styles.normalText}>Masuklah untuk mengakses layanan kesehatan yang terbaik untuk anda</Text>
        </View>
      </View>

      <View style={styles.body}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  header: {
    backgroundColor: "#00A3FF",
    height: 197.54,
    justifyContent: "center",
  },

  headerContent: {
    marginLeft: "5%",
  },

  PrymaryText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  normalText:
  {
    marginTop: '5%',
    color: "white",
    fontSize: 12,
  }
});
