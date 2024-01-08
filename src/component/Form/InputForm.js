import { StyleSheet, Text, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

export default function InputForm({ title, onChangeText, value, icon }) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.labelForm}>{title}</Text>
        <View style={styles.form}>
          <FontAwesome name={icon} size={20} style={styles.icon} />
          <TextInput
            placeholder={`Masukkan ${title}`}
            style={styles.inputForm}
            onChangeText={onChangeText}
            value={value}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },

  inputContainer: {},

  form: {
    marginTop: 10,
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },

  labelForm: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "#343A40",
  },

  inputForm: {
    margin: 10,
    width: "85%",
    fontSize: 14,
    color: "#343A40",
  },

  icon: {
    marginLeft: 15,
    color: "#AEB0B3",
  },
});
