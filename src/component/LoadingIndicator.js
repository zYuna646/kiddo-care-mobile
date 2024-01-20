import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function LoadingIndicator() {
  return (
    <View style={{alignSelf:'center', justifyContent:'center', flex: 1}}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({});
