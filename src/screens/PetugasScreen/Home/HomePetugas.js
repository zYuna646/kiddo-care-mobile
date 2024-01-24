import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import IconMenuButton from "../../../component/Button/IconMenuButton";
import { getData } from "../../../utils/StorageData";
import ApiRequest from "../../../utils/ApiRequest";
import LoadingIndicator from "../../../component/LoadingIndicator";
import PetugasCard from "../../../component/Card/PetugasCard";

export default function HomePetugas({ navigation }) {
  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);
  const [all, setAll] = useState(null);

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
        const data = await ApiRequest(
          "puskesmas/masyarakat",
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

        if (userData == null) {
          navigation.replace("SingIn");
        }

        setAll(users.user);
        setData(data.masyarakat);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchData();
  }, []);

  const getById = async (id) => {
    const data = await ApiRequest(
      "users/id",
      "POST",
      {
        user_id: id,
      },
      {
        Authorization: user.user.token,
      }
    );
    console.log(data.user);
    return data.user;
  };

  return (
    <>
      {user && data ? (
        <View
          style={{
            flex: 1,
            width: "100%",
            alignSelf: "center",
            backgroundColor: "#85B6FF",
          }}
        >
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.logo}>KiddoCare</Text>
              </View>
              <View style={styles.menu}>
                <IconMenuButton
                  icon="search"
                  size={22}
                  color="white"
                  onPress={() => {
                    // navigation.navigate("Search", {
                    //   artikel: artikel,
                    //   kategori: data,
                    // });
                  }}
                />
                <IconMenuButton
                  icon="bell-o"
                  color="white"
                  size={22}
                  onPress={() => {
                    navigation.navigate("Notifikasi");
                  }}
                />
                <IconMenuButton
                  icon="user-circle-o"
                  size={22}
                  color="white"
                  onPress={() => {
                    navigation.navigate("Profile");
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <View style={{ alignSelf: "center", marginTop: "5%" }}>
              {data.map((item) => {
                const user = all.find((user) => user.id === item.user_id);
                if (user) {
                  return (
                    <View key={item.id} style={{width:'100%'}}>
                      <PetugasCard name={user.username} nik={item.nik} />
                    </View>
                  );
                }
                return <></>;
              })}
            </View>
          </View>
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginTop: "2%",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "white",
  },

  menu: {
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
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

  body: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 6,
  },
});
