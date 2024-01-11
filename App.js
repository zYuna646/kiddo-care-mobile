import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/home/HomeScreen";
import SignUpScreenUser from "./src/screens/singIn/SingupScreenUser";
import SignInScreen from "./src/screens/singIn/SignInScreen";
import VerifikasiOTPScreen from "./src/screens/verifikasi/VerifikasiOTPScreen";
import { getData } from "./src/utils/StorageData";
import { useEffect, useState } from "react";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins/Poppins-Thin.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getData("user");
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    if (fontsLoaded) {
      fetchData();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return undefined;
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user != null ? "Home" : "SingIn"}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SingUpUser"
          component={SignUpScreenUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SingIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifikasiOTP"
          component={VerifikasiOTPScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
