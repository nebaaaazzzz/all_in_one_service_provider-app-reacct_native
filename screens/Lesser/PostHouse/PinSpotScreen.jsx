import { View, Text, Pressable, StatusBar } from "react-native";
import React, { useContext, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { PostHouseContext } from "./PostHouseScreen";
const PinSpotScreen = ({ navigation, route }) => {
  const [center, setCenter] = useState(route.params.center || [11, 21]);
  const [placeName, setPlaceName] = useState(route?.params?.placeName || "");
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
          alignItems: "flex-end",
          height: 60,
          justifyContent: "center",
          borderColor: "rgba(0,0,0,0.3)",
        }}
      >
        <Pressable
          onPress={() => {
            fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${center[0]},${center[1]}.json?access_token=pk.eyJ1IjoibmViYWFhYXp6enoiLCJhIjoiY2w0bHB0bWVkMHJibDNmbzFpenA5dmRkbyJ9.jSio18EC3_YJ0EcxYsFx-w`
            )
              .then(async (res) => {
                const r = await res.json();
                setPlaceName(r?.features[0]?.place_name);
                if (center) {
                  navigation.navigate("lesser/posthouse/guestsize");
                  dispatch({
                    type: "add",
                    payload: {
                      center,
                      placeName,
                    },
                  });
                }
              })
              .catch((err) => {
                throw err;
              });
          }}
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

export default PinSpotScreen;
