import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function TextButton({ onPress, title }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    color: "#00A3FF",
  },
});
