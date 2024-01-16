import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";

export default function ArtikelCard({ image, title }) {
  return (
    <TouchableOpacity onPress={() =>{}}>
      <View
        style={{
          width: 171,
          height: 244,
          backgroundColor: "white",
          borderRadius: 10,
          marginLeft: 5,
          marginRight: 5,
        }}
      >
        <View style={{ alignSelf: "center", marginTop: "10%", width: "90%" }}>
          <Image
            source={{
              uri: image,
            }}
            resizeMode="cover"
            style={{ height: 113, width: 151, borderRadius: 10 }}
          />
          <Text
            style={{
              marginTop: "5%",
              fontSize: 16,
              fontFamily: "Poppins-Bold",
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
