import React, { useState, useEffect, useRef, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import ArrowButton from "../../../component/Button/ArrowButton";
import * as Progress from "react-native-progress";
import StatusDetailCard from "../../../component/Card/StatusDetailCard";
import { getData } from "../../../utils/StorageData";
import ApiRequest from "../../../utils/ApiRequest";
import LoadingIndicator from "../../../component/LoadingIndicator";

export default function StatusDetail({ navigation, route }) {
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
      const birthdateString = anak.tanggal_lahir;

      // Convert the birthdate string to a JavaScript Date object
      const birthdate = new Date(birthdateString);

      // Get the current date
      const currentDate = new Date();

      // Calculate the age in years
      const ageInMilliseconds = currentDate - birthdate;
      const ageInYears = ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000); // 365.25 days per year for leap years

      // Round the age to the nearest whole number
      const roundedAge = Math.ceil(ageInYears);
      const data = await ApiRequest(
        "pertanyaan",
        "POST",
        {
          usia: roundedAge,
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

      if (data && data.jawaban) {
        const filteredJawaban = data.jawaban.filter(
          (answer) => answer.anak_id === anak.id
        );
        setHasil(filteredJawaban.length > 0 ? filteredJawaban : null);
      } else {
        setHasil(null);
      }

      if (status && status.status !== null) {
        setStatus(status.status);
      } else {
        // Handle the case where status is null
        setStatus("Anak Belum Melakukan Pengukuran Bulan Ini");
      }

      setUser(userData.user);
      setData(data ? data.pertanyaan : null);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

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
                navigation.navigate("Home");
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
                    size={120}
                    progress={status.hasil != null ? status.hasil / 100 : 0}
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
                    {status.hasil != null ? status.hasil : 0}%
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      alignSelf: "center",
                      fontFamily: "Poppins-Bold",
                      fontSize: 24,
                    }}
                  >
                    {status.status == null
                      ? "Belum Melakukan Pengukuran Bulan Ini"
                      : status.status === "stunting"
                      ? "Anak Terindikasi Stunting"
                      : "Anak Tidak Terindikasi Stunting"}
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
                    <>
                      {hasil != null ? (
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
                      ) : (
                        <StatusDetailCard
                          key={item.id}
                          radioButton={radioButtons}
                          setSelected={(value) => {
                            const newResults = [...result];
                            newResults[index] = value;
                            setresult(newResults);
                          }}
                          selected={selectedId}
                          nomor={index + 1}
                          question={item.pertanyaan}
                        />
                      )}
                    </>
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
