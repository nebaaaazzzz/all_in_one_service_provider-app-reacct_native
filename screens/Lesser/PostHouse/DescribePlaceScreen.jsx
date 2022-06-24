import { ScrollView, View, Text, Pressable, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
const DescribePlaceScreen = () => {
  const [active, setActive] = useState(Array(6).fill(false));
  const max = [-1, -1];
  const highLight = [
    {
      name: "Peaceful",
      icon: "peace",
    },
    {
      name: "Unique",
      icon: "lighthouse",
    },
    {
      name: "Family-friendky",
      icon: "horse-human",
    },
    {
      name: "Stylish",
      icon: "House-sidining",
    },
    { name: "Central", icon: "location" },
    {
      name: "Spacious",
      icon: "account-multiple-outline",
    },
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
          Now, Let's describe your place
        </Text>
        <Text style={{ marginLeft: 10, fontSize: 16 }}>
          Choose up to 2 highLights
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            paddingLeft: 20,
          }}
        >
          {highLight.map((item, index) => {
            return (
              <Pressable
                style={{
                  width: 100,
                  borderWidth: 1,
                  borderColor: active[index]
                    ? "rgba(0,0,0,0.7)"
                    : "rgba(0,0,0,0.2)",
                  margin: 10,
                  right: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: 150,
                  height: 50,
                  borderRadius: 5,
                }}
                onPress={() => {
                  setActive(
                    active.map((bool, j) => {
                      return j == index ? !bool : bool;
                    })
                  );
                }}
              >
                <Icon name={item.icon} size={18} />
                <Text style={{ textAlign: "center", color: "#000" }}>
                  {item.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
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
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DescribePlaceScreen;
