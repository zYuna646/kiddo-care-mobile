import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "./src/component/Button/PrimaryButton";
import SignInScreen from "./src/screens/singIn/SignInScreen";

export default function App() {
  return (
    <View>
      <SignInScreen />
    </View>
  );
}

const styles = StyleSheet.create({});
