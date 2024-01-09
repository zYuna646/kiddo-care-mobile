import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function PrimaryButton({ onPress, title, disabled = false }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: disabled ? "#E0E0E0" : "#00A3FF" },
      ]}
      disabled={disabled}
    >
      <View style={styles.buttonContainer}>
        <Text style={[styles.buttonText, { color: disabled? "#BDBDBD" : "#fff"}]}>{title}</Text>
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
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
});
