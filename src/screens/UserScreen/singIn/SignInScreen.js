import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useFonts } from "expo-font";
import InputForm from "../../../component/Form/InputForm";
import PasswordForm from "../../../component/Form/PasswordForm";
import TextButton from "../../../component/Button/TextButton";
import PrimaryButton from "../../../component/Button/PrimaryButton";
import CenterLineText from "../../../component/Text/CenterLineText";
import GoogleButton from "../../../component/Button/GoogleButton";
import IconButton from "../../../component/Button/IconButton";
import ApiRequest from "../../../utils/ApiRequest";
import { getData, storeData } from "../../../utils/StorageData";
import { BackHandler } from "react-native";
import Toast from "react-native-toast-message";

export default function SignInScreen({ navigation }) {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidPass, setValidPass] = useState(false);

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

  const login = async () => {
    try {
      const data = await ApiRequest("users/login", "POST", {
        username: email,
        password: password,
      });
      if (data != null) {
        
        Toast.show({
          type: "success",
          text1: "Masuk Akun",
          text2: "Berhasil Masuk",
        });

        await storeData("user", data.data).then(() => {
          navigation.navigate("Home");
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Masuk Akun",
        text2: "Email/Nomor Telepon atau Password Salah",
      });
      
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      if (/^\d+$/.test(email) && email.length >= 10) {
        setValidEmail(true);
        return true;
      } else {
        setValidEmail(false);
        return false;
      }
    }

    setValidEmail(true);
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setValidPass(false);
      return false;
    }

    setValidPass(true);
    return true;
  };

  useEffect(() => {
    validateEmail();
    validatePassword();
  }, [email, password]);

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
            <InputForm
              icon="envelope-o"
              title="Email/Nomor Telepon"
              onChangeText={setemail}
              value={email}
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
          <View style={{ marginTop: "5%", alignSelf: "flex-end" }}>
            <TextButton title="Lupa Password ?" />
          </View>
          <View style={{ marginTop: "5%" }}>
            <PrimaryButton
              title="Masuk Akun"
              onPress={login}
              disabled={!(isValidEmail && isValidPass)}
            />
          </View>
          <View style={{ marginTop: "5%" }}>
            <CenterLineText title="Atau" />
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
            <TextButton onPress={slideIn} title="Buat Akun" />
          </View>
        </View>
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
              <IconButton
                icon="plus"
                title="Puskesmas"
                onPress={() => {
                  slideOut();
                  navigation.navigate("SingUpPetugas");
                }}
              />
            </View>
            <View style={{ marginTop: "5%" }}>
              <IconButton
                icon="user-circle"
                title="Pribadi"
                onPress={() => {
                  slideOut();
                  navigation.navigate("SingUpUser");
                }}
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
  },

  bodyContent: {
    marginTop: "5%",
    width: "90%",
    justifyContent: "center",
  },
});
