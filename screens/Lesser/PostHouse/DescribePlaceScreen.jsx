import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState, useContext } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { PostHouseContext } from "./PostHouseScreen";
const DescribePlaceScreen = ({ navigation, route }) => {
  //limit active
  const [limit, setLimit] = useState([]);
  const highLight = [
    {
      name: "Peaceful",
      icon: <Icon name="peace" />,
    },
    {
      name: "Unique",
      icon: <Entypo name="dot-single" />,
    },
    {
      name: "Family-friendly",
      icon: <Icon name="horse-human" />,
    },
    {
      name: "Stylish",
      icon: <MaterialIcons name="style" />,
    },
    { name: "Central", icon: <MaterialIcons name="center-focus-strong" /> },
    {
      name: "Spacious",
      icon: <Icon name="account-multiple-outline" />,
    },
  ];
  let titleList;
  if (route.params?.data) {
    titleList = highLight.map((item) => {
      return route.params.data.bestDescribe.includes(item.name) ? true : false;
    });
  }
  const [active, setActive] = useState(titleList || Array(6).fill(false));
  const { dispatch } = useContext(PostHouseContext);
  return (
    <View
      horizontal={false}
      style={{
        flex: 1,

        // backgroundColor: "#0099ff",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#fff",
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.02)",
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
          Is your place?
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
              <TouchableOpacity
                key={index + 1}
                disabled={limit.length > 2}
                style={{
                  width: 100,
                  borderWidth: 1,
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
                  if (limit.length < 2) {
                    setLimit([...limit, index]);
                  }
                }}
              >
                {item.icon}
                <Text style={{ textAlign: "center", color: "#000" }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
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
        <TouchableOpacity
          // disabled={!active}
          onPress={() => {
            const newArr = active
              .map((i, j) => {
                if (i) {
                  return highLight[j].name;
                }
              })
              .filter((i) => i);
            if (newArr.length) {
              dispatch({
                type: "add",
                payload: {
                  bestDescribe: newArr,
                },
              });
            }
            if (route.params?.data) {
              return navigation.navigate("lesser/posthouse/price", {
                data: route.params.data,
              });
            }
            navigation.navigate("lesser/posthouse/price");
          }}
          style={{
            backgroundColor: "#0244d0",
            width: 100,
            right: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DescribePlaceScreen;
