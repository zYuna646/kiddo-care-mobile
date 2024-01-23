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

import Checkbox from "expo-checkbox";
import Toast from "react-native-toast-message";

import ApiRequest from "../../utils/ApiRequest";
import { Picker } from "@react-native-picker/picker";

import LoadingIndicator from "../../component/LoadingIndicator";
import WilayahApi, {
  fetchKabupaten,
  fetchKecamatan,
} from "../../utils/WilayahApiRequest";


export default function  SingupScreenPetugas({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [ktp, setKTP] = useState("");
  const [provinsi, setProvinsi] = useState(null);
  const [kabupaten, setKabupaten] = useState(null);
  const [kecamatan, setKecamatan] = useState(null);

  const [fkecamatan, setfKecamatan] = useState(null);
  const [fkabupaten, setfKabupaten] = useState(null);
  const [fprovinsi, setfProvinsi] = useState(null);
  const [filteredPuskesmas, setFilteredPuskesmas] = useState(null);

  const [puskesmas, setPuskesmas] = useState(null);

  const [kk, setKK] = useState("");
  const [number, setNumber] = useState("");
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setSelected] = useState(false);
  const [selectedJK, setSelectedJK] = useState("Laki-Laki");

  const [selectedPuskesmas, setSelectedPuskesmas] = useState(null);
  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [selectedKabupaten, setSelectedKabupaten] = useState(null);
  const [selectedKecamatan, setSelectedKecamatan] = useState(null);

  const [isValidName, setValidName] = useState(false);
  const [isValidKTP, setValidKTP] = useState(false);
  const [isValidKK, setValidKK] = useState(false);
  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidPhone, setValidPhone] = useState(false);
  const [isValidPass, setValidPass] = useState(false);
  const [isValidConfirmPass, setValidConfirmPass] = useState(false);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d+$/;

    setValidEmail(emailRegex.test(email));
    setValidPhone(phoneRegex.test(number) && number.length >= 10);
    setValidName(!phoneRegex.test(name) && name.length >= 1);
    setValidKTP(phoneRegex.test(ktp) && ktp.length >= 1);
    setValidKK(phoneRegex.test(kk) && kk.length >= 1);
    setValidPass(password.length > 6);
    setValidConfirmPass(confirm.length > 6 && confirm === password);
  };

  const register = async () => {
    try {
      const registerData = {
        email: email,
        phone: number,
        username: name,
        jk: selectedJK,
        password: password,
        ktp: ktp,
        kk: kk,
        role: "petugas",
        puskesmas_id: selectedPuskesmas
      };

      const data_check = {
        email: email,
        password: password,
        phone: number,
        username: name,
      };

      const data = await ApiRequest("users/check", "POST", data_check);

      if (data.data) {
        //navigation.navigate("VerifikasiOTP", { data: registerData });
        await ApiRequest("users", "POST", registerData).then(() => {
          Toast.show({
            type: "success",
            text1: "Buat Akun",
            text2: "Akun Berhasil Dibuat",
          });
          navigation.navigate("SingIn");
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Buat Akun",
        text2: "Email Atau Nomor Telepon Sudah Digunakan",
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiRequest("puskesmas", "GET");
        const provinsi = await WilayahApi("provinsi", "GET");
        if (data != null) {
          setPuskesmas(data.puskesmas);
        }

        if (provinsi != null) {
          setProvinsi(provinsi.value);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the async function here
  }, []);

  useEffect(() => {
    validateForm();
  }, [email, password, name, confirm, number, isSelected, ktp, kk, selectedJK, selectedPuskesmas]);

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  return (
    <>
      {puskesmas != null && provinsi != null ? (
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
                  icon="user"
                  title="Nomor KTP"
                  onChangeText={setKTP}
                  value={ktp}
                />
              </View>
              <View style={{ marginTop: "5%" }}>
                <InputForm
                  icon="user"
                  title="Nomor KK"
                  onChangeText={setKK}
                  value={kk}
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
                <Text style={{ fontFamily: "Poppins-Bold" }}>
                  Jenis Kelamin
                </Text>
                <View
                  style={{ borderWidth: 1, borderRadius: 10, marginTop: "5%" }}
                >
                  <Picker
                    ref={pickerRef}
                    selectedValue={selectedJK} // Use selectedJK instead of setSelected
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedJK(itemValue)
                    }
                  >
                    <Picker.Item label="Laki-Laki" value="Laki-Laki" />
                    <Picker.Item label="Perempuan" value="Perempuan" />
                  </Picker>
                </View>
              </View>

              <View style={{ marginTop: "5%" }}>
                <Text style={{ fontFamily: "Poppins-Bold" }}>Provinsi</Text>
                <View
                  style={{ borderWidth: 1, borderRadius: 10, marginTop: "5%" }}
                >
                  <Picker
                    selectedValue={selectedProvinsi}
                    onValueChange={async (itemValue, itemIndex) => {
                      const kabupaten = await fetchKabupaten(itemValue);

                      if (kabupaten != null) {
                        setKabupaten(kabupaten.value);
                      }
                      setfProvinsi(provinsi[itemIndex].name);
                      setSelectedProvinsi(itemValue);
                      setSelectedKabupaten(null);
                      setSelectedKecamatan(null);
                    }}
                  >
                    <Picker.Item label="Pilih Provinsi" value={null} />

                    {provinsi.map((province) => (
                      <Picker.Item
                        key={province.id}
                        label={province.name}
                        value={province.id}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
              {kabupaten != null ? (
                <View style={{ marginTop: "5%" }}>
                  <Text style={{ fontFamily: "Poppins-Bold" }}>Kabupaten</Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      marginTop: "5%",
                    }}
                  >
                    <Picker
                      selectedValue={selectedKabupaten} // Use selectedJK instead of setSelected
                      onValueChange={async (itemValue, itemIndex) => {
                        const kecamatan = await fetchKecamatan(itemValue);

                        if (kecamatan != null) {
                          setKecamatan(kecamatan.value);
                        }
                        setfKabupaten(kabupaten[itemIndex].name);
                        setSelectedKabupaten(itemValue);
                        setSelectedKecamatan(null);
                      }}
                    >
                      <Picker.Item label="Pilih Kabupaten" value={null} />

                      {kabupaten.map((kabupaten) => (
                        <Picker.Item
                          key={kabupaten.id}
                          label={kabupaten.name}
                          value={kabupaten.id}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              ) : (
                <></>
              )}

              {kecamatan != null ? (
                <View style={{ marginTop: "5%" }}>
                  <Text style={{ fontFamily: "Poppins-Bold" }}>Kecamatan</Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      marginTop: "5%",
                    }}
                  >
                    <Picker
                      selectedValue={selectedKecamatan} // Use selectedJK instead of setSelected
                      onValueChange={(itemValue, itemIndex) => {
                        const filteredPuskesmas = puskesmas.filter(
                          (puskes) =>
                            puskes.kecamatan === kecamatan[itemIndex - 1].name
                        );
                        setFilteredPuskesmas(filteredPuskesmas);
                        setfKecamatan(kecamatan[itemIndex - 1].name);
                        setSelectedKecamatan(itemValue);
                        setSelectedPuskesmas(null);
                      }}
                    >
                      <Picker.Item label="Pilih Kecamatan" value={null} />
                      {kecamatan.map((kecamatan) => (
                        <Picker.Item
                          key={kecamatan.id}
                          label={kecamatan.name}
                          value={kecamatan.id}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              ) : (
                <></>
              )}

              {filteredPuskesmas != null ? (
                <View style={{ marginTop: "5%" }}>
                  <Text style={{ fontFamily: "Poppins-Bold" }}>Puskesmas</Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      marginTop: "5%",
                    }}
                  >
                    <Picker
                      ref={pickerRef}
                      selectedValue={selectedPuskesmas} // Use selectedJK instead of setSelected
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedPuskesmas(itemValue)
                      }
                    >
                      <Picker.Item label="Pilih Puskesmas" value={null} />
                      {filteredPuskesmas.map((puskes) => (
                        <Picker.Item
                          key={puskes.id}
                          label={puskes.name}
                          value={puskes.id}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              ) : (
                <></>
              )}

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

              <View
                style={{
                  marginTop: "5%",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isSelected}
                  onValueChange={setSelected}
                  color={isSelected ? "#0B74FA" : undefined}
                />
                <View style={{ marginLeft: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontFamily: "Poppins-Light",
                        fontSize: 12,
                        marginRight: 5,
                      }}
                    >
                      Saya menerima segala isi
                    </Text>
                    <TextButton title="Syarat Penggunaan" />
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontFamily: "Poppins-Light",
                        fontSize: 12,
                        marginRight: 5,
                      }}
                    >
                      dan
                    </Text>
                    <TextButton title="Kebijakan Privasi" />
                    <Text
                      style={{
                        fontFamily: "Poppins-Light",
                        fontSize: 12,
                        marginLeft: 5,
                      }}
                    >
                      KiddoCare
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: "5%" }}>
                <PrimaryButton
                  title="Buat Akun"
                  onPress={register}
                  disabled={
                    !(
                      isValidEmail &&
                      isValidPass &&
                      isValidName &&
                      isValidConfirmPass &&
                      isValidPhone &&
                      isSelected &&
                      isValidKTP &&
                      isValidKK &&
                      selectedJK != null &&
                      selectedPuskesmas != null
                    )
                  }
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
                  marginBottom: "10%",
                }}
              >
                <Text
                  style={{ color: "#BDBDBD", fontSize: 12, marginRight: 5 }}
                >
                  SUdah memiliki akun?
                </Text>
                <TextButton
                  title="Masuk Akun"
                  onPress={() => {
                    navigation.navigate("SingIn");
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </>
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
