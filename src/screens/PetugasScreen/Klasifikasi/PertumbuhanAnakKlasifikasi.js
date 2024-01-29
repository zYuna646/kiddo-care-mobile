import { StyleSheet, Text, TextInput, View, Image, NativeModules } from "react-native";
import React, { useState } from "react";
import ArrowButton from "../../../component/Button/ArrowButton";
import PrimaryButton from "../../../component/Button/PrimaryButton";
import { getData } from "../../../utils/StorageData";
import { differenceInMonths, set } from "date-fns";
import ApiRequest from "../../../utils/ApiRequest";

export default function PertumbuhanAnakKlasifikasi({ navigation, route }) {
  const [tinggianak, settinggi] = useState(null);
  const [visible, setvisible] = useState(false);
  const [stunting, setstunting] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0B74FA",
        alignSelf: "center",
        width: "100%",
      }}
    >
      <View
        style={{ flex: 1, marginTop: "10%", alignSelf: "center", width: "90%" }}
      >
        <ArrowButton title="Klasifikasi" />
      </View>
      <View
        style={{
          flex: 10,
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View
          style={{
            marginTop: "10%",
            alignSelf: "center",
            width: 350,
            height: 250,
            borderRadius: 10,
            borderWidth: 1,
          }}
        >
          {visible == false ? (
            <View>
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: "5%",
                  fontFamily: "Poppins-Bold",
                  fontSize: 16,
                }}
              >
                Tinggi Anak
              </Text>
              <View style={{ marginTop: "5%", alignSelf: "center" }}>
                <TextInput
                  keyboardType="numeric"
                  style={{
                    width: 306,
                    height: 50,
                    borderWidth: 1,
                    borderRadius: 15,
                    padding: 10,
                    paddingLeft: 15,
                    fontFamily: "Poppins-Bold",
                  }}
                  onChangeText={(text) => settinggi(text)}
                  value={tinggianak}
                  placeholder="Masukkan Tinggi Anak"
                />
              </View>
              <View style={{ padding: 20, marginTop: "10%" }}>
                <PrimaryButton
                  title="Selesai"
                  disabled={!(tinggianak != null)}
                  onPress={async () => {
                    try {
                      console.log("here");
                      const user = await getData("user");
                      console.log(user);

                      const currentDate = new Date();
                      const birthDate = new Date(
                        route.params.data.tanggal_lahir
                      );
                      console.log(route.params.data);

                      const monthsDifference = differenceInMonths(
                        currentDate,
                        birthDate
                      );

                      const data = await ApiRequest(
                        "anak/klasifikasi",
                        "POST",
                        {
                          jenis_kelamin: route.params.data.jenis_kelamin,
                          tinggi: tinggianak,
                          usia: monthsDifference,
                        },
                        {
                          Authorization: user.user.token,
                        }
                      );

                      if ((data.Hasil = "Stunting")) {
                        setvisible(true);
                        setstunting(true);
                      }else
                      {
                        setvisible(true)
                        setstunting(false)
                      }

                      console.log(data); // Move this inside the try block
                    } catch (error) {
                      console.error("Error fetching data:", error.message);
                    }
                  }}
                />
              </View>
            </View>
          ) : (
            <>
              {stunting ? (
                <View>
                  <Image
                    source={require("../../../../assets/img/PemantauanStunting.png")}
                    resizeMode="cover"
                    style={{
                      height: 48,
                      width: 48,
                      alignSelf: "center",
                      marginTop: "5%",
                    }}
                  />
                  <Text
                    style={{
                      alignSelf: "center",
                      marginTop: "5%",
                      fontFamily: "Poppins-Bold",
                      fontSize: 16,
                    }}
                  >
                    Anak Berpotensi Stunting
                  </Text>
                  <View style={{ padding: 20, marginTop: "10%" }}>
                    <PrimaryButton title="Selanjutnya" onPress={() => {
                        navigation.navigate('KlasifikasiDetail')
                    }}/>
                  </View>
                </View>
              ) : (
                <View>
                  <Image
                    source={require("../../../../assets/img/TidakStunting.png")}
                    resizeMode="cover"
                    style={{
                      height: 48,
                      width: 48,
                      alignSelf: "center",
                      marginTop: "5%",
                    }}
                  />
                  <Text
                    style={{
                      alignSelf: "center",
                      marginTop: "5%",
                      fontFamily: "Poppins-Bold",
                      fontSize: 16,
                    }}
                  >
                    Anak Tidak Berpotensi Stunting
                  </Text>
                  <View style={{ padding: 20, marginTop: "10%" }}>
                    <PrimaryButton title="Selesai" onPress={() => {
                        navigation.navigate('HomePetugas')
                    }} />
                  </View>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
