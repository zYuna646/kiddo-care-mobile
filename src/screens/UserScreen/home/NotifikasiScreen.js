import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ArrowButton from "../../../component/Button/ArrowButton";

export default function NotifikasiScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignSelf: "center", width: "90%" }}>
      <View style={{ marginTop: "10%" }}>
        <ArrowButton
          title="Notifikasi"
          onPress={() => {
            navigation.navigate("HomeUser");
          }}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.containerText}>Belum Dibaca</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.containerText}>Telah Dibaca</Text>
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
    alignSelf:'flex-start'
  },
});
