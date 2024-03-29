import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getData } from "../../../utils/StorageData";
import * as SplashScreen from "expo-splash-screen";
import IconMenuButton from "../../../component/Button/IconMenuButton";
import IconGraph from "../../../component/Graph/IconGraph";
import PrimaryButton from "../../../component/Button/PrimaryButton";
import LoadingIndicator from "../../../component/LoadingIndicator";
import ApiRequest from "../../../utils/ApiRequest";

export default function ProfileDetail({ navigation }) {
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [puskesmas, setPuskesmas] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getData("user");
        console.log(userData);
        if (userData.user.role == "user") {
          setUser(userData.user);
          setUserDetail(userData.masyarakat);

          const data = await ApiRequest("puskesmas/id", "POST", {
            id: userData.masyarakat.puskesmas_id,
          });

          setPuskesmas(data.puskesmas);
        } else {
          setUser(userData.user);
          console.log(userData);
          setUserDetail(userData.petugas);

          const data = await ApiRequest("puskesmas/id", "POST", {
            id: userData.petugas.puskesmas_id,
          });

          setPuskesmas(data.puskesmas);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, []);

  console.log(userDetail);

  return (
    <>
      {user && userDetail && puskesmas ? (
        <View style={styles.container}>
          <View style={styles.top}>
            <View style={styles.arrow}>
              <IconMenuButton
                icon="arrow-left"
                size={20}
                color="#53ABFC"
                onPress={() => {
                  navigation.navigate("Profile");
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
          </View>
          <View style={styles.middle}>
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
                    marginTop: "10%",
                    alignSelf: "center",
                    textAlign: "center",
                    fontFamily: "Poppins-Medium",
                    fontSize: 16,
                    color: "#343A40",
                  }}
                >
                  {user.username}
                </Text>
                <Text
                  style={{
                    alignSelf: "center",
                    textAlign: "center",
                    fontFamily: "Poppins-Medium",
                    color: "#AEB0B3",
                    fontSize: 14,
                  }}
                >
                  {user.email}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.ProfileDetail}>
              <View>
                <Text style={styles.detailHeader}>Jenis Kelamin</Text>
                <Text style={styles.detailBold}>
                  {userDetail.jenis_kelamin}
                </Text>
              </View>
              <View>
                <Text style={styles.detailHeader}>No. Telepon</Text>
                <Text style={styles.detailBold}>{user.phone}</Text>
              </View>
              <View>
                <Text style={styles.detailHeader}>NIK</Text>
                <Text style={styles.detailBold}>{userDetail.nik}</Text>
              </View>
              <View>
                <Text style={styles.detailHeader}>NKK</Text>
                <Text style={styles.detailBold}>{userDetail.nkk}</Text>
              </View>
              <View>
                <Text style={styles.detailHeader}>Puskesmas</Text>
                <Text style={styles.detailBold}>{puskesmas.name}</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                marginBottom: "10%",
              }}
            >
              <PrimaryButton
                title="Edit Profile"
                onPress={() => {
                  navigation.navigate("EditProfile");
                }}
              />
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
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },

  detailHeader: {
    marginTop: "2%",
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#717579",
  },

  detailBold: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#343A40",
  },

  ProfileDetail: {
    alignItems: "flex-start",
  },

  arrow: {
    alignSelf: "flex-start",
    flexDirection: "row",
  },

  top: { flex: 1, marginTop: "10%" },
  justifyContent: "center",
  middle: { flex: 6 },
  bottom: { flex: 12 },

  profile: {
    alignSelf: "center",
    marginTop: "5%",
  },

  iconProfile: {
    alignSelf: "center",
    width: 100,
    height: 100,
    backgroundColor: "#E6F7FF",
    borderRadius: 360,
    justifyContent: "center",
  },
});
