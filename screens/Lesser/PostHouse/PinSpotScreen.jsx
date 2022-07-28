import { View, Text, Pressable, StatusBar } from "react-native";
import React, { useContext, useState } from "react";
import MapView, { Marker } from "react-native-maps";

import { PostHouseContext } from "./PostHouseScreen";

import { MAPBOXTOKEN, MAPBOXURI } from "../../../urls";

const PinSpotScreen = ({ navigation, route }) => {
  let cntr;

  if (route.params?.center) {
    cntr = route.params.center;
  } else {
    cntr = route.params?.data?.location?.coordinates;
  }
  const [center, setCenter] = useState(cntr || [11, 21]);
  const { dispatch } = useContext(PostHouseContext);
  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.02)",
      }}
    >
      <Text
        style={{
          color: "rgba(0,0,0,0.6)",
          fontSize: 18,
          textAlign: "center",
          margin: "5%",
        }}
      >
        Is this the correct location, in the read marker? you can drag and
        change locations!
      </Text>
      <MapView
        style={{
          flex: 1,
        }}
        region={{
          latitude: center[1],
          longitude: center[0],
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
        initialRegion={{
          latitude: center[1],
          longitude: center[0],
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
      >
        <Marker
          onDragEnd={({ nativeEvent: { coordinate } }) => {
            setCenter([coordinate.longitude, coordinate.latitude]);
          }}
          flat
          draggable
          coordinate={{ latitude: center[1], longitude: center[0] }}
        />
      </MapView>
      <View
        style={{
          backgroundColor: "#fff",
          borderTopWidth: 2,
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
          flexDirection: "row",
          justifyContent: "center",
          borderColor: "rgba(0,0,0,0.3)",
        }}
      >
        {route.params?.data?.center || (
          <Pressable
            onPress={() => {
              navigation.navigate("lesser/posthouse/location", {
                data: route.params?.data,
              });
            }}
          >
            <Text>Go to Map</Text>
          </Pressable>
        )}

        <Pressable
          onPress={async () => {
            const response = await fetch(
              `${MAPBOXURI}/mapbox.places/${center[0]},${center[1]}.json?access_token=${MAPBOXTOKEN}`
            );
            const r = await response.json();
            if (r?.features[0]?.place_name && r.features[0].center) {
              if (r.features[0].place_type[0] === "locality") {
                const region = r.features[0].context.filter((i, j) => {
                  return i.id.startsWith("region");
                });
                dispatch({
                  type: "add",
                  payload: {
                    center: r.features[0].center,
                    ...(region[0].text && { region: region[0].text }),
                    placeName: r.features[0].place_name,
                  },
                });
              } else {
                dispatch({
                  type: "add",
                  payload: {
                    center: r.features[0].center,
                    placeName: r?.features[0]?.place_name,
                  },
                });
              }
              if (route.params?.data) {
                return navigation.navigate("lesser/posthouse/placeoffer", {
                  data: route.params.data,
                });
              }
              navigation.navigate("lesser/posthouse/placeoffer");
            }
          }}
          style={{
            backgroundColor: "#0244d0",
            width: 100,
            marginLeft: "10%",
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

export default PinSpotScreen;
