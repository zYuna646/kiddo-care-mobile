import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/UserScreen/home/HomeScreen";
import SignUpScreenUser from "./src/screens/UserScreen/singIn/SingupScreenUser";
import SignUpScreenPetugas from "./src/screens/PetugasScreen/SingupScreenPetugas";
import SignInScreen from "./src/screens/UserScreen/singIn/SignInScreen";
import VerifikasiOTPScreen from "./src/screens/verifikasi/VerifikasiOTPScreen";
import { getData, removeData } from "./src/utils/StorageData";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import TabUser from "./src/screens/UserScreen/TabUser";
import ProfilScreen from "./src/screens/UserScreen/profil/ProfilScreen";
import ProfileDetail from "./src/screens/UserScreen/profil/ProfileDetail";
import InfoAplikasi from "./src/screens/UserScreen/profil/InfoAplikasi";
import EditProfile from "./src/screens/UserScreen/profil/EditProfile";
import StatusDetail from "./src/screens/UserScreen/home/StatusDetail";
import NotifikasiScreen from "./src/screens/UserScreen/home/NotifikasiScreen";
import SearchScreen from "./src/screens/UserScreen/home/SearchScreen";
import TabPetugas from "./src/screens/PetugasScreen/TabPetugas";
import ArtikelDetailScreen from "./src/screens/UserScreen/home/ArtikelDetailScreen";
import InputAnakScreen from "./src/screens/PetugasScreen/input/InputAnakScreen";
import PertumbuhanAnak from "./src/screens/PetugasScreen/Klasifikasi/PertumbuhanAnak";
import PertumbuhanAnakKlasifikasi from "./src/screens/PetugasScreen/Klasifikasi/PertumbuhanAnakKlasifikasi";
import KlasifikasiDetail from "./src/screens/PetugasScreen/Klasifikasi/KlasifikasiDetail";
import LaporanDataPeserta from "./src/screens/PetugasScreen/Home/LaporanDataPeserta";
import LaporanPengukuran from "./src/screens/PetugasScreen/Home/LaporanPengukuran";
import LaporanPenerimaBantuan from "./src/screens/PetugasScreen/Home/LaporanPenerimaBantuan";
import HasilPengukuran from "./src/screens/PetugasScreen/Klasifikasi/HasilPengukuran";
import DetailAnak from "./src/screens/PetugasScreen/Home/DetailAnak";

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
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Home"}>
          <Stack.Screen
            name="Home"
            component={TabUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomePetugas"
            component={TabPetugas}
            options={{ headerShown: false }}
          />
            <Stack.Screen
            name="LaporanDataPeserta"
            component={LaporanDataPeserta}
            options={{ headerShown: false }}
          />
            <Stack.Screen
            name="HasilPengukuran"
            component={HasilPengukuran}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LaporanPengukuran"
            component={LaporanPengukuran}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="LaporanPenerimaBantuan"
            component={LaporanPenerimaBantuan}
            options={{ headerShown: false }}
          />
            <Stack.Screen
            name="KlasifikasiDetail"
            component={KlasifikasiDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="KlasifikasiAnak"
            component={PertumbuhanAnakKlasifikasi}
            options={{ headerShown: false }}
          />
            <Stack.Screen
            name="PertumbuhanAnak"
            component={PertumbuhanAnak}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ArtikelDetail"
            component={ArtikelDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InputAnak"
            component={InputAnakScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SingUpUser"
            component={SignUpScreenUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SingUpPetugas"
            component={SignUpScreenPetugas}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="DetailAnak"
            component={DetailAnak}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SingIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="VerifikasiOTP"
            component={VerifikasiOTPScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfileDetail"
            component={ProfileDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InfoAplikasi"
            component={InfoAplikasi}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notifikasi"
            component={NotifikasiScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StatusDetail"
            component={StatusDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfilScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({});
