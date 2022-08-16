import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState, useContext } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import FontAwsome from "@expo/vector-icons/FontAwesome";
import FontAwsome5 from "@expo/vector-icons/FontAwesome5";
import { PostHouseContext } from "./PostHouseScreen";
import { useTranslation } from "react-i18next";

const List = ({ question, arr, state, setState }) => {
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
            <TouchableOpacity
              onPress={() => {
                const a = state.map((item, i) => {
                  return i == index ? !item : item;
                });
                setState(a);
              }}
              style={{
                borderWidth: 1,
                borderColor: state[index] ? "#0244d0" : "rgba(0,0,0,0.2)",
                marginVertical: 10,
                width: "40%",
                paddingVertical: 20,

                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text>{item.icon}</Text>
              <Text>{item.name}</Text>
              {/*  */}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const PlaceOfferScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const amenities = [
    {
      name: t("pool"),
      icon: <Icon color={"#0244d0"} name={"pool"} />,
      // icon: "pool",
    },

    {
      name: t("fire"),
      icon: <Icon color={"#0244d0"} name={"campfire"} />,
    },
    {
      name: t("table"),
      icon: <Icon color={"#0244d0"} name={"table-tennis"} />,
    },
    {
      name: t("Indoor"),
      icon: <Icon color={"#0244d0"} name={"fireplace"} />,
    },
    {
      name: t("out"),
      icon: <MaterialIcon color={"#0244d0"} name={"dinner-dining"} />,
    },
    {
      name: t("exercise"),
      icon: <MaterialIcon color={"#0244d0"} name="sports-cricket" size={24} />,
    },
  ];
  const guestFav = [
    {
      name: t("Wifi"),
      icon: <Icon color={"#0244d0"} name={"wifi"} />,
    },
    {
      name: t("Tv"),
      icon: <FontAwsome color={"#0244d0"} name="tv" />,
    },
    {
      name: t("kitchen"),
      icon: <MaterialIcon color={"#0244d0"} name={"kitchen"} />,
    },
    {
      name: t("Wash"),
      icon: <Icon color={"#0244d0"} name={"dishwasher"} />,
    },
    {
      name: t("Free"),
      icon: <Icon color={"#0244d0"} name={"parking"} />,
    },
    {
      name: t("paid"),
      icon: <Icon color={"#0244d0"} name={"car-parking-lights"} />,
    },
    {
      name: t("Air"),
      icon: <Icon color={"#0244d0"} name={"air-conditioner"} />,
    },
    {
      name: t("Dedicated"),
      icon: <MaterialIcon color={"#0244d0"} name={"workspaces-filled"} />,
    },
  ];
  const saftyItems = [
    {
      name: t("Smoke"),
      icon: <Icon color={"#0244d0"} name={"smoke-detector-variant"} />,
    },
    {
      name: t("First"),
      icon: <FontAwsome5 color={"#0244d0"} name={"first-aid"} />,
    },

    {
      name: t("extinguisher"),
      icon: <Icon color={"#0244d0"} name="fire-extinguisher" />,
    },
  ];
  let amenIndex, guefavIndex, saftyIndex;
  if (route.params?.data) {
    amenIndex = route.params.data.amenities.map((item) => {
      return amenities.some((i) => {
        return i.name == item;
      });
    });
    guefavIndex = route.params.data.guestFavourite.map((item) => {
      return guestFav.some((i) => {
        return i.name == item;
      });
    });
    saftyIndex = route.params.data.saftyItems.map((item) => {
      return saftyItems.some((i) => {
        return i.name == item;
      });
    });
  }
  const [amenitiesL, setAmenitiesL] = useState(
    amenIndex || Array(amenities.length).fill(false)
  );
  const [favL, setFavL] = useState(
    guefavIndex || Array(guestFav.length).fill(false)
  );
  const [saftyItemsL, setSaftyItemL] = useState(
    saftyIndex || Array(saftyItems.length).fill(false)
  );
  const list = [
    [amenitiesL, favL, saftyItemsL],
    [setAmenitiesL, setFavL, setSaftyItemL],
  ];
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
          flex: 1,
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
          {t("letus")}
        </Text>
        {[
          { question: t("standout"), arr: amenities },
          { question: t("fav"), arr: guestFav },
          { question: t("have"), arr: saftyItems },
        ].map((item, index) => {
          return (
            <List
              key={index + 1}
              question={item.question}
              arr={item.arr}
              state={list[0][index]}
              setState={list[1][index]}
            />
          );
        })}
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
          onPress={() => {
            function squash(arr, list) {
              return arr
                .map((i, j) => {
                  if (i) {
                    return list[j].name;
                  }
                })
                .filter((i) => i);
            }
            const newAmenities = squash(amenitiesL, amenities);
            const newFav = squash(favL, guestFav);
            const newSafty = squash(saftyItemsL, saftyItems);
            dispatch({
              type: "add",
              payload: {
                amenities: newAmenities,
                guestFav: newFav,
                saftyItems: newSafty,
              },
            });
            if (route.params?.data) {
              return navigation.navigate("lesser/posthouse/houseimages", {
                data: route.params.data,
              });
            }
            navigation.navigate("lesser/posthouse/houseimages");
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

export default PlaceOfferScreen;
