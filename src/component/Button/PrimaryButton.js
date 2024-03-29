import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function PrimaryButton({ onPress, title, disabled = false, fontSize = 16, color= '#00A3FF' }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: disabled ? "#E0E0E0" : color },
      ]}
      disabled={disabled}
    >
      <View style={styles.buttonContainer}>
        <Text style={[styles.buttonText, { color: disabled? "#BDBDBD" : "#fff", fontSize: fontSize}]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 10,
    width: "100%",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
  },
});
