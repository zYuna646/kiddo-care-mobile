import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ArrowButton from "../../../component/Button/ArrowButton";
import LoadingIndicator from "../../../component/LoadingIndicator";
import { getData } from "../../../utils/StorageData";
import ApiRequest from "../../../utils/ApiRequest";
import StatusCard from "../../../component/Card/StatusCard";
import NormalCard from "../../../component/Card/NormalCard";

export default function PertumbuhanAnak({ navigation }) {
  const [data, setData] = useState(null);
  const [all, setAll] = useState(null);
  const [user, setUser] = useState(null);

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

  return (
    <>
      {data != null ? (
        <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
         
          <View style={{ flex: 12,marginTop:'10%' }}>
          <ScrollView style={{ flex: 1 }}>
              {data.map((item) => (
                <View key={item.id} style={{marginTop:'2%'}}>
                  <NormalCard
                    name={item.name}
                    kelamin={item.jenis_kelamin}
                    no_ktp={item.nik}
                    anak_ke={item.anak_ke}
                    nama_ibu={
                      all.find((dt) => dt.id === item.masyrakat_id)?.username
                    }
                    onPress={() => {
                        navigation.navigate('KlasifikasiAnak', {data: item})
                    }}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
