import { StyleSheet, Text, TextInput, View } from "react-native";
import React, {useState} from "react";
import TextButton from "../../component/Button/TextButton";
import * as SMS from 'expo-sms';

export default function VerifikasiOTPScreen({navigation, route}) {

  const [data, setData] = useState(route.params.data);

  const checkSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      // do your SMS stuff here
    } else {
      // misfortune... there's no SMS available on this device
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Verifikasi (OTP)</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.Text}>
            Masukan 4 digit kode verifikasi (OTP) yang dikirimkan melalui nomor
          </Text>
          <Text
            style={{
              marginTop: "5%",
              fontSize: 14,
              fontFamily: "Poppins-Medium",
              textAlign: "center",
              color: "#343A40",
            }}
          >
            08539829
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: "20%",
              justifyContent: "space-between",
              alignSelf:'center',
              width: '90%'
            }}
          >
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              maxLength={1}
            />
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              maxLength={1}
            />

            <TextInput
              keyboardType="numeric"
              style={styles.input}
              maxLength={1}
            />

            <TextInput
              keyboardType="numeric"
              style={styles.input}
              maxLength={1}
            />
          </View>
          <View style={{marginTop:'5%', alignItems:'center'}}>
            <Text style={{color:'#9B9898', fontSize:10, fontFamily:'Poppins-Medium'}}>
                Kirim ulang 60 detik
            </Text>
            <TextButton title="Verifikasi dengan email"/>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 60,
    fontSize: 60,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    borderBottomWidth: 3
  },
  header: {
    width: "100%",
    height: 132,
    backgroundColor: "#00A3FF",
    justifyContent: "center",
  },

  body: {
    width: "100%",
    height: "100%",
  },

  Text: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#B0A3A3",
  },

  bodyContent: {
    marginTop: "5%",
    width: "80%",
    alignSelf: "center",
  },

  headerContent: {
    marginTop: "10%",
    marginLeft: "5%",
  },

  headerText: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#F5F5F5",
  },
});
