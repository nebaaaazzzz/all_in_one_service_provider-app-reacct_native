import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

import { SliderBox } from "react-native-image-slider-box";
const images = [
  "https://source.unsplash.com/1024x768/?home",
  "https://source.unsplash.com/1024x768/?water",
  "https://source.unsplash.com/1024x768/?nature",
  "https://source.unsplash.com/1024x768/?tree", // Network image
];
const Home = () => {
  const [bgColor, setBgColor] = useState(false);
  return (
    <TouchableOpacity
      onPressIn={() => setBgColor(true)}
      onPressOut={() => setBgColor(false)}
      style={{
        paddingVertical: 15,
        backgroundColor: bgColor ? "rgba(0,0,0,0.05)" : "transparent",
      }}
    >
      <SliderBox
        images={images}
        disableOnPress
        circleLoop
        ImageComponentStyle={{ borderRadius: 10, width: "95%" }}
      />
      <View style={{ marginHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>MV, Maldives</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text>4.6</Text>
            <AntDesign color="blue" name="star" />
          </View>
        </View>
        <Text style={{ color: "rgba(0,0,0,0.6)" }}>3,869 kilometers away</Text>
        <Text style={{ color: "rgba(0,0,0,0.6)" }}>$616 month</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Home;
