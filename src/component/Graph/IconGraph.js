import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function IconGraph({ icon, size, color = "black", styles }) {
  return (
    <FontAwesome name={icon} size={size} style={styles} color={color} />
  );
}

const styles = StyleSheet.create({});
