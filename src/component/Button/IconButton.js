import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function IconButton({ onPress, title, icon }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["#63C7FF", "#00A3FF"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.button}
      >
        <View style={styles.buttonContainer}>
          <FontAwesome name={icon} size={40} style={styles.icon} />
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 15,
    width: "100%",
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 5 ,
    shadowOffset : { width: 1, height: 5},
  },
  buttonContainer: {
    margin: "5%",
    flexDirection: "row",
  },
  buttonText: {
    color: "black",
    alignSelf: "center",
    fontSize: 16,
    marginLeft: "5%",
    fontFamily: "Poppins-Bold",
  },

  icon:
  {
    color: 'white'
  }
});
