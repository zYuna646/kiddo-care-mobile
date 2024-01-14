import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function IconMenuButton({ icon, size, onPress , color='black'}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <FontAwesome name={icon} size={size} style={styles.icon} color={color}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf:'center',
    alignItems:'center'
  },
});
