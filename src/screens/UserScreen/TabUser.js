import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"; // Import the necessary icon libraries
import HomeScreen from "./home/HomeScreen";
import StatusScreen from "./home/StatusScreen";
import PemantauanScreen from "./home/PemantauanScreen";

const Tab = createBottomTabNavigator();

export default function TabUser() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        activeTintColor: "#00A3FF", // Change the color of the active tab
        inactiveTintColor: "gray", // Change the color of inactive tabs
      }}
    
     
    >
      <Tab.Screen
        name="HomeUser"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Status"
        component={StatusScreen}
        options={{
          tabBarLabel: "Status",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="circle-o" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Pemantauan"
        component={PemantauanScreen}
        options={{
          tabBarLabel: "Pemantauan",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="solution1" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
