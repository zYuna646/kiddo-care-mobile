import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { getData } from "../../utils/StorageData";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getData("user");

        if (userData == null) {
          navigation.replace("SingIn");
        }
        
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchData();
  }, [user]);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
