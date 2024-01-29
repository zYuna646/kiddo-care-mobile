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

export default function LaporanPengukuran({ navigation }) {
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

      setAll(users.user);
      setData(data.anak);
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
                <ArrowButton colorArrow="white" color="white" title='Laporan Data Peserta' onPress={() => {
                  navigation.navigate('HomePetugas')
                }}/>
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
                      <DataPesertaCard
                        name={item.name}
                        nik={item.nik}
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
