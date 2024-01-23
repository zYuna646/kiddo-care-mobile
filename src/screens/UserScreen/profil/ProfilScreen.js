import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import IconMenuButton from "../../../component/Button/IconMenuButton";
import IconGraph from "../../../component/Graph/IconGraph";
import { getData } from "../../../utils/StorageData";
import PrimaryButton from "../../../component/Button/PrimaryButton";
import * as SplashScreen from "expo-splash-screen";
import LogOutButton from "../../../component/Button/LogOutButton";
import LoadingIndicator from "../../../component/LoadingIndicator";
import ApiRequest from "../../../utils/ApiRequest";
import { storeData, removeData } from "../../../utils/StorageData";
import Toast from "react-native-toast-message";

export default function ProfilScreen({ navigation }) {

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getData("user");
        setUser(userData.user);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {user ? (
        <View style={styles.container}>
          <View style={styles.top}>
            <View style={styles.arrow}>
              <IconMenuButton
                icon="arrow-left"
                size={20}
                onPress={() => {
                  navigation.navigate("Home");
                }}
              />
              <Text
                style={{
                  color: "#343A40",
                  fontFamily: "Poppins-Medium",
                  textAlign: "center",
                  alignSelf: "center",
                  fontSize: 16,
                  marginTop: "1%",
                  marginLeft: "5%",
                }}
              >
                Profil Saya
              </Text>
            </View>
            <View style={styles.profile}>
              <View style={styles.iconProfile}>
                <IconGraph
                  icon="user"
                  size={50}
                  color="#9DD6FC"
                  styles={{ alignSelf: "center" }}
                />
              </View>
              <View style={styles.iconDetail}>
                <Text
                  style={{
                    fontFamily: "Poppins-Medium",
                    fontSize: 16,
                    color: "#343A40",
                  }}
                >
                  {user.username}
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins-Medium",
                    color: "#AEB0B3",
                    fontSize: 14,
                  }}
                >
                  {user.email}
                </Text>
                <View
                  style={{
                    height: 50,
                    width: 120,
                  }}
                >
                  <PrimaryButton
                    title="Lihat Profil"
                    fontSize={12}
                    onPress={() => {
                      navigation.navigate("ProfileDetail");
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.middle}>
            <View style={styles.info}>
              <IconMenuButton
                icon="info-circle"
                size={24}
                onPress={() => {
                  navigation.navigate("InfoAplikasi");
                }}
              />
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 16,
                  textAlign: "center",
                  marginLeft: "2%",
                  marginTop: "1%",
                }}
              >
                Tentang Aplikasi
              </Text>
              <View style={{ marginLeft: "45%" }}>
                <IconMenuButton
                  icon="chevron-right"
                  size={24}
                  onPress={() => {
                    navigation.navigate("InfoAplikasi");
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.bottom}>
            <LogOutButton
              title="Log Out"
              onPress={async () => {
                try {
                  const response = await ApiRequest(
                    "users/logout",
                    "DELETE",
                    null,
                    {
                      Authorization: user.token,
                    }
                  );

                  if (response != null) {
                    Toast.show({
                      type: "success",
                      text1: "Log Out",
                      text2: "Berhasil Keluar",
                    });

                    await removeData("user");

                    navigation.navigate("Home");
                  } else {
                    // Handle unexpected response status
                    console.error(
                      "Unexpected response status:",
                      response.status
                    );
                    Toast.show({
                      type: "error",
                      text1: "Log Out",
                      text2: "Gagal Keluar",
                    });
                  }
                } catch (error) {
                  // Log the complete error response for debugging purposes
                  console.error(
                    "Logout Error:",
                    error.response.data.errors.message
                  );

                  Toast.show({
                    type: "error",
                    text1: "Log Out",
                    text2: "Gagal Keluar",
                  });
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

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    flex: 1,
  },

  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "5%",
  },

  info: {
    flexDirection: "row",
  },

  middle: {
    marginTop: "15%",
  },

  profile: {
    flexDirection: "row",
    marginTop: "10%",
  },

  iconDetail: {
    marginLeft: "5%",
  },

  iconProfile: {
    width: 100,
    height: 100,
    backgroundColor: "#E6F7FF",
    borderRadius: 360,
    justifyContent: "center",
  },

  arrow: {
    alignSelf: "flex-start",
    flexDirection: "row",
  },

  top: {
    marginTop: "10%",
  },
});
