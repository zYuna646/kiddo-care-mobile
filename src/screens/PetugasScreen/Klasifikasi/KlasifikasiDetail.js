import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import ArrowButton from "../../../component/Button/ArrowButton";
import PrimaryButton from "../../../component/Button/PrimaryButton";
import StatusDetailCard from "../../../component/Card/StatusDetailCard";
import { getData } from "../../../utils/StorageData";
import ApiRequest from "../../../utils/ApiRequest";
import LoadingIndicator from "../../../component/LoadingIndicator";

export default function KlasifikasiDetail({ navigation, route }) {
  const [result, setresult] = useState([]);
  const [user, setuser] = useState([]);
  const [data, setdata] = useState(null);
  const umur = route.params.umur;
  const [selectedId, setSelectedId] = useState();

  console.log(route.params.data);
  const radioButtons = useMemo(
    () => [
      {
        id: "0",
        value: "Ya",
      },
      {
        id: "1",
        value: "Tidak",
      },
    ],
    []
  );

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

      setuser(userData.user);
      setdata(data.pertanyaan);
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
        <View style={{ width: "90%", alignSelf: "center", flex: 1 }}>
          <View style={{ flex: 1, marginTop: "10%" }}>
            <ArrowButton title="Perkembangan Kongnitif" />
          </View>
          <View
            style={{ flex: 10, backgroundColor: "#E1F4FC", borderRadius: 10 }}
          >
            <Text
              style={{
                marginTop: "5%",
                fontFamily: "Poppins-Bold",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              PERAWATAN BAYI USIA
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
            <ScrollView style={{ flex: 1, width: "90%", alignSelf: "center" }}>
              {data.map((item, index) => (
                <StatusDetailCard
                  key={item.id}
                  radioButton={radioButtons}
                  setSelected={(value) => {
                    const newResults = [...result];
                    newResults[index] = value;
                    setresult(newResults);
                  }}
                  selected={result[index]}
                  nomor={index + 1}
                  question={item.pertanyaan}
                />
              ))}
            </ScrollView>
          </View>
          <View style={{ flex: 1, marginTop: "5%" }}>
            <PrimaryButton
              title="Selesai"
              disabled={result.length === 0 || result.length !== data.length}
              onPress={async () => {
                try {
                  for (let index = 0; index < result.length; index++) {
                    await ApiRequest(
                      "jawaban/add",
                      "POST",
                      {
                        jawaban: result[index],
                        anak_id: route.params.data.id,
                        pertanyaan_id: data[index].id,
                      },
                      {
                        Authorization: user.token,
                      }
                    );
                  }

                  const totalCount = result.reduce((count, element) => {
                    return count + (element === "0" ? 1 : 0);
                  }, 0);

                  const percentage = (totalCount / result.length) * 100;

                  const status = percentage < 20;
                  const hsl =  !status ? "stunting" : "tidak"
                  await ApiRequest(
                    "anak/status",
                    "POST",
                    {
                      status: hsl,
                      hasil: percentage.toString(),
                      anak_id: route.params.data.id,
                    },
                    {
                      Authorization: user.token,
                    }
                  );

                  await ApiRequest(
                    "anak/update/status",
                    "POST",
                    {
                      status: !status,
                      anak_id: route.params.data.id,
                    },
                    {
                      Authorization: user.token,
                    }
                  );

                  navigation.navigate("HasilPengukuran", {
                    data: route.params.data, umur: umur
                  });
                } catch (error) {
                  console.error("Error during API requests:", error);
                  // Handle error appropriately (e.g., show an error message)
                }
              }}
            />
          </View>
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
