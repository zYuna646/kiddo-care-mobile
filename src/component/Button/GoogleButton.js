import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

export default function GoogleButton({ onPress, title }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.buttonContainer}>
        <FontAwesome name="google" size={24} color="gray" />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 10,
    color: '#343A40',
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});
