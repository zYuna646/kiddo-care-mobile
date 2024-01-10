import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import InputForm from "../../component/Form/InputForm";
import PasswordForm from "../../component/Form/PasswordForm";
import TextButton from "../../component/Button/TextButton";
import PrimaryButton from "../../component/Button/PrimaryButton";
import CenterLineText from "../../component/Text/CenterLineText";
import GoogleButton from "../../component/Button/GoogleButton";
import IconButton from "../../component/Button/IconButton";
import Checkbox from "expo-checkbox";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setSelected] = useState(false);

  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.PrymaryText}>Selamat</Text>
          <Text style={styles.PrymaryText}>Bergabung!</Text>
          <Text style={styles.normalText}>
            Mengawali perjalanan kesehatan yang lebih baik dan lebih mudah
            dimulai di sini
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <ScrollView style={styles.bodyContent}>
          <View>
            <InputForm
              icon="user"
              title="Nama Lengkap"
              onChangeText={setName}
              value={name}
            />
          </View>
          <View style={{ marginTop: "5%" }}>
            <InputForm
              icon="envelope-o"
              title="Email"
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View style={{ marginTop: "5%" }}>
            <InputForm
              icon="phone"
              title="Telepon"
              onChangeText={setNumber}
              value={number}
            />
          </View>

          <View style={{ marginTop: "5%" }}>
            <PasswordForm
              icon="lock"
              title="Password"
              onChangeText={setPassword}
              value={password}
              visible={true}
            />
          </View>
          <View style={{ marginTop: "5%" }}>
            <PasswordForm
              icon="lock"
              title="Konfirmasi Password"
              onChangeText={setConfirm}
              value={confirm}
              visible={true}
            />
          </View>

          <View style={{ marginTop: "5%", flexDirection: "row", alignItems:'center',}}>
            <Checkbox
              style={styles.checkbox}
              value={isSelected}
              onValueChange={setSelected}
              color={isSelected ? "#0B74FA" : undefined}
            />
            <View style={{marginLeft: 10}}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontFamily:'Poppins-Light', fontSize:12, marginRight: 5 }}>Saya menerima segala isi</Text>
                <TextButton title="Syarat Penggunaan" />
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{ fontFamily:'Poppins-Light', fontSize: 12, marginRight: 5 }}>dan</Text>
                <TextButton title="Kebijakan Privasi" />
                <Text style={{ fontFamily:'Poppins-Light', fontSize: 12, marginLeft: 5 }}>KiddoCare</Text>
              </View>
            </View>
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
              marginBottom: "10%",
            }}
          >
            <Text style={{ color: "#BDBDBD", fontSize: 12, marginRight: 5 }}>
              SUdah memiliki akun?
            </Text>
            <TextButton title="Masuk Akun" />
          </View>
        </ScrollView>
      </View>

     
    </View>
  );
}

const styles = StyleSheet.create({
  popup: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
    width: "100%",
  },

  popItem: {
    marginTop: "5%",
    width: "90%",
    alignSelf: "center",
  },

  checkbox: {
    borderRadius: 5,
  },

  pop: {
    position: "absolute",
    bottom: 0,
    height: "50%",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    justifyContent: "center",
    flex: 1,
  },

  bodyContent: {
    marginTop: "5%",
    width: "90%",
  },
});
