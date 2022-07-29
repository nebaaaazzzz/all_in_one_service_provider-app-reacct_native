import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import PlaceDescription from "../../../components/PlaceDescription";
import { PostHouseContext } from "./PostHouseScreen";
const PlaceDescriptionScreen = ({ navigation, route }) => {
  const placeDescriptions = [
    {
      title: "Home",
      description: "A home that may stand-alone or have shared walls",
    },

    {
      title: "Villa",
      description:
        "A luxury home that may have indoor-outdoor spaces, gardens , and pools",
    },
    {
      title: "Apartment",
      description:
        "A room or set of rooms fitted especially with housekeeping facilities and usually leased as a dwelling",
    },

    {
      title: "Cottage",
      description: "A cozy house built in a rural area or near a lake or beach",
    },
    {
      title: "Hut",
      description:
        "A home made of wood or mud that may have a thatched staw roof",
    },

    {
      title: "Tiny home",
      description:
        "A stand-alone house that's usually less than 400 square feet.",
    },

    {
      title: "Guest house",
      description:
        "A furnished rental propery that may includes a kitchen and bathroom and may offer some guest services,like a reception desk.",
    },
    {
      title: "Office space",
      description: "Suitable for a business and work related activity.",
    },
  ];
  let index;
  if (route.params?.data) {
    console.log(route.params.data.placeDescription.title);
    index = placeDescriptions.findIndex(
      (item) => item.title === route.params.data?.placeDescription?.title
    );
    console.log(index);
  }
  const { dispatch } = useContext(PostHouseContext);
  const [active, setActive] = useState(index);
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
              key={index + 1}
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
        <TouchableOpacity
          disabled={!active}
          onPress={() => {
            dispatch({
              type: "add",
              payload: {
                placeDescription: placeDescriptions[+active - 1],
              },
            });
            if (route.params?.data) {
              return navigation.navigate("lesser/posthouse/spacekind", {
                data: route.params.data,
              });
            }
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
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaceDescriptionScreen;
