import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ArrowButton from "../../../component/Button/ArrowButton";
import PrimaryButton from "../../../component/Button/PrimaryButton";

export default function KlasifikasiDetail({ navigation }) {
  return (
    <View style={{ width: "90%", alignSelf: "center", flex: 1 }}>
      <View style={{ flex: 1, marginTop: "10%" }}>
        <ArrowButton title="Perkembangan Kongnitif" />
      </View>
      <View style={{ flex: 10, backgroundColor:'#E1F4FC' , borderRadius: 10}}>
        <Text style={{marginTop:'5%', fontFamily:'Poppins-Bold', fontSize:16, textAlign:'center', }}>
            PERAWATAN BAYI USIA
        </Text>
        <ScrollView style={{flex:1 }}>
        </ScrollView>
      </View>
      <View style={{flex:1, marginTop:'5%'}}>
        <PrimaryButton title='Selesai'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
