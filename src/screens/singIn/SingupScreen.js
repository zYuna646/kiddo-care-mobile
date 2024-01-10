import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useFonts } from "expo-font";
import InputForm from "../../component/Form/InputForm";
import PasswordForm from "../../component/Form/PasswordForm";
import TextButton from "../../component/Button/TextButton";
import PrimaryButton from "../../component/Button/PrimaryButton";
import CenterLineText from "../../component/Text/CenterLineText";
import GoogleButton from "../../component/Button/GoogleButton";
import IconButton from "../../component/Button/IconButton";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");

  const slideAnim = useRef(new Animated.Value(1000)).current;

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: 1000,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

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

          <View style={{ marginTop: "5%" }}>
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
              Belum memiliki akun?
            </Text>
            <TextButton onPress={slideIn} title="Buat Akun" />
          </View>
        </ScrollView>
      </View>

      <Animated.View style={[styles.popup, { bottom: slideAnim }]}>
        <View style={styles.pop}>
          <View style={styles.popItem}>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 24,
                fontFamily: "Poppins-Bold",
              }}
            >
              Daftar Sebagai
            </Text>
            <View style={{ marginTop: "5%" }}>
              <IconButton icon="plus" title="Puskesmas" onPress={slideOut} />
            </View>
            <View style={{ marginTop: "5%" }}>
              <IconButton
                icon="user-circle"
                title="Pribadi"
                onPress={slideOut}
              />
            </View>
          </View>
        </View>
      </Animated.View>
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
