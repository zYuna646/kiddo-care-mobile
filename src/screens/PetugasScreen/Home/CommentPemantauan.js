import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import ArrowButton from "../../../component/Button/ArrowButton";
import PrimaryButton from "../../../component/Button/PrimaryButton";
import IconMenuButton from "../../../component/Button/IconMenuButton";
import { getData } from "../../../utils/StorageData";
import ApiRequest from "../../../utils/ApiRequest";
import LoadingIndicator from "../../../component/LoadingIndicator";

export default function CommentPemantauan({ navigation, route }) {
  const anak = route.params.data;
  const log_item = route.params.log;
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [description, setDescription] = useState("");
  const [data, setData] = useState(null);
  const [tolak, setolak] = useState(tolak);
  const [perubahan, setperubahan] = useState("");
  const [user, setuser] = useState(null);

  const fetchData = async () => {
    try {
      const userData = await getData("user");

      const data = await ApiRequest(
        "anak/log",
        "POST",
        {
          anak_id: anak.id,
        },
        {
          Authorization: userData.user.token,
        }
      );
      hasil = data.log;
      filterlog = hasil.filter((item) => item.anak_id == anak.id);
      log = filterlog.filter((item) => item.id == log_item.id);
      console.log(log);
      setSelectedVideo(
        "https://d8fc-114-125-202-151.ngrok-free.app/uploads/catalog/image/" +
          log[0].video
      );
      setDescription(log[0].isi);
      setData(log[0]);
      setuser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pickVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedVideo(result.uri);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async () => {
    try {
      const userData = await getData("user");
      // Create FormData object
      const formData = new FormData();
      formData.append("video", {
        uri: selectedVideo,
        type: "video/mp4",
        name: "video.mp4",
      });
      formData.append("description", description);
      formData.append("log_id", log_item.id);

      // Replace 'YOUR_UPLOAD_URL' with your actual server endpoint
      const response = await axios.post(
        "https://d8fc-114-125-202-151.ngrok-free.app/api/anak/update/log",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: userData.user.token,
          },
        }
      );

      // Handle the response as needed
      console.log("Upload response:", response.data);

      // Reset the state after successful upload
      setSelectedVideo(null);
      setDescription("");
      navigation.navigate("PemantauanDetail", { data: anak });
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <>
      {data != null ? (
        <View style={{ flex: 1, alignSelf: "center", width: "90%" }}>
          <View style={{ flex: 1, marginTop: "10%" }}>
            <ArrowButton
              title="PemantauanBantuan"
              onPress={() => {
                navigation.navigate("PemantauanDetail", { data: anak });
              }}
            />
          </View>
          <View style={{ flex: 10, padding: 10 }}>
            <View
              style={{ flex: 1, backgroundColor: "#E1F4FC", borderRadius: 10 }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Bold",
                  alignSelf: "center",
                  fontSize: 15,
                  marginTop: "5%",
                }}
              >
                {route.params.date}
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: "5%",
                  padding: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  height: 200,
                  margin: 20,
                }}
              >
                {selectedVideo ? (
                  <Video
                    source={{ uri: selectedVideo }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={{ flex: 1 }}
                  />
                ) : (
                  <>
                    <View style={{ marginTop: "20%" }}>
                      <IconMenuButton
                        icon="file-video-o"
                        onPress={pickVideo}
                        size={50}
                      />
                      <Text
                        style={{
                          alignSelf: "center",
                          fontFamily: "Poppins-Bold",
                          fontSize: 14,
                        }}
                      >
                        Unggah Video
                      </Text>
                    </View>
                  </>
                )}
              </TouchableOpacity>
              <View
                style={{
                  marginTop: "1%",
                  padding: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  height: 150,
                  margin: 20,
                }}
              >
                <TextInput
                  multiline
                  textAlignVertical="top" // Align text to the top
                  style={{
                    flex: 1,
                    textAlign: "left", // Align text to the left
                    fontSize: 16,
                  }}
                  placeholder="Deskripsi Wajib Diisi"
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                />
              </View>
              {tolak ? (
                <View
                  style={{
                    marginTop: "1%",
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    height: 150,
                    margin: 20,
                  }}
                >
                  <TextInput
                    multiline
                    textAlignVertical="top" // Align text to the top
                    style={{
                      flex: 1,
                      textAlign: "left", // Align text to the left
                      fontSize: 16,
                    }}
                    placeholder="Deskripsi Wajib Diisi"
                    value={perubahan}
                    onChangeText={(text) => setperubahan(text)}
                  />
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {tolak ? (
              <View style={{ flex: 1 }}>
                <PrimaryButton
                  title="Kirim"
                  onPress={async () => {
                    const data = await ApiRequest(
                      "anak/log/update",
                      "POST",
                      {
                        log_id: log_item.id,
                        status: "tolak",
                        comment: perubahan,
                      },
                      {
                        Authorization: user.user.token,
                      }
                    );
                    navigation.navigate("PemantauanDetail", { data: anak });
                  }}
                  
                  
                  disabled={!perubahan}
                />
              </View>
            ) : (
              <View
                style={{ flex: 1, flexDirection: "row", alignSelf: "center" }}
              >
                <View style={{ flex: 1, padding: 10 }}>
                  <PrimaryButton
                    title="Tolak"
                    color="#FFB800"
                    onPress={() => {
                      setolak(true);
                    }}
                    disabled={log_item.status !== "proses"}
                  />
                </View>
                <View style={{ flex: 1, padding: 10 }}>
                  <PrimaryButton
                    title="Setujui"
                    onPress={async () => {
                      const data = await ApiRequest(
                        "anak/log/update",
                        "POST",
                        {
                          log_id: log_item.id,
                          status: "setuju",
                          comment: "0",
                        },
                        {
                          Authorization: user.user.token,
                        }
                        
                      );
                      navigation.navigate("PemantauanDetail", { data: anak });
                    }}
                    disabled={log_item.status !== "proses"}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}
