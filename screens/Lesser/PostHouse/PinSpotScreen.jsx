import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { PostHouseContext } from "./PostHouseScreen";

import { MAPBOXTOKEN, MAPBOXURI } from "../../../urls";
import { useTranslation } from "react-i18next";

const PinSpotScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dimen = useWindowDimensions();
  let cntr;
  if (route.params?.center) {
    cntr = route.params.center;
  } else {
    cntr = route.params?.data?.location?.coordinates;
  }
  const [isLoaded, setIsLoaded] = useState(false);
  const [center, setCenter] = useState(cntr || [11, 21]);
  const [region, setRegion] = useState("");
  const [placeName, setPlaceName] = useState("");
  const { dispatch } = useContext(PostHouseContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async function () {
      const result =
        await fetch(`${MAPBOXURI}/geocode/reverse?lat=${cntr[1]}&lon=${cntr[0]}&format=json&apiKey=${MAPBOXTOKEN}
    `);
      setIsLoading(false);
      const data = await result.json();
      setRegion(data.results[0].state);
      setPlaceName(data.results[0].formatted);
    })();
  }, []);
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.02)",
      }}
    >
      <View style={{ flex: 1 }}>
        <Image
          style={{ flex: 1 }}
          source={{
            uri: `${MAPBOXURI}/staticmap?style=osm-carto&width=${600}&height=${400}&center=lonlat:${
              cntr[0]
            },${cntr[1]}&zoom=14&marker=lonlat:${cntr[0]},${
              cntr[1]
            };color:%23ff0000;size:medium&apiKey=${MAPBOXTOKEN}`,
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          borderTopWidth: 2,
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
          flexDirection: "row",
          wdith: dimen.width,
          justifyContent: "flex-end",
          borderColor: "rgba(0,0,0,0.3)",
        }}
      >
        {route.params?.data ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#0244d0",
              width: 100,
              marginHorizontal: 10,
              marginRight: "25%",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
            onPress={() => {
              navigation.navigate("lesser/posthouse/location", {
                data: route.params?.data,
              });
            }}
          >
            <Text style={{ color: "#fff" }}>{t("goto")}</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}

        <TouchableOpacity
          onPress={async () => {
            if (route.params?.data) {
              return navigation.navigate("lesser/posthouse/placeoffer", {
                data: route.params.data,
                center: center,
                placeName,
                region,
              });
            }
            dispatch({
              type: "add",
              payload: {
                center: center,
                placeName,
                region,
              },
            });
            navigation.navigate("lesser/posthouse/placeoffer");
          }}
          style={{
            backgroundColor: "#0244d0",
            width: 100,
            marginHorizontal: 10,
            marginLeft: "10%",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>
            {t("next4")}{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PinSpotScreen;
