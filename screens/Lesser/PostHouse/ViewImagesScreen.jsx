import { View, Text, Image, ScrollView, StatusBar } from "react-native";
import React from "react";

const ViewImagesScreen = ({ route }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center" }}
      style={{ flex: 1, marginTop: StatusBar.currentHeight }}
    >
      {route.params.images.map((item, index) => {
        return (
          <Image
            key={index + 1}
            source={{ uri: item.uri }}
            style={{
              width: "100%",
              resizeMode: "stretch",
              marginVertical: 10,
              aspectRatio: 1,
            }}
          />
        );
      })}
    </ScrollView>
  );
};

export default ViewImagesScreen;
