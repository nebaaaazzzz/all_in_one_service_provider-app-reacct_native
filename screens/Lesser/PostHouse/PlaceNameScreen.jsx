import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native-paper";
import { PostHouseContext } from "./PostHouseScreen";
import { useTranslation } from "react-i18next";
const PlaceNameScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { dispatch } = useContext(PostHouseContext);
  let title;
  if (route.params?.data) {
    title = route.params.data.placeTitle;
  }
  const [text, setText] = useState(title || "");
  return (
    <View
      horizontal={false}
      style={{
        flex: 1,
        // backgroundColor: "#0099ff",
        backgroundColor: "rgba(0,0,0,0.06)",
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
          {t("name")}
        </Text>
        <TextInput
          onChangeText={setText}
          maxLength={50}
          multiline
          value={text}
          numberOfLines={10}
          placeholder={t("cheer")}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{t("minn")}</Text>
          <Text style={{ textAlign: "right" }}>{text.length}/50</Text>
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
          disabled={text.length < 5}
          onPress={() => {
            dispatch({
              type: "add",
              payload: {
                placeTitle: text,
              },
            });
            if (route.params?.data) {
              return navigation.navigate(
                "lesser/posthouse/detailplacedescription",
                {
                  data: route.params.data,
                }
              );
            }
            navigation.navigate("lesser/posthouse/detailplacedescription");
          }}
          style={{
            backgroundColor: text.length > 5 ? "#0244d0" : "rgba(0,0,0,0.7)",
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

export default PlaceNameScreen;
