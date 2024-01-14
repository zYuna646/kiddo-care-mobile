import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function TextButton({ onPress, title, size = 12 }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.buttonText, {fontSize: size}]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Poppins-Light',
    color: "#00A3FF",
  },
});
