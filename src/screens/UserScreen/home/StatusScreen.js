import {
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import ArtikelCard from "../../../component/Card/ArtikelCard";
import StatusCard from "../../../component/Card/StatusCard";

export default function StatusScreen({navigation}) {
  const [selectedId, setselectedId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const data = [
    {
      id: 1,
      name: "Kristin",
      kelamin: "Laki-laki",
      nama_ibu: "Ibu",
      status: true,
      no_ktp: "02020202",
    },
    {
      id: 2,
      name: "ini",
      kelamin: "Perempuan",
      nama_ibu: "Ibu",
      status: false,
      no_ktp: "02020202",
    },
    {
      id: 3,
      name: "Kristin",
      kelamin: "Laki-laki",
      nama_ibu: "Ibu",
      status: true,
      no_ktp: "02020202",
    },
    {
      id: 4,
      name: "ini",
      kelamin: "Laki-laki",
      nama_ibu: "Ibu",
      status: false,
      no_ktp: "02020202",
    },
    {
      id: 5,
      name: "Kristin",
      kelamin: "Laki-laki",
      nama_ibu: "Ibu",
      status: true,
      no_ktp: "02020202",
    },
    {
      id: 6,
      name: "ini",
      kelamin: "Laki-laki",
      nama_ibu: "Ibu",
      status: false,
      no_ktp: "02020202",
    },
  ];

  const onRefresh = () => {
    // Your refresh logic here
    // For example, you might fetch new data from an API
    setRefreshing(true);

    // Simulating a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "100%",
          marginTop: "10%",
          alignSelf: "center",
        }}
      >
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={data}
          renderItem={({ item, index }) => (
            <StatusCard
              name={item.name}
              kelamin={item.kelamin}
              nama_ibu={item.nama_ibu}
              no_ktp={item.no_ktp}
              id={item.id}
              status={item.status}
              index={index}
              onPress={() => {navigation.navigate('StatusDetail', {data: item, index: index})}}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          extraData={selectedId}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flex: 1,
    width: "90%",
  
  },
});
