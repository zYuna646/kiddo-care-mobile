import React, { useState, useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import ArrowButton from "../../../component/Button/ArrowButton";
import * as Progress from "react-native-progress";

export default function StatusDetail({ navigation, route }) {
  const [data, setData] = useState(route.params.data);
  const [progressValue, setProgressValue] = useState(0.4);
  const progressRef = useRef(null);

  useEffect(() => {
    if (progressRef.current) {
      setTimeout(() => {
        setProgressValue(0.4);
      }, 100);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <ArrowButton
          title="Status Pengukuran"
          onPress={() => {
            navigation.navigate("Status");
          }}
        />
      </View>
      <View style={styles.body}>
        <Text
          style={{
            alignSelf: "center",
            color: "black",
            fontFamily: "Poppins-Bold",
            fontSize: 16,
          }}
        >
          Persentase Berpotensi Stunting
        </Text>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              width: "100%",
              height: 400,
              backgroundColor: "rgba(128, 128, 128, 0.5)",
              borderRadius: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View style={{ flexDirection: "row", marginTop: "5%" }}>
              <View style={{ flex: 1 }}>
                <Image
                  source={
                    data.kelamin === "Perempuan"
                      ? require("../../../../assets/img/StatusP.png")
                      : require("../../../../assets/img/StatusL.png")
                  }
                  resizeMode="cover"
                  style={{ height: 70, width: 70 }}
                />
              </View>

              <View style={{ flex: 3 }}>
                <Text style={styles.cardName}>{data.name}</Text>
                <Text style={styles.cardSecond}>{data.no_ktp}</Text>
                <Text style={styles.cardDetail}>
                  Anak Ke-{route.params.index + 1}
                </Text>
                <Text style={styles.cardDetail}>Kelamin : {data.kelamin}</Text>
                <Text style={styles.cardDetail}>
                  Nama Ibu : {data.nama_ibu}
                </Text>
              </View>
              <View
                style={{ flex: 1, alignItems: "center", marginRight: "2%" }}
              >
                <Image
                  source={
                    data.status
                      ? require("../../../../assets/img/StatusYes.png")
                      : require("../../../../assets/img/StatusNo.png")
                  }
                />
                <Text style={[styles.cardDetail, { textAlign: "center" }]}>
                  {data.status
                    ? "Sudah Mengukur Bulan Ini"
                    : "Belum Mengukur Bulan Ini"}
                </Text>
              </View>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Progress.Circle
                size={120}
                progress={progressValue}
                showsText={true}
                textStyle={{ color: "black", fontFamily: "Poppins-Bold" }}
                thickness={25}
                style={{ alignSelf: "center", marginTop: "10%" }}
                unfilledColor="#FF0000"
                indeterminate={false}
                borderColor="rgba(128, 128, 128, 0.5)"
                color="#99FF97"
                ref={progressRef}
              />
              <Text
                style={{
                  textAlign: "center",
                  alignSelf: "center",
                  fontFamily: "Poppins-Bold",
                  fontSize: 24,
                  marginTop: "5%",
                }}
              >
                Anak Berpotensi Stunting
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              marginTop: "5%",
              backgroundColor: "#E1F4FC",
              borderRadius: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                marginTop: "5%",
                fontFamily: "Poppins-Bold",
                fontSize: 16,
              }}
            >
              PERAWATAN BAYI USIA 3-6 BULAN
            </Text>
            <View
              style={{
                marginTop: "5%",
                flexDirection: "row",
                alignSelf: "flex-end",
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
            <View style={{marginTop:'5%', flexDirection:'row'}}>

            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },

  cardName: {
    fontFamily: "Poppins-Bold",
    color: "white",
    fontSize: 14,
  },

  cardSecond: {
    fontFamily: "Poppins-Bold",
    color: "black",
    fontSize: 12,
  },

  cardDetail: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#343A40",
  },

  body: {
    flex: 10,
  },

  top: {
    marginTop: "10%",
    flex: 1,
  },

  middle: {
    flex: 2,
    backgroundColor: "blue",
  },

  bottom: {
    flex: 2,
    backgroundColor: "purple",
  },
});
