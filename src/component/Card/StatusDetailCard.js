import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RadioGroup } from "react-native-radio-buttons-group";

export default function StatusDetailCard({
  nomor,
  question,
  radioButton,
  selected,
  setSelected,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.number}>
        <Text style={{ fontFamily: "Poppins-Light" }}>1.</Text>
      </View>
      <View style={styles.question}>
        <Text style={{ fontFamily: "Poppins-Light" }}>
          Bayi Bisa Terlentang dengan sangat santuy
        </Text>
      </View>
      <View style={styles.radio}>
        <RadioGroup
          radioButtons={radioButton}
          onPress={setSelected}
          selectedId={selected}
          layout="row"
          
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Add this to arrange child components horizontally
    alignSelf: "center",
    width: "100%",
    marginTop: "5%",
    marginTop: "2%",
  },

  number: {
    flex: 1,
  },

  question: {
    flex: 7,
  },

  radio: {
    alignSelf:'center',
    flex: 3,
  },
});
