import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import ArrowButton from "../../../component/Button/ArrowButton";
import IconButton from "../../../component/Button/IconButton";
import IconMenuButton from "../../../component/Button/IconMenuButton";
import ArtikelCard from "../../../component/Card/ArtikelCard";
import ApiRequest from "../../../utils/ApiRequest";
import { getData } from "../../../utils/StorageData";
import LoadingIndicator from "../../../component/LoadingIndicator";

export default function SearchScreen({ navigation, route }) {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [artikel, setArtikel] = useState(null);
  const [filter, setfilter] = useState(null);
  const [coverArtikel, setCover] = useState(null);
  const [selectedIndex, setSelected] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [cari, setcari] = useState("");

  const onRefresh = () => {
    // Your refresh logic here
    // For example, you might fetch new data from an API
    setRefreshing(true);

    // Simulating a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getData("user");
        console.log(userData);
        if (userData == null) {
          navigation.replace("SingIn");
        }

        if (userData.user.role == "petugas") {
          navigation.replace("HomePetugas");
        }
        const data = await ApiRequest("artikel/kategori");
        const artikel = await ApiRequest("artikel");

        setArtikel(artikel.artikel);
        setData(data.kategori);
        setfilter(artikel);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {data && artikel ? (
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
                {data.map((item, index) => (
                  <TouchableOpacity
                    key={item.id}
                    style={{ marginRight: 5, marginLeft: 5 }}
                    onPress={() => {
                      setSelected(index);
                      hasil = artikel.filter(
                        (item_artikel) => item_artikel.kategori_id == item.id
                      );
                      setfilter(hasil);
                    }}
                  >
                    <View
                      style={{
                        height: 34,
                        backgroundColor:
                          selectedIndex === index ? "#5FCFFF" : "white",
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
                        {item.name}
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
                alignSelf: "center",
              }}
            >
              <TextInput
                placeholder="Cari Artikel ..."
                value={cari}
                onChangeText={(text) => {
                  const hasil = artikel.filter(
                    (item_artikel) => item_artikel.title.includes(text)
                  );
                  setfilter(hasil);
                  setcari(text)
                }}
                
                style={{
                  width: "95%",
                  alignSelf: "center",
                  borderWidth: 1,
                  borderRadius: 5,
                  margin: 8,
                  padding: 2,
                  paddingLeft: 5,
                }}
              />
            </View>
            <View style={{ flex: 1, marginTop: "2%" }}>
              {artikel != null || artikel != [] ? (
                <FlatList
                  data={filter}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={2} // Set the number of columns to 2
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  renderItem={({ item }) => {
                    return (
                      <ArtikelCard
                        onPress={() => {
                          navigation.navigate("ArtikelDetail", { data: item });
                        }}
                        image={
                          "https://7e7e-140-213-122-220.ngrok-free.app/uploads/catalog/image/" +
                          item.cover
                        }
                        title={item.title}
                      />
                    );
                  }}
                />
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
