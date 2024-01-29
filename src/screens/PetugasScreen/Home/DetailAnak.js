import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import ArrowButton from "../../../component/Button/ArrowButton";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import LoadingIndicator from "../../../component/LoadingIndicator";
import { getData } from "../../../utils/StorageData";
import ApiRequest from "../../../utils/ApiRequest";
import PrimaryButton from "../../../component/Button/PrimaryButton";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";

export default function DetailAnak({ navigation, route }) {
  const data_anak = route.params.anak;
  const [nik, setnik] = useState(data_anak.nik);
  const [name, setname] = useState(data_anak.name);
  const [anak, setanak] = useState(data_anak.anak_ke);
  const [jk, setjk] = useState(data_anak.jenis_kelamin);
  const [buku, setbuku] = useState(data_anak.isBuku);
  const [menyusui, setmenyusui] = useState(data_anak.isMenyusui);
  const [tgl, settgl] = useState(new Date(data_anak.tanggal_lahir));
  const [berat, setberat] = useState(data_anak.berat);
  const [tinggi, settinggi] = useState(data_anak.tinggi);

  const [isNik, setisNik] = useState(false);
  const [data, setdata] = useState(null);

  const [orangTua, setorangTua] = useState(data_anak.masyarakat_id);
  const [userData, setuserdata] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const onButtonPress = () => {
    setShowPicker(true);
  };

  const onPickerChange = (event, selectedTime) => {
    if (event.type === "set") {
      setShowPicker(false);
      settgl(selectedTime || tgl);
    } else if (event.type === "dismissed") {
      setShowPicker(false);
    }
  };

  const [user, setuser] = useState(null);

  const fetchData = async () => {
    try {
      const userData = await getData("user");
      setuserdata(userData);
      const data = await ApiRequest(
        "puskesmas/masyarakat",
        "POST",
        {
          puskesmas_id: userData.petugas.puskesmas_id,
        },
        {
          Authorization: userData.user.token,
        }
      );

      const users = await ApiRequest(
        "users/all",
        "GET",
        {},
        {
          Authorization: userData.user.token,
        }
      );
      const dt = users.user;
      const masyarakatData = dt.filter((item) => item.role === "masyarakat");
      setuser(masyarakatData);
      setdata(data.masyarakat);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data !== null && user !== null ? (
        <View
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "#00A3FF",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              alignSelf: "center",
              width: "90%",
              marginTop: "10%",
            }}
          >
            <ArrowButton title="Data Peserta" colorArrow="black" />
          </View>
          <View style={{ alignSelf: "center", flex: 3 }}>
            <Image source={require("../../../../assets/img/StatusL.png")} />
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {data_anak.name}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 12,
                textAlign: "center",
                marginTop: "2%",
              }}
            >
              {data_anak.nik}
            </Text>
          </View>
          <View
            style={{
              flex: 10,
              alignSelf: "center",
              width: "100%",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              backgroundColor: "white",
            }}
          >
            <View style={{ flex: 1, alignSelf: "center", width: "90%" }}>
              <ScrollView style={{ flex: 1, marginTop: "10%" }}>
                <View style={{ marginTop: "5%" }}>
                  <Text style={styles.TextForm}>Orang Tua</Text>
                  <View style={{ borderWidth: 1, borderRadius: 10 }}>
                    <Picker
                      selectedValue={orangTua} // Use selectedJK instead of setSelected
                      onValueChange={(itemValue, itemIndex) =>
                        setorangTua(itemValue)
                      }
                    >
                      <Picker.Item label="Pilih Orang Tua" value={null} />

                      {data.map((item) => (
                        <Picker.Item
                          key={item.id}
                          value={`${item.id}`} // Convert item.id to string for label
                          label={
                            user.find((dt) => dt.id === item.user_id)
                              ?.username +
                            " - " +
                            item.nkk
                          }
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={{ marginTop: "5%" }}>
                  <Text style={styles.TextForm}>Nik. Anak</Text>
                  <TextInput
                    style={styles.Form}
                    onChangeText={setnik}
                    value={nik}
                    editable={!isNik} // Use editable instead of disabled
                    placeholder="Masukan Nik Anak"
                  />
                  <View
                    style={{
                      alignSelf: "flex-end",
                      marginTop: "2%",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ marginRight: "2%" }}>Belum Punya NIK</Text>
                    <Checkbox
                      style={{
                        borderRadius: 4,
                      }}
                      value={isNik}
                      onValueChange={setisNik}
                      color={isNik ? "#0B74FA" : undefined}
                    />
                  </View>
                </View>
                <View style={{ marginTop: "5%" }}>
                  <Text style={styles.TextForm}>Nama Anak</Text>
                  <TextInput
                    style={styles.Form}
                    onChangeText={setname}
                    value={name}
                    placeholder="Masukkan Nama Anak"
                  />
                </View>
                <View style={{ marginTop: "5%" }}>
                  <Text style={styles.TextForm}>Jenis Kelamin</Text>
                  <View style={{ borderWidth: 1, borderRadius: 10 }}>
                    <Picker
                      selectedValue={jk} // Use selectedJK instead of setSelected
                      onValueChange={(itemValue, itemIndex) => setjk(itemValue)}
                    >
                      <Picker.Item label="Laki-Laki" value="Laki-Laki" />
                      <Picker.Item label="Perempuan" value="Perempuan" />
                    </Picker>
                  </View>
                </View>

                <View style={{ marginTop: "5%" }}>
                  <Text style={styles.TextForm}>Tanggal Lahir</Text>
                  <View
                    style={{ borderWidth: 1, borderRadius: 10, height: 48 }}
                  >
                    <TouchableOpacity
                      onPress={onButtonPress}
                      style={{
                        alignSelf: "center",
                        marginTop: 15,
                        width: "100%",
                      }}
                    >
                      <Text style={{ textAlign: "center" }}>
                        {tgl.toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </Text>
                    </TouchableOpacity>
                    {showPicker && (
                      <RNDateTimePicker
                        mode="date"
                        value={tgl}
                        onChange={onPickerChange}
                      />
                    )}
                  </View>
                </View>
                <View style={{ marginTop: "5%" }}>
                  <Text style={styles.TextForm}>Anak Ke-</Text>
                  <TextInput
                    style={styles.Form}
                    onChangeText={setanak}
                    keyboardType="numeric"
                    value={anak}
                    placeholder="Masukkan Anak Keberapa"
                  />
                </View>
                <View style={{ marginTop: "5%" }}>
                  <Text style={styles.TextForm}>Berat Saat Lahir</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.Form}
                    onChangeText={setberat}
                    value={berat}
                    placeholder="Masukan Berat Anak"
                  />
                </View>
                <View style={{ marginTop: "5%" }}>
                  <Text style={styles.TextForm}>Tinggi Saat Lahir</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.Form}
                    onChangeText={settinggi}
                    value={tinggi}
                    placeholder="Masukan Tinggi Anak"
                  />
                </View>
                <View style={{ marginTop: "5%" }}>
                  <Text style={styles.TextForm}>Inisiasi Menyusui Dini</Text>
                  <View style={{ borderWidth: 1, borderRadius: 10 }}>
                    <Picker
                      selectedValue={menyusui} // Use selectedJK instead of setSelected
                      onValueChange={(itemValue, itemIndex) =>
                        setmenyusui(itemValue)
                      }
                    >
                      <Picker.Item label="Tidak" value={false} />
                      <Picker.Item label="Ya" value={true} />
                    </Picker>
                  </View>
                </View>
                <View style={{ marginTop: "5%" }}>
                  <Text style={styles.TextForm}>Memiliki Buku Kia</Text>
                  <View style={{ borderWidth: 1, borderRadius: 10 }}>
                    <Picker
                      selectedValue={buku} // Use selectedJK instead of setSelected
                      onValueChange={(itemValue, itemIndex) =>
                        setbuku(itemValue)
                      }
                    >
                      <Picker.Item label="Tidak" value={false} />
                      <Picker.Item label="Ya" value={true} />
                    </Picker>
                  </View>
                </View>
              </ScrollView>
            </View>
            <View style={{ marginTop: "2%", marginBottom: "5%", padding: 20 }}>
              <PrimaryButton
                title="Perbarui Data Anak"
                disabled={
                  !(
                    (nik !== null || isNik === false) &&
                    name != null &&
                    berat != null &&
                    tinggi != null &&
                    orangTua != null &&
                    anak != null
                  )
                }
                onPress={async () => {
                  try {
                    const requestBody = {
                      name: name,
                      nik: isNik ? "0" : nik,
                      jenis_kelamin: jk,
                      isBuku: buku,
                      isMenyusui: menyusui,
                      tanggal_lahir: new Date(tgl).toISOString().split("T")[0], // Format as Y-m-d
                      berat: berat,
                      tinggi: tinggi,
                      anak_ke: anak,
                      masyarakat_id: orangTua,
                      puskesmas_id: userData.petugas.puskesmas_id,
                    };

                    await ApiRequest("anak", "POST", requestBody, {
                      Authorization: userData.user.token,
                    });
                    Toast.show({
                      type: "success",
                      text1: "Perbarui Data Anak",
                      text2: "Berhasil Memperbarui Data Anak",
                    });

                    navigation.navigate("HomePetugas");
                  } catch (error) {
                    // Handle the error
                    console.error("Error:", error);
                  }
                }}
              />
            </View>
          </View>
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  TextForm: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  Form: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
