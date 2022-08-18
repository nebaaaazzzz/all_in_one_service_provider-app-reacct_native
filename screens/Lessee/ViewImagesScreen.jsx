import { View, Text, Image, ScrollView, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { BASEURI, BASETOKEN } from "../../urls";
import * as SecureStore from "expo-secure-store";

const ViewImagesScreen = ({ route }) => {
  let token;
  useEffect(() => {
    (async () => {
      token = await SecureStore.getItemAsync("token");
    })();
  });
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
                Authorization: `Bearer ${BASETOKEN || token}`,
              },
            }}
            style={{
              width: "100%",
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
