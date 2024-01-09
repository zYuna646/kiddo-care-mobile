import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function CenterLineText({title}) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.centeredText}>{title}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#CCCECF", 
  },
  centeredText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#CCCECF',
    marginHorizontal: 10, 
  },
});
