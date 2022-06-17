import { View, Text, StatusBar, Image, Pressable } from "react-native";
import React, { useState } from "react";
import Icon from "@expo/vector-icons/Entypo";
const HomeDetailScreen = () => {
  const [isSaved, setIsSaved] = useState(false);
  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight,
        flex: 1,
        alignItems: "center",
      }}
    >
      <Text>Adaaran Club Rannalhi, Maldives, Water Bungalows</Text>
      <Pressable
        style={{
          position: "absolute",
          right: "15%",
          top: "8%",
          zIndex: 999,
        }}
        onPress={() => setIsSaved(!isSaved)}
      >
        <Icon
          name={isSaved ? "heart" : "heart-outlined"}
          size={30}
          color="red"
        />
      </Pressable>
      <Image
        style={{
          width: 300,
          height: 300,
          borderRadius: 5,
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
        resizeMode={"contain"}
        source={{ uri: "https://picsum.photos/300" }}
        // onLoadStart={() => Alert.alert("alert")}
        onLoadStart={() => console.log("loading started")}
        onLoad={() => console.log("loading end")}
        onProgress={() => {
          console.log("progress ....");
        }}
        onError={() => console.log("error")}
      />
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          top: "40%",
          elevation: 20,
          backgroundColor: "white",
          borderRadius: 5,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderColor: "black",
          borderStyle: "dotted",
          borderWidth: 1,
        }}
      >
        <Icon name="grid" size={20} />
        <Text>Show all photos</Text>
      </Pressable>
    </View>
  );
};

export default HomeDetailScreen;
