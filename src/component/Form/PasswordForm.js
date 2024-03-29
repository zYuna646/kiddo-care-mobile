import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, {useState} from "react";

export default function PasswordForm({ title, onChangeText, value, icon, visible }) {

  const [isPasswordVisible, setIsPasswordVisible] = useState(visible);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.labelForm}>{title}</Text>
        <View style={styles.form}>
          <FontAwesome name={icon} size={20} style={styles.icon} />
          <TextInput
            placeholder={`Masukkan ${title}`}
            style={styles.inputForm}
            onChangeText={onChangeText}
            secureTextEntry={!isPasswordVisible}
            value={value}
          />
           <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
            <FontAwesome name={isPasswordVisible ? 'eye' : 'eye-slash'} size={20} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  inputContainer: {},

  iconContainer: {},

  form: {
    marginTop: 10,
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },

  labelForm: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#343A40",
  },

  inputForm: {
    margin: 10,
    width: "80%",
    fontSize: 14,
    color: "#343A40",
  },

  icon: {
    marginLeft: 10,
    color: "#AEB0B3",
  },

  eyeIcon: {
    marginRight: 10,
    color: "#AEB0B3",
  }
});
