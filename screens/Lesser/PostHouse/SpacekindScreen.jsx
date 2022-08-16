import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import PlaceDescription from "./../../../components/PlaceDescription";
import { PostHouseContext } from "./PostHouseScreen";
import { useTranslation } from "react-i18next";

const SpacekindScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { dispatch } = useContext(PostHouseContext);
  const placeKinds = [t("entire"), t("private")];
  let index;
  if (route.params?.data) {
    index = placeKinds.findIndex(
      (item) => item == route.params.data?.placeKind
    );
  }
  const [active, setActive] = useState(index > 0 ? index : undefined);
  const pressHandler = (id) => {
    setActive(id);
  };
  return (
    <View
      horizontal={false}
      style={{
        flex: 1,
        // backgroundColor: "#0099ff",
        backgroundColor: "rgba(0,0,0,0.05)",
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
          {t("space")}
        </Text>
        {placeKinds.map((place, index) => {
          return (
            <PlaceDescription
              pressHandler={pressHandler}
              active={active}
              id={index}
              key={index + 1}
              title={place}
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
                placeKind: placeKinds[+active - 1],
              },
            });
            if (route.params?.data) {
              return navigation.navigate("lesser/posthouse/pinspot", {
                data: route.params.data,
              });
            } else {
              navigation.navigate("lesser/posthouse/location");
            }
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
          <Text style={{ textAlign: "center", color: "#fff" }}>
            {t("next4")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SpacekindScreen;
