import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import ArrowButton from "../../../component/Button/ArrowButton";
import ApiRequest from "../../../utils/ApiRequest";
import LoadingIndicator from "../../../component/LoadingIndicator";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

export default function ArtikelDetailScreen({ navigation, route }) {
  const [data, setData] = useState(route.params.data);
  const [kategori, setKategori] = useState(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(data);
        const kategori = await ApiRequest("artikel/kategori/id", "POST", {
          kategori_id: data.kategori_id,
        });

        setKategori(kategori.kategori);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchData();
  }, []);

  const source = {
    html: data.body,
  };

  return (
    <>
      {kategori ? (
        <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
          <View style={{ flex: 2 }}>
            <View style={{ marginTop: "10%" }}>
              <ArrowButton
                onPress={() => navigation.navigate("Home")}
                title="Edukasi"
              />
            </View>
            <View style={{ marginTop: "5%" }}>
              <Text style={{ fontFamily: "Poppins-Bold", fontSize: 18 }}>
                {data.title}
              </Text>
            </View>
            <View
              style={{
                marginTop: "5%",
                borderRadius: 10,
                backgroundColor: "#E6F7FF",
                width: "auto",
                padding: 2,
                width: "40%",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 12,
                  color: "#53ABFC",
                  textAlign: "center",
                }}
              >
                {kategori.name}
              </Text>
            </View>
          </View>

          <View style={{ flex: 6 }}>
            <ScrollView style={{ flex: 1 }}>
              <View style={{ alignSelf: "center", marginTop: "2%" }}>
                <Image
                  source={{
                    uri:
                      "https://7532-36-85-218-75.ngrok-free.app/uploads/catalog/image/" +
                      data.cover,
                  }}
                  resizeMode="cover"
                  style={{ height: 165, width: 356, borderRadius: 10, alignSelf:'center' }}
                />
              </View>

              <View style={{ marginTop: "5%" }}>
                <RenderHtml contentWidth={width} source={source} />
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

const styles = StyleSheet.create({});
