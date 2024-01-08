import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function GoogleButton({onPress, title}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#00A3FF',
        padding: 12,
        borderRadius: 5,
        width: '90%',
      },
      buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: "Poppins"
      },
});
