import React, { useState, useEffect, useRef, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import ArrowButton from "../../../component/Button/ArrowButton";
import * as Progress from "react-native-progress";
import StatusDetailCard from "../../../component/Card/StatusDetailCard";
import { getData } from "../../../utils/StorageData";
import ApiRequest from "../../../utils/ApiRequest";
import LoadingIndicator from "../../../component/LoadingIndicator";

export default function HasilPengukuran({ navigation, route }) {
  const [result, setresult] = useState([]);
  const [data, setData] = useState(null);
  const [anak, setAnak] = useState(route.params.data);
  const umur = route.params.umur;
  const [user, setUser] = useState(null);
  const [hasil, setHasil] = useState(null);
  const [status, setStatus] = useState(null);

  const [progressValue, setProgressValue] = useState(0.4);
  const progressRef = useRef(null);

  const fetchData = async () => {
    try {
      const userData = await getData("user");

      const data = await ApiRequest(
        "pertanyaan",
        "POST",
        {
          usia: umur,
        },
        {
          Authorization: userData.user.token,
        }
      );

      const status = await ApiRequest(
        "anak/hasil/status",
        "POST",
        {
          anak_id: anak.id,
        },
        {
          Authorization: userData.user.token,
        }
      );

      jawaban = data.jawaban;
      const filteredJawaban = jawaban.filter(
        (answer) => answer.anak_id === anak.id
      );
      setProgressValue(status.status.hasil / 100);
      setStatus(status.status);
      setHasil(filteredJawaban);
      setUser(userData.user);
      setData(data.pertanyaan);

      // Only proceed with the loop if data is not null
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  console.log(hasil);

  useEffect(() => {
    fetchData();
  }, []);

  const radioButtons = useMemo(
    () => [
      {
        id: "0",
        value: "Yes",
      },
      {
        id: "1",
        value: "No",
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState();

  return (
    <>
      {data != null ? (
        <View style={styles.container}>
          <View style={styles.top}>
            <ArrowButton
              title="Hasil Pengukuran"
              onPress={() => {
                navigation.navigate("HomePetugas");
              }}
            />
          </View>
          <View style={styles.body}>
            <Text
              style={{
                alignSelf: "center",
                color: "black",
                fontFamily: "Poppins-Bold",
                fontSize: 16,
              }}
            >
              Persentase Berpotensi Stunting
            </Text>
            <ScrollView style={{ flex: 1 }}>
              <View
                style={{
                  width: "100%",
                  height: 300,
                  backgroundColor: "rgba(128, 128, 128, 0.5)",
                  borderRadius: 10,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View style={{ alignSelf: "center" }}>
                  <Progress.Circle
                    key={progressValue} // Key prop ensures component re-renders when progressValue changes
                    size={120}
                    progress={progressValue}
                    textStyle={{ color: "black", fontFamily: "Poppins-Bold" }}
                    thickness={25}
                    style={{ alignSelf: "center", marginTop: "10%" }}
                    unfilledColor="#FF0000"
                    indeterminate={false}
                    borderColor="rgba(128, 128, 128, 0.5)"
                    color="#99FF97"
                    ref={progressRef}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      alignSelf: "center",
                      fontFamily: "Poppins-Bold",
                      fontSize: 24,
                      marginTop: "5%",
                    }}
                  >
                    {progressValue * 100}%
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      alignSelf: "center",
                      fontFamily: "Poppins-Bold",
                      fontSize: 24,
                    }}
                  >
                    {status.status === "stunting"
                      ? "Anak Terindikasi Stunting"
                      : "Anak Tidak Terinddikasi Stunting"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  marginTop: "5%",
                  backgroundColor: "#E1F4FC",
                  borderRadius: 10,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: "5%",
                    fontFamily: "Poppins-Bold",
                    fontSize: 16,
                  }}
                >
                  PERAWATAN BAYI USIA 3-6 BULAN
                </Text>
                <View
                  style={{
                    marginTop: "5%",
                    flexDirection: "row",
                    alignSelf: "flex-end",
                    marginRight: "5%",
                  }}
                >
                  <View
                    style={{
                      width: 46,
                      height: 18,
                      backgroundColor: "#99FF97",
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "Poppins-Bold",
                        fontSize: 12,
                      }}
                    >
                      YA
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 46,
                      height: 18,
                      backgroundColor: "#FF0000",
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "Poppins-Bold",
                        fontSize: 12,
                      }}
                    >
                      TIDAK
                    </Text>
                  </View>
                </View>
                <View style={{ alignSelf: "center", width: "90%" }}>
                  {data.map((item, index) => (
                    <StatusDetailCard
                      key={item.id}
                      radioButton={radioButtons}
                      setSelected={(value) => {
                        const newResults = [...result];
                        newResults[index] = value;
                        setresult(newResults);
                      }}
                      selected={hasil.find((h) => h.id === item.id).jawaban}
                      nomor={index + 1}
                      question={item.pertanyaan}
                    />
                  ))}
                </View>
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
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },

  cardName: {
    fontFamily: "Poppins-Bold",
    color: "white",
    fontSize: 14,
  },

  cardSecond: {
    fontFamily: "Poppins-Bold",
    color: "black",
    fontSize: 12,
  },

  cardDetail: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#343A40",
  },

  body: {
    flex: 10,
  },

  top: {
    marginTop: "10%",
    flex: 1,
  },

  middle: {
    flex: 2,
    backgroundColor: "blue",
  },

  bottom: {
    flex: 2,
    backgroundColor: "purple",
  },
});
