import { View, Text, StatusBar, Pressable, FlatList } from "react-native";
import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SliderBox } from "react-native-image-slider-box";
import PostJobScreen from "../Employer/PostJob/PostJobScreen";
import PostHouseScreen from "./PostHouse/PostHouseScreen";

const LesserTopTabNavigator = createMaterialTopTabNavigator();
const LesserStackNavigator = createStackNavigator();

const MyPosts = (navigation) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  // require('./assets/images/girl.jpg'),          // Local image
  const list = Array(10);
  return (
    <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <FlatList
        style={{ marginTop: 20 }}
        data={list}
        renderItem={() => {
          return <Post />;
        }}
      ></FlatList>
    </View>
  );
};
const Setting = () => {
  return <Text>hello</Text>;
};

const Home = ({ navigation }) => {
  return (
    <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <View style={{ alignItems: "flex-end", backgroundColor: "#fff" }}>
        <Pressable
          onPress={() => {
            requestAnimationFrame(() => {
              navigation.navigate("lesser/posthouse");
            });
          }}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            backgroundColor: "green",
            marginHorizontal: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text style={{ color: "#fff" }}> Post House</Text>
        </Pressable>
      </View>
      <LesserTopTabNavigator.Navigator>
        <LesserTopTabNavigator.Screen
          options={{ title: "My Posts" }}
          name="lesser/myposts"
          component={MyPosts}
        />
        <LesserTopTabNavigator.Screen
          option={{ title: "setting" }}
          name="lesser/setting"
          component={Setting}
        />
      </LesserTopTabNavigator.Navigator>
    </View>
  );
};
const LesserScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <LesserStackNavigator.Navigator>
        <LesserStackNavigator.Screen
          options={{ headerShown: false }}
          name="lesser/"
          component={Home}
        />
        <LesserStackNavigator.Screen
          options={{ headerShown: false }}
          name="lesser/posthouse"
          component={PostHouseScreen}
        />
      </LesserStackNavigator.Navigator>
    </View>
  );
};

const images = [
  "https://source.unsplash.com/1024x768/?home",
  "https://source.unsplash.com/1024x768/?water",
  "https://source.unsplash.com/1024x768/?nature",
  "https://source.unsplash.com/1024x768/?tree", // Network image
];
const Post = () => {
  const [bgColor, setBgColor] = useState(false);
  return (
    <Pressable
      onPress={() => {
        setBgColor(true);
      }}
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
    </Pressable>
  );
};

export default LesserScreen;
