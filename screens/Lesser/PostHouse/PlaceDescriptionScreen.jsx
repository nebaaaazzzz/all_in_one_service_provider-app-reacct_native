import { ScrollView, View, Text, Pressable, StatusBar } from "react-native";
import React, { useContext, useState } from "react";
import PlaceDescription from "../../../components/PlaceDescription";
import { PostHouseContext } from "./PostHouseScreen";
const PlaceDescriptionScreen = ({ navigation }) => {
  const { dispatch, housePost } = useContext(PostHouseContext);
  const [active, setActive] = useState("");
  console.log(housePost);
  const placeDescriptions = [
    {
      title: "Home",
      description: "A home that may stand-alone or have shared walls",
    },
    {
      title: "Cabin",
      description:
        "A house made with natural materials like wood and built in a natural setting",
    },
    {
      title: "Villa",
      description:
        "A luxury home that may have indoor-outdoor spaces, gardens , and pools",
    },
    {
      title: "Townhouse",
      description:
        "A multi-level row or terrace house that shares walls and possibly outdoor spaces.",
    },
    {
      title: "Cottage",
      description: "A cozy house built in a rural area or near a lake or beach",
    },
    {
      title: "Bungalow",
      description:
        "A single-level house with a wide fron porch and sloping roof.",
    },
    {
      title: "Earthen home",
      description:
        "A home buil in the ground or made from materials like rammed earth",
    },
    {
      title: "Houseboat",
      description:
        "A floating home constructed form similar materials as a land-based home.",
    },
    {
      title: "Hut",
      description:
        "A home made of wood or mud that may have a thatched staw roof",
    },
    {
      title: "Farm stay",
      description:
        "A rurla stay where guests may spend time in an agricultural setting or with animals",
    },
    {
      title: "Dome",
      description:
        "A home with a domed roof or spherical shape ,such as a bubble home",
    },
    {
      title: "Cycladic home",
      description:
        "Awhitewashed house with a flat roof in the Greek Cycladic islands",
    },
    {
      title: "Chalet",
      description:
        "A wooden house with a sloped roof popular for skiing or summer stays.",
    },
    {
      title: "Dammuso",
      description: "A stone house with domed roof on the island of Pantelleria",
    },
    {
      title: "Lighthouse",
      description:
        "A touwer near water with a bright leight used at any point to help huide ships.",
    },
    {
      title: "Shepherd's hut",
      description:
        "A tiny wagon on wheels originally used to follow sheep herds.",
    },
    {
      title: "Tiny home",
      description:
        "A stand-alone house that's usually less than 400 square feet.",
    },
    {
      title: "Trullo",
      description:
        "A round, stone house with a cone-shaoed roof originating in Italy.",
    },
    {
      title: "Casa particular",
      description:
        "A private room in a Cuban home that feels like a bed and breakfast.",
    },
    {
      title: "Pension",
      description:
        "A house with a barbeque and communal space in the countryside of Korea.",
    },
    {
      title: "Vacation home",
      description:
        "A furnished rental propery that includes a kitchen and bathroom and may offer some guest services,like a reception desk.",
    },
  ];
  const pressHandler = (id) => {
    if (id == active) {
      return setActive("");
    }
    setActive(id);
  };
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
          // marginTop: "40%",
          backgroundColor: "#fff",
          flex: 1,
          // borderTopLeftRadius: 15,
          // borderTopRightRadius: 15,
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
          What of these best describes your place ?
        </Text>
        {placeDescriptions.map((place, index) => {
          return (
            <PlaceDescription
              active={active}
              pressHandler={pressHandler}
              id={index}
              title={place.title}
              description={place.description}
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
        <Pressable
          disabled={!active}
          onPress={() => {
            dispatch({
              type: "add",
              payload: {
                placedescription: placeDescriptions[+active - 1],
              },
            });
            navigation.navigate("lesser/posthouse/spacekind");
          }}
          style={{
            backgroundColor: active ? "#0244d0" : "rgba(0,0,0,0.2)",
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

export default PlaceDescriptionScreen;
