import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import IconMenuButton from "../../../component/Button/IconMenuButton";
import { getData, removeData } from "../../../utils/StorageData";
import ApiRequest from "../../../utils/ApiRequest";
import LoadingIndicator from "../../../component/LoadingIndicator";
import PetugasCard from "../../../component/Card/PetugasCard";
import Draggable from "react-native-draggable";
import ArrowButton from "../../../component/Button/ArrowButton";
import DataPesertaCard from "../../../component/Card/DataPesertaCard";
import PrimaryButton from "../../../component/Button/PrimaryButton";

export default function LaporanPenerimaBantuan({ navigation }) {
  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);
  const [all, setAll] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [hapus, sethapus] = useState(false);

  const onRefresh = () => {
    // Your refresh logic here
    fetchData();
    // For example, you might fetch new data from an API
    setRefreshing(true);

    // Simulating a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  const fetchData = async () => {
    try {
      const userData = await getData("user");

      if (userData == null) {
        navigation.replace("SingIn");
      }

      const data = await ApiRequest(
        "puskesmas/anak",
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

      hasil = data.anak;
      filterHasil = hasil.filter((status) => status.status == "1");

      setAll(users.user);
      setData(filterHasil);
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getById = async (id) => {
    const data = await ApiRequest(
      "users/id",
      "POST",
      {
        user_id: id,
      },
      {
        Authorization: user.user.token,
      }
    );
    return data.user;
  };

  return (
    <>
      {user !== null && data !== null ? (
        <View
          style={{
            flex: 1,
            width: "100%",
            alignSelf: "center",
            backgroundColor: "#85B6FF",
          }}
        >
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View>
                <ArrowButton
                  colorArrow="white"
                  color="white"
                  title="Laporan Penerima Bantuan"
                  onPress={() => {
                    navigation.navigate("HomePetugas");
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <ScrollView
              style={{ flex: 1 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {data != null && data.length != 0 ? (
                <View style={{ alignSelf: "center", marginTop: "5%" }}>
                  {data.map((item) => (
                    <View key={item.id} style={{ width: "100%" }}>
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={hapus}
                        onRequestClose={() => {
                          sethapus(!hapus);
                        }}
                      >
                        <View
                          style={{
                            width: 300,
                            height: 179,
                            marginTop: "80%",
                            borderWidth: 1,
                            alignSelf: "center",
                            backgroundColor: "white",
                            justifyContent: "center",
                            borderWidth: 1,
                            borderRadius: 20,
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              width: "90%",
                              justifyContent: "center",
                              alignSelf: "center",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                setModalVisible(false);
                                navigation.navigate("InputAnak");
                              }}
                            >
                              <View style={{ alignSelf: "center" }}>
                                <Text
                                  style={{
                                    fontFamily: "Poppins-Medium",
                                    fontSize: 20,
                                    textAlign: "center",
                                  }}
                                >
                                  Masukan Kedalam Penerima Bantuan?
                                </Text>
                                <View style={{ flexDirection: "row" }}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      sethapus(false);
                                    }}
                                  >
                                    <View
                                      style={{
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        width: 95,
                                        height: 44,
                                        marginRight: "5%",
                                      }}
                                    >
                                      <Text
                                        style={{
                                          textAlign: "center",
                                          alignSelf: "center",
                                          marginTop: "10%",
                                        }}
                                      >
                                        Batal
                                      </Text>
                                    </View>
                                  </TouchableOpacity>

                                  <TouchableOpacity
                                    onPress={async () => {
                                      await ApiRequest(
                                        "anak/update/bantuan",
                                        "POST",
                                        {
                                          status: "1",
                                          anak_id: item.id,
                                        },
                                        {
                                          Authorization: user.user.token,
                                        }
                                      );
                                      sethapus(false);
                                    }}
                                  >
                                    <View
                                      style={{
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        width: 95,
                                        height: 44,
                                        backgroundColor: "green",
                                      }}
                                    >
                                      <Text
                                        style={{
                                          textAlign: "center",
                                          alignSelf: "center",
                                          marginTop: "10%",
                                        }}
                                      >
                                        Ya
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Modal>
                      <DataPesertaCard
                        bantuan={item.isBantuan}
                        name={item.name}
                        nik={item.nik}
                        onPress={() => {
                          if (item.isBantuan == "0") {
                            sethapus(true);
                          }
                        }}
                        onPressHapus={() => {
                          sethapus(true);
                        }}
                      />
                    </View>
                  ))}
                </View>
              ) : (
                <></>
              )}
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
  logo: {
    marginTop: "2%",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "white",
  },

  menu: {
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
  },
  headerContent: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: "10%",
    flex: 1,
    alignSelf: "center",
    width: "90%",
    alignItems: "center",
  },

  body: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 6,
  },
});
