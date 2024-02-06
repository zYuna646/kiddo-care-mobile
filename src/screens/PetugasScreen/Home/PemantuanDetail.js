import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ArrowButton from "../../../component/Button/ArrowButton";
import ApiRequest from "../../../utils/ApiRequest";
import { getData } from "../../../utils/StorageData";
import LoadingIndicator from "../../../component/LoadingIndicator";

export default function PemantuanDetail({ navigation, route }) {
  const anak = route.params.data;
  const [data, setdata] = useState(null);
  const [user, setuser] = useState(null);

  const fetchData = async () => {
    try {
      const userData = await getData("user");

      const data = await ApiRequest(
        "anak/log",
        "POST",
        {
          anak_id: anak.id,
        },
        {
          Authorization: userData.user.token,
        }
      );
      hasil = data.log;
      filterlog = hasil.filter((item) => item.anak_id == anak.id);

      setdata(filterlog);
      setuser(userData);
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
        <View style={{ alignSelf: "center", flex: 1, width: "90%" }}>
          <View style={{ flex: 1, marginTop: "10%" }}>
            <ArrowButton
              title="Pemantauan Bantuan"
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
          </View>
          <View style={{ flex: 10 }}>
            <ScrollView style={{ flex: 1 }}>
              {data.map((item) => {
                // Extract createdAt from the item
                const createdAt = item.created_at;

                // Convert the 'created_at' string to a Date object
                const dateObject = new Date(createdAt);

                // Format the date to "DD-MM-YYYY" format
                const formattedDate = `${dateObject
                  .getDate()
                  .toString()
                  .padStart(2, "0")}-${(dateObject.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}-${dateObject.getFullYear()}`;
                let backgroundColor;
                switch (item.status) {
                  case "belum":
                    backgroundColor = "gray";
                    break;
                  case "proses":
                    backgroundColor = "yellow";
                    break;
                  case "tolak":
                    backgroundColor = "red";
                    break;
                  default:
                    backgroundColor = "green";
                }

                return (
                  <TouchableOpacity
                    key={item.id} // Assuming item has an 'id' property
                    onPress={() => {
                      if (user.user.role == "petugas") {
                        navigation.navigate("CommentPemantauan", {
                          data: anak,
                          log: item,
                          date: formattedDate,
                        });
                      } else {
                        navigation.navigate("InputPemantauan", {
                          data: anak,
                          log: item,
                          date: formattedDate,
                        });
                      }
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        height: 70,
                        backgroundColor: backgroundColor,
                        borderRadius: 10,
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          padding: 20,
                          fontFamily: "Poppins-Bold",
                          fontSize: 20,
                        }}
                      >
                        {formattedDate}
                      </Text>
                      <Text
                        style={{
                          padding: 20,
                          fontFamily: "Poppins-Medium",
                          fontSize: 15,
                          marginLeft: "20%",
                        }}
                      >
                        {item.status}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
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
