import { View, Text, Image, ScrollView, StatusBar } from "react-native";
import React from "react";
import { BASEURI, BASETOKEN } from "../../urls";
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
            source={{
              uri: `${BASEURI}/house/image/${item}`,
              headers: {
                Authorization: `Bearer ${BASETOKEN}`,
              },
            }}
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
