import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { getData, removeData } from "../../../utils/StorageData";
import IconButton from "../../../component/Button/IconButton";
import IconMenuButton from "../../../component/Button/IconMenuButton";
import TextButton from "../../../component/Button/TextButton";
import ArtikelCard from "../../../component/Card/ArtikelCard";
import LoadingIndicator from "../../../component/LoadingIndicator";
import ApiRequest from "../../../utils/ApiRequest";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);
  const [artikel, setArtikel] = useState(null);

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

        if (userData.user.role == 'petugas') {
          navigation.replace("HomePetugas");
          
        }
        const data = await ApiRequest("artikel/kategori");
        const artikel = await ApiRequest("artikel");

        setArtikel(artikel.artikel);
        setData(data.kategori);
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
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.logo}>KiddoCare</Text>
              </View>
              <View style={styles.menu}>
                <IconMenuButton
                  icon="search"
                  size={22}
                  onPress={() => {
                    navigation.navigate("Search", {artikel: artikel, kategori: data});
                  }}
                />
                <IconMenuButton
                  icon="bell-o"
                  size={22}
                  onPress={() => {
                    navigation.navigate("Notifikasi");
                  }}
                />
                <IconMenuButton
                  icon="user-circle-o"
                  size={22}
                  onPress={() => {
                    navigation.navigate("Profile");
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <View style={styles.top}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ArtikelDetail", { data: artikel[0] });
                  }}
                >
                  <ImageBackground
                    style={styles.imageTop}
                    source={{
                      uri:
                        "https://7e7e-140-213-122-220.ngrok-free.app/uploads/catalog/image/" +
                        artikel[0].cover,
                    }}
                    imageStyle={{ borderRadius: 20 }}
                  >
                    <Text style={styles.textImage}>{artikel[0].title}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <View style={styles.center}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins-Bold",
                      alignSelf: "center",
                      marginRight: 200,
                    }}
                  >
                    Edukasi
                  </Text>
                  <TextButton
                    title="Lainnya"
                    size={14}
                    onPress={() => {
                      navigation.navigate("Search");
                    }}
                  />
                </View>
                <View style={{ height: 35 }}>
                  <ScrollView
                    style={{ width: 350, height: 10 }}
                    horizontal={true}
                  >
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
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.artikel}>
            <FlatList
              data={artikel}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2} // Set the number of columns to 2
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
  },
  header: {
    flex: 1,
  },

  artikel: {
    alignSelf: "center",
    width: "90%",
    flex: 6,
  },

  center: {
    alignSelf: "center",
    marginTop: "5%",
  },

  body: {
    flex: 3,
    alignSelf: "center",
    width: "100%",
  },

  textImage: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    color: "white",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "20%",
  },

  imageTop: {
    borderWidth: 1,
    borderRadius: 10,
    width: 358,
    height: 139,
  },

  bodyContent: {
    alignSelf: "center",
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

  logo: {
    marginTop: "2%",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },

  menu: {
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-between",
  },
});
