import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function PrimaryButton() {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
