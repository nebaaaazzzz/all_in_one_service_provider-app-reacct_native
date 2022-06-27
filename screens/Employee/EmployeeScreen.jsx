import { View, Text, StatusBar, Pressable, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import React, { useState } from "react";
import FilterModal from "../../components/FilterModal";
import { Divider } from "react-native-paper";
const Home = () => {
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

const EmployeeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = () => {};
  const [visible, setVisible] = React.useState(false);
  const [indexS, setIndex] = useState(0);
  const showModal = () => setVisible(true);
  // require('./assets/images/girl.jpg'),          // Local image
  const list = [
    "All",
    "Grapics & Design",
    "Sells & Markating",
    "Writing & Translation",
    "Video & Animation",
    "Finance & Accounting",
    "Engineering & Architecture",
    "Admin & Customer support",
    "Music & Audio",
    "Programming & Tech",
    "Business",
    "LifeStyle",
    "Legal",
  ];
  return (
    <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <FilterModal visible={visible} setVisible={setVisible} />

      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={list}
          style={{ paddingTop: 10 }}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={() => setIndex(index)}
                style={{
                  marginHorizontal: 10,
                  borderBottomColor: "#3498db",
                  borderBottomWidth: indexS == index ? 2 : 0,
                }}
              >
                <Text style={{ color: "#3498db" }}>{item}</Text>
              </Pressable>
            );
          }}
        ></FlatList>
      </View>
      <FlatList
        style={{ marginTop: 20 }}
        data={list}
        renderItem={() => {
          return <Home />;
        }}
      ></FlatList>
    </View>
  );
};

export default EmployeeScreen;
