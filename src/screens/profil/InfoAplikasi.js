import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IconMenuButton from "../../component/Button/IconMenuButton";

export default function InfoAplikasi({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.arrow}>
          <IconMenuButton
            icon="arrow-left"
            size={20}
            color="white"
            onPress={() => {
              navigation.navigate("Profile");
            }}
          />
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins-Medium",
              textAlign: "center",
              alignSelf: "center",
              fontSize: 16,
              marginTop: "1%",
              marginLeft: "5%",
            }}
          >
            Tentang Aplikasi
          </Text>
        </View>
      </View>
      <View style={styles.middle}>
        <View style={styles.versi}>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              textAlign: "center",
            }}
          >
            Versi Aplikasi 2.32.2
          </Text>
        </View>
        <View style={styles.info}>
          <View style={{  flex: 2, width: "90%" }}>
            <Text style={{textAlign:'center', fontFamily:'Poppins-Bold', color:'gray', fontSize: 34, marginTop:'2%'}}>KiddoCare</Text>
            <Text style={{textAlign:'justify', fontFamily:'Poppins-Light', fontSize: 12}}>
              Aplikasi Kiddocare ini menyajikan pendekatan holistik dengan
              menggabungkan klasifikasi stunting berdasarkan pertumbuhan fisik,
              perkembangan kognitif dan motorik anak, serta pemantauan
              penyaluran bantuan kepada masyarakat. Dari segi penerapan
              teknologi digital, aplikasi ini melakukan pendekatan klasifikasi
              stunting yang berbeda dengan aplikasi yang saat ini digunakan oleh
              Puskesmas Tilango, yaitu E-PPGBM (Elektronik-Pencatatan dan
              Pelaporan Gizi Berbasis Masyarakat). Tak hanya mengidentifikasi
              dari segi pertumbuhan berdasarkan tinggi badan dan usia anak,
              tetapi aplikasi ini juga dapat melakukan klasifikasi lebih lanjut
              berdasarkan perkembangan kognitif dan motorik anak.
            </Text>
          </View>
          <View
            style={{  flex: 1, width: "90%" }}
          >
            <Text style={{textAlign:'center', fontFamily:'Poppins-Medium'}}>
                Sosial Media
            </Text>
            <View>
                
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00A3FF",
    height: "100%",
  },

  versi: {
    flex: 2,
    justifyContent: "center",
  },

  info: {
    alignItems: "center",
    flex: 3,
    backgroundColor: "white",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },

  middle: {
    flex: 1,
  },

  top: {
    width: "90%",
    alignSelf: "center",
    marginTop: "10%",
  },
  arrow: {
    alignSelf: "flex-start",
    flexDirection: "row",
  },
});
