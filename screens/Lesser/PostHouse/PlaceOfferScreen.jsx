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
              {item.icon}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const PlaceOfferScreen = ({ navigation, route }) => {
  const amenities = [
    {
      name: "pool",
      icon: <Icon name={"pool"} />,
      // icon: "pool",
    },

    {
      name: "Fire pit",
      icon: <Icon name={"campfire"} />,
    },
    {
      name: "Pool table",
      icon: <Icon name={"table-tennis"} />,
    },
    {
      name: "Indoor fireplace",
      icon: <Icon name={"fireplace"} />,
    },
    {
      name: "Out door dininig area",
      icon: <MaterialIcon name={"dinner-dining"} />,
    },
    {
      name: "Exercise equipment",
      icon: <MaterialIcon name={"run"} />,
    },
  ];
  const guestFav = [
    {
      name: "Wifi",
      icon: <Icon name={"wifi"} />,
    },
    {
      name: "Tv",
      icon: <FontAwsome name="tv" />,
    },
    {
      name: "Kitchen",
      icon: <MaterialIcon name={"kitchen"} />,
    },
    {
      name: "Wahser",
      icon: <Icon name={"washer"} />,
    },
    {
      name: "Free parking on premises",
      icon: <Icon name={"parking"} />,
    },
    {
      name: "Paid parking on premises",
      icon: <Icon name={"car-parking-lights"} />,
    },
    {
      name: "Air conditioning",
      icon: <Icon name={"air-conditioner"} />,
    },
    {
      name: "Dedicated workspace",
      icon: <Icon name={"facebook-workspace"} />,
    },
  ];
  const saftyItems = [
    {
      name: "Smoke alarm",
      icon: <Icon name={"smoke-detector-variant"} />,
    },
    {
      name: "First aid kit",
      icon: <FontAwsome5 name={"first-aid"} />,
    },

    { name: "Fire extinguisher", icon: "fire-extinguisher" },
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
        backgroundColor: "rgba(0,0,0,0.3)",
        marginTop: StatusBar.currentHeight,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#fff",
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
          Let us know what your place has to offer!
        </Text>
        {[
          { question: "Do you have any standout amenities?", arr: amenities },
          { question: "What about these guest favorites?", arr: guestFav },
          { question: "Have any of these saftey items ?", arr: saftyItems },
        ].map((item, index) => {
          return (
            <List
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
          <Text style={{ textAlign: "center", color: "#fff" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaceOfferScreen;
