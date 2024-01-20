import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IconMenuButton from "./IconMenuButton";

export default function ArrowButton({ onPress, title }) {
  return (
    <View>
      <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
        <IconMenuButton
          icon="arrow-left"
          size={20}
          color="#53ABFC"
          onPress={onPress}
        />
        <Text
          style={{
            color: "#343A40",
            fontFamily: "Poppins-Medium",
            textAlign: "center",
            alignSelf: "center",
            fontSize: 16,
            marginTop: "1%",
            marginLeft: "5%",
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
