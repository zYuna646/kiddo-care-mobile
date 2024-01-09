import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import InputForm from "../../component/Form/InputForm";
import PasswordForm from "../../component/Form/PasswordForm";
import TextButton from "../../component/Button/TextButton";
import PrimaryButton from "../../component/Button/PrimaryButton";
import CenterLineText from "../../component/Text/CenterLineText";
import GoogleButton from "../../component/Button/GoogleButton";

export default function SignInScreen() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.PrymaryText}>Selamat Datang</Text>
          <Text style={styles.PrymaryText}>Kembali!</Text>
          <Text style={styles.normalText}>
            Masuklah untuk mengakses layanan kesehatan yang terbaik untuk anda
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <View>
            <InputForm icon="envelope-o" title="Email/Nomor Telepon" />
          </View>
          <View style={{ marginTop: "5%" }}>
            <PasswordForm icon="lock" title="Password" />
          </View>
          <View style={{ marginTop: "5%", alignSelf: "flex-end" }}>
            <TextButton title="Lupa Password ?" />
          </View>
          <View style={{ marginTop: "5%" }}>
            <PrimaryButton title="Masuk Akun" />
          </View>
          <View style={{ marginTop: "5%" }}>
            <CenterLineText title="Atau" />
          </View>
          <View style={{ marginTop: "5%" }}>
            <GoogleButton title="Masuk menggunakan Google" />
          </View>
          <View
            style={{
              marginTop: "5%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#BDBDBD", fontSize: 12, marginRight: 5 }}>
              Belum memiliki akun?
            </Text>
            <TextButton title="Buat Akun" />
          </View>
        </View>
      </View>
      <View style={styles.popup}>
        <View style={styles.pop}>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  popup: {
    position: "absolute",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: "100%",
    width: "100%",
   
  },

  pop:
  {
    position: "absolute",
    bottom: 0,
    height: "50%",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius:20,
    backgroundColor: "white",
  },

  container: {
    
    height: "100%",
    width: "100%",
  },

  header: {
    backgroundColor: "#00A3FF",
    height: 197.54,
    justifyContent: "center",
  },

  headerContent: {
    marginTop: "10%",
    marginLeft: "5%",
  },

  PrymaryText: {
    fontFamily: "Poppins-Bold",
    color: "white",
    fontSize: 24,
  },
  normalText: {
    fontFamily: "Poppins-Light",
    marginTop: "2%",
    marginRight: "10%",
    color: "white",
    fontSize: 12,
  },

  body: {
    alignSelf: "center",
  },

  bodyContent: {
    marginTop: "5%",
    width: "90%",
    justifyContent: "center",
  },
});
