import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IconMenuButton from "../../component/Button/IconMenuButton";

export default function InfoAplikasi({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.arrow}>
          <IconMenuButton
            icon="arrow-left"
            size={20}
            color="white"
            onPress={() => {
              navigation.navigate("Profile");
            }}
          />
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins-Medium",
              textAlign: "center",
              alignSelf: "center",
              fontSize: 16,
              marginTop: "1%",
              marginLeft: "5%",
            }}
          >
            Tentang Aplikasi
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00A3FF",
    height: "100%",
  },
  top: {
    width: "90%",
    alignSelf: "center",
    marginTop: "10%",
  },
  arrow: {
    alignSelf: "flex-start",
    flexDirection: "row",
  },
});
