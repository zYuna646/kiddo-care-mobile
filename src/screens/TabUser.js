import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./home/HomeScreen";
import StatusScreen from "./home/StatusScreen";
import PemantauanScreen from "./home/PemantauanScreen";

const Tab = createBottomTabNavigator();

export default function TabUser() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="HomeUser"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Status"
        component={StatusScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Pemantauan"
        component={PemantauanScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
