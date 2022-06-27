import { View, Text, StatusBar, Pressable, FlatList } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import FilterModal from "../../components/FilterModal";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Divider } from "react-native-paper";
const Tab = createMaterialTopTabNavigator();
const Try = () => {
  const [bgColor, setBgColor] = useState(false);
  return (
    <>
      <Pressable
        onPressIn={() => setBgColor(true)}
        onPressOut={() => setBgColor(false)}
        style={{
          padding: 15,
          backgroundColor: bgColor ? "rgba(0,0,0,0.05)" : "transparent",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          AI ML cunsultant for a financial start-up
        </Text>
        <Text
          style={{ marginVertical: 10, fontSize: 12, color: "rgba(0,0,0,0.6)" }}
        >
          Hourly - Posted 1 hour ago
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View>
            <Text style={{ fontWeight: "bold" }}>Less than 30 hrs/week</Text>
            <Text style={{ color: "rgba(0,0,0,0.6)" }}>Hours needed</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Expert</Text>
            <Text style={{ color: "rgba(0,0,0,0.6)" }}> Experience level</Text>
          </View>
        </View>
        <Text
          ellipsizeMode="tail"
          numberOfLines={3}
          style={{ fontSize: 15, marginTop: 10 }}
        >
          Hello there, I am Vick, Me and my small team is working on a Fintech
          start-up in the consumer finance space (USA). We are an early-stage
          start-up working remotely, We just finished our MVP and preparing to
          automate a few things through simple and complex ML algorithms for our
          BETA. We have a clear goal and view about how our product should be.
        </Text>
        <Text style={{ color: "rgba(0,0,0,0.6)" }}>3,869 kilometers away</Text>
      </Pressable>
      <Divider />
    </>
  );
};
const MyPosts = () => {
  const [visible, setVisible] = React.useState(false);
  const [indexS, setIndex] = useState(0);
  const showModal = () => setVisible(true);
  // require('./assets/images/girl.jpg'),          // Local image
  const list = [
    {
      title: "All Homes",
      name: "home",
    },
    {
      title: "Islands",
      name: "team",
    },
    {
      title: "Arctic",
      name: "setting",
    },
    {
      title: "Amazing pools",
      name: "picture",
    },
    {
      title: "surfing",
      name: "inbox",
    },
    {
      title: "Bed & Breakfast",
      name: "cloudo",
    },
    {
      title: "Design",
      name: "camera",
    },
    { title: "National parks", name: "phone" },
    {
      title: "shared homes",
      name: "smileo",
    },
    {
      title: "caves",
      name: "piechart",
    },
    { title: "tropical", name: "dingding" },
    {
      title: "Amazing view",
      name: "windowso",
    },
    {
      title: "Earth Home",
      name: "phone",
    },
  ];
  return (
    <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <FilterModal visible={visible} setVisible={setVisible} />

      <FlatList
        data={list}
        renderItem={() => {
          return <Try />;
        }}
      ></FlatList>
    </View>
  );
};
function SettingsScreen() {
  return <Text>hello</Text>;
}
function EmployerScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="myposts" component={MyPosts} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default EmployerScreen;
