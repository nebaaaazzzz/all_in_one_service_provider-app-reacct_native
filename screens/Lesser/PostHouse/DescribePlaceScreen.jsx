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
import { useTranslation } from "react-i18next";
const DescribePlaceScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  //limit active
  const [limit, setLimit] = useState([]);
  const highLight = [
    {
      name: t("peace"),
      icon: <Icon color={"#0244d0"} name="peace" />,
    },
    {
      name: t("Uni"),
      icon: <Entypo color={"#0244d0"} name="dot-single" />,
    },
    {
      name: t("fam"),
      icon: <Icon color={"#0244d0"} name="horse-human" />,
    },
    {
      name: t("sty"),
      icon: <MaterialIcons color={"#0244d0"} name="style" />,
    },
    {
      name: t("cent"),
      icon: <MaterialIcons color={"#0244d0"} name="center-focus-strong" />,
    },
    {
      name: t("Spa"),
      icon: <Icon color={"#0244d0"} name="account-multiple-outline" />,
    },
  ];
  let titleList;
  if (route.params?.data) {
    titleList = highLight.map((item) => {
      return route.params.data.bestDescribe.includes(item.name) ? true : false;
    });
  }
  const [active, setActive] = useState(titleList || Array(6).fill(false));
  const { dispatch, housePost } = useContext(PostHouseContext);
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
          {t("is")}
        </Text>
        <Text style={{ marginLeft: 10, fontSize: 16 }}>{t("chosee")}</Text>
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
                style={{
                  width: 100,
                  borderWidth: 1,
                  margin: 10,
                  right: 20,
                  borderColor: active[index] ? "#0244d0" : "rgba(0,0,0,0.2)",

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
          <Text style={{ textAlign: "center", color: "#fff" }}>
            {t("next4")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DescribePlaceScreen;
