import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "./src/component/Button/PrimaryButton";
import SignInScreen from "./src/screens/singIn/SignInScreen";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins/Poppins-Thin.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }
  return (
    <View>
      <SignInScreen />
    </View>
  );
}

const styles = StyleSheet.create({});
