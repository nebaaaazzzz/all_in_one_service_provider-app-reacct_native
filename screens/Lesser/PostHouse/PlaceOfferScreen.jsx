import { ScrollView, View, Text, Pressable, StatusBar } from "react-native";
import React, { useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const List = ({ question, arr }) => {
  const [state, setState] = useState(Array(arr.length).fill(false));
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 18 }}> {question}</Text>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {arr.map((item, index) => {
          return (
            <Pressable
              onPress={() => {
                const a = state.map((item, i) => {
                  return i == index ? !item : item;
                });
                setState(a);
              }}
              style={{
                borderWidth: 1,
                borderColor: state[index]
                  ? "rgba(0,0,0,0.8)"
                  : "rgba(0,0,0,0.2)",
                marginVertical: 10,
                width: "40%",
                paddingVertical: 20,

                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text>{item.name}</Text>
              <Icon name={item.icon} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const PlaceOfferScreen = () => {
  const amenities = [
    {
      name: "pool",
      icon: "pool",
    },
    {
      name: "Hot tub",
      icon: "hot-tub",
    },
    {
      name: "patio",
      icon: "patio-heater",
    },
    {
      name: "BBQ grill",
      icon: "grill-outline",
    },
    {
      name: "Fire pit",
      icon: "campfire",
    },
    {
      name: "Pool table",
      icon: "table-tennis",
    },
    {
      name: "Indoor fireplace",
      icon: "fireplace",
    },
    {
      name: "Out door dininig area",
      icon: "dinner-dining", //materialIcon
    },
    {
      name: "Exercise equipment",
      icon: "run",
    },
  ];
  const guestFav = [
    {
      name: "Wifi",
      icon: "wifi",
    },
    {
      name: "Tv",
      icon: "yotube-tv",
    },
    {
      name: "Kitchen",
      icon: "kitchen", //material
    },
    {
      name: "Wahser",
      icon: "dishwasher",
    },
    {
      name: "Free parking on premises",
      icon: "parking",
    },
    {
      name: "Paid parking on premises",
      icon: "car-parking-lights",
    },
    {
      name: "Air conditioning",
      icon: "air-conditioner",
    },
    {
      name: "Dedicated workspace",
      icon: "facebook-workplace",
    },
    {
      name: "Outdoor shower",
      icon: "shower-head",
    },
  ];
  const saftyItems = [
    {
      name: "Smoke alarm",
      icon: "smoke-detector-variant",
    },
    {
      name: "First aid kit",
      icon: "first-aid", //fontawsome
    },
    {
      name: "Carbon monoxide alarm",
      icon: "smoke-detector",
    },
    { name: "Fire extinguisher", icon: "fire-extinguisher" },
  ];
  return (
    <View
      horizontal={false}
      style={{
        flex: 1,
        // backgroundColor: "#0099ff",
        backgroundColor: "rgba(0,0,0,0.3)",
        marginTop: StatusBar.currentHeight,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: "40%",
          backgroundColor: "#fff",
          flex: 1,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            marginVertical: 20,
            textAlign: "center",
            color: "#000",
            fontSize: 20,
          }}
        >
          Let us know what your place has to offer
        </Text>
        <List
          question={"Do you have any standout amenities?"}
          arr={amenities}
        />
        <List question={"What about these guest favorites?"} arr={guestFav} />
        <List question={"Have any of these saftey items ?"} arr={saftyItems} />
      </ScrollView>
      <View
        style={{
          backgroundColor: "#fff",
          borderTopWidth: 2,
          alignItems: "flex-end",
          height: 60,
          justifyContent: "center",
          borderColor: "rgba(0,0,0,0.3)",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#0099ff",
            width: 100,
            right: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PlaceOfferScreen;
