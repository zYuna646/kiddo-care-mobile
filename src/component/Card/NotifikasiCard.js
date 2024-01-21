import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function NotifikasiCard({ title, date, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: "100%",
          alignSelf: "center",
          backgroundColor: "#CEF3FF",
          borderRadius: 10,
          shadowColor: "rgba(0, 0, 0, 0.5)",
          shadowOpacity: 0.5,
          elevation: 6,
          shadowRadius: 5,
          padding: "5%",
          shadowOffset: { width: 1, height: 5 },
        }}
      >
        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 12 }}>
          {title}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Light",
            fontSize: 10,
            color: "#0066FF",
            verticalAlign: "bottom",
          }}
        >
          {date}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
