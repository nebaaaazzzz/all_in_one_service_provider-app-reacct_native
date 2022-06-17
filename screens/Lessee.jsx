import { View, Text, StatusBar, Pressable, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import Home from "../components/Home";
import FilterModal from "../components/FilterModal";
const Lessee = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = () => {};
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

      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View style={{ flexDirection: "row", marginTop: 4 }}>
        <Pressable
          android_ripple={{ color: "rgba(0,0,0,0.4)" }}
          onPress={() => requestAnimationFrame(() => showModal())}
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderRightColor: "black",
            paddingRight: 10,
            borderRightWidth: 1,
            borderColor: "blue",
            marginRight: 10,
          }}
        >
          <AntDesign name="filter" size={24} color="blue" />
          <Text style={{ color: "blue" }}>Filters</Text>
        </Pressable>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={list}
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  onPress={() => setIndex(index)}
                  style={{
                    marginHorizontal: 10,
                    borderBottomColor: "blue",
                    borderBottomWidth: indexS == index ? 2 : 0,
                  }}
                >
                  <AntDesign
                    name={item.name}
                    size={20}
                    color="blue"
                    style={{ textAlign: "center" }}
                  />
                  <Text style={{ color: "blue" }}>{item.title}</Text>
                </Pressable>
              );
            }}
          ></FlatList>
        </View>
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

export default Lessee;
