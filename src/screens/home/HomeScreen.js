import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { getData } from "../../utils/StorageData";
import IconButton from "../../component/Button/IconButton";
import IconMenuButton from "../../component/Button/IconMenuButton";

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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.logo}>KiddoCare</Text>
          </View>
          <View style={styles.menu}>
            <IconMenuButton icon='bell-o' size={25}/>
            <IconMenuButton icon='user-circle-o' size={25}/>
            <IconMenuButton icon='bell-o' size={25}/>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100,
  },

  headerContent: {
    justifyContent:'space-between',
    flexDirection:'row',
    marginTop: '10%',
    alignSelf:'center',
    width: '90%',
    alignItems:'center',
  },

  logo: {
    marginTop: '2%',
    fontSize:  18,
    fontFamily: 'Poppins-Bold',
  },

  menu : {
    flexDirection:'row',
    width: '30%',
    justifyContent:"space-between"
  }
});
