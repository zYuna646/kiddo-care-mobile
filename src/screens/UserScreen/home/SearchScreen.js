import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import ArrowButton from "../../../component/Button/ArrowButton";
import IconButton from "../../../component/Button/IconButton";
import IconMenuButton from "../../../component/Button/IconMenuButton";
import ArtikelCard from "../../../component/Card/ArtikelCard";
import ApiRequest from "../../../utils/ApiRequest";

export default function SearchScreen({ navigation, route }) {

  const [data, setData] = useState(route.kategori);
  const [artikel, setArtikel] = useState(route.artikel);

 

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    // Your refresh logic here
    // For example, you might fetch new data from an API
    setRefreshing(true);

    // Simulating a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  

  return (
    <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
      <View
        style={{
          flex: 1,
          marginTop: "10%",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <ArrowButton
          title="Edukasi"
          onPress={() => {
            navigation.navigate("HomeUser");
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ height: 35 }}>
          <ScrollView style={{ width: 350, height: 10 }} horizontal={true}>
            {data.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={{ marginRight: 5, marginLeft: 5 }}
              >
                <View
                  style={{
                    height: 34,
                    backgroundColor: "#5FCFFF",
                    alignContent: "center",
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "#5FCFFF",
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      textAlign: "center",
                      marginTop: 5,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    {item.text}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={{ flex: 16 }}>
        <View
          style={{
            borderRadius: 10,
            width: "100%",
            height: "8%",
            marginTop: "5%",
            flexDirection: "row",
            alignSelf:'center',
          }}
        >
         
          <TextInput placeholder="Cari Artikel ..." style={{ width: "95%",  alignSelf:'center',borderWidth:1, borderRadius:5, margin: 8, padding: 2, paddingLeft: 5,  }} />
        </View>
        <View style={{ flex: 1, marginTop: "2%" }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignSelf: "center",
              }}
            >
              <ArtikelCard
                image="https://s3.zerochan.net/Gotou.Hitori.240.3852289.jpg"
                title="Gizi"
              />
              <ArtikelCard
                image="https://s3.zerochan.net/Gotou.Hitori.240.3852289.jpg"
                title="Gizi"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignSelf: "center",
              }}
            >
              <ArtikelCard
                image="https://s3.zerochan.net/Gotou.Hitori.240.3852289.jpg"
                title="Gizi"
              />
              <ArtikelCard
                image="https://s3.zerochan.net/Gotou.Hitori.240.3852289.jpg"
                title="Gizi"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignSelf: "center",
              }}
            >
              <ArtikelCard
                image="https://s3.zerochan.net/Gotou.Hitori.240.3852289.jpg"
                title="Gizi"
              />
              <ArtikelCard
                image="https://s3.zerochan.net/Gotou.Hitori.240.3852289.jpg"
                title="Gizi"
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
