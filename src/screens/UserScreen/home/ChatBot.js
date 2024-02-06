import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import ArrowButton from "../../../component/Button/ArrowButton";
import axios from 'axios';  // Import Axios
import IconMenuButton from "../../../component/Button/IconMenuButton";

export default function ChatBot({ navigation }) {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: 'hello world' },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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',
            'Openai-Organization': 'org-uiHZ1J3iyaPj3M9Otkvn6W14',
          },
        }
      );

      // Handle the completion response as needed
      console.log(response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <View style={{ flex: 1, alignSelf: "center", width: "90%" }}>
      <View style={{ flex: 1, marginTop: "10%" }}>
        <ArrowButton
          title="KiddoBot"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
      <View style={{ flex: 10 }}>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: "#00C2FF",
              borderRadius: 10,
              width: 310,
              alignSelf: "flex-end",
              padding: 10,
            }}
          >
            <Text>asdahdh</Text>
          </View>
          <View
            style={{
              backgroundColor: "#E1F4FF",
              borderRadius: 10,
              width: 310,
              alignSelf: "flex-start",
              padding: 10,
              marginTop: "5%",
            }}
          >
            <Text>asdahdh</Text>
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 2, marginBottom: "5%" }}>
        <View
          style={{
            width: "100%",
            height: "100%",
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "gray",
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 5 }}>
            <TextInput
              style={{ padding: 10, flex: 1 }}
              onChangeText={setMessage}
              value={message}
              placeholder="Tanya Kibot"
            />
          </View>
          <View style={{ flex: 1, alignSelf: "center" }}>
            <View style={{ marginTop: "50%" }}>
              <IconMenuButton
                icon="send"
                color="#00A3FF"
                size={25}
                onPress={handleSendMessage}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
