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
import { useTranslation } from "react-i18next";
const PlaceDescriptionScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const placeDescriptions = [
    {
      title: t("ho"),
      description: t("homm"),
    },

    {
      title: t("vil"),
      description:t("vill"),
    },
    {
      title: t("Apa"),
      description:t("Apaa"),
    },

    {
      title: t("Cota"),
      description: t("Cotaa"),
    },
    {
      title: t("Hut"),
      description:t("Hutt"),
    },

    {
      title: t("Tiny"),
      description:t("Tinyy"),
    },

    {
      title: t("Guest"),
      description:t("Guestt"),
    },
    {
      title: t("office"),
      description: t("officee"),
    },
  ];
  let index;
  if (route.params?.data) {
    index = placeDescriptions.findIndex(
      (item) => item.title === route.params.data?.placeDescription?.title
    );
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
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          // marginTop: "40%",
          backgroundColor: "#fff",
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.0.01)",

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
        {t("which")}
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
          <Text style={{ textAlign: "center", color: "#fff" }}>{t("next4")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaceDescriptionScreen;
