import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { getData, removeData } from "../../../utils/StorageData";
import IconButton from "../../../component/Button/IconButton";
import IconMenuButton from "../../../component/Button/IconMenuButton";
import TextButton from "../../../component/Button/TextButton";
import ArtikelCard from "../../../component/Card/ArtikelCard";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getData("user");

        if (userData == null) {
          navigation.replace("SingIn");
        }

        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchData();
  }, [user]);

  const data = [
    { id: "1", text: "Item 1asdasidjioasodjias" },
    { id: "2", text: "Item 2saoijdisja" },
    { id: "3", text: "Item 3" },
  ];

  return (
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
                navigation.navigate("Search");
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
            <TouchableOpacity>
              <ImageBackground
                style={styles.imageTop}
                source={{
                  uri: "https://s3.zerochan.net/Gotou.Hitori.240.3852289.jpg",
                }}
                imageStyle={{ borderRadius: 20 }}
              >
                <Text style={styles.textImage}>
                  Cegah Stunting Dengan Makanan Sehat Dengan
                </Text>
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
        </View>
      </View>
      <View style={styles.artikel}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{ flexDirection: "row", marginTop: 10, alignSelf: "center" }}
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
            style={{ flexDirection: "row", marginTop: 10, alignSelf: "center" }}
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
            style={{ flexDirection: "row", marginTop: 10, alignSelf: "center" }}
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
