import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"; // Import the necessary icon libraries
import HomePetugas from "./Home/HomePetugas";
import PemantauanPetugas from "./Home/PemantauanPetugas";
import KlasifikasiScreen from "./Home/KlasifikasiScreen";
import LaporanScreen from "./Home/LaporanScreen";

const Tab = createBottomTabNavigator();

export default function TabPetugas() {
  return (
    <Tab.Navigator
      initialRouteName="HomePetugas"
      screenOptions={{
        activeTintColor: "#00A3FF", // Change the color of the active tab
        inactiveTintColor: "gray", // Change the color of inactive tabs
      }}
    
     
    >
      <Tab.Screen
        name="HomePetugas"
        component={HomePetugas}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Klasifikasi"
        component={KlasifikasiScreen}
        options={{
          tabBarLabel: "Klasifikasi",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="calculator" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
       <Tab.Screen
        name="Laporan"
        component={LaporanScreen}
        options={{
          tabBarLabel: "Laporan",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="barschart" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PemantauanPetugas"
        component={PemantauanPetugas}
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
