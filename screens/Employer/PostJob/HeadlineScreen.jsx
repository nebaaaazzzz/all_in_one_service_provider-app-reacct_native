import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { TextInput, ProgressBar, MD3Colors } from "react-native-paper";
import Icon from "@expo/vector-icons/Entypo";
import { PostJobContext } from "./PostJobScreen";
import {useTranslation} from "react-i18next";
const HeadlineScreen = ({ navigation }) => {
  const {t}=useTranslation();
  const { dispatch } = useContext(PostJobContext);
  const [headline, setHeadline] = useState("");
  const dimension = useWindowDimensions();
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (headline.length > 3) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [headline]);
  return (
    <View style={{ marginTop: StatusBar.currentHeight }}>
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <ProgressBar progress={0} />
        <Text style={{ fontSize: 22, textAlign: "center", fontWeight: "bold" }}>
        {t("lets")}
        </Text>
        <TextInput
          style={{
            marginVertical: "10%",
            width: "90%",
            alignSelf: "center",
          }}
          placeholder={t("writeheadline")}
          onChangeText={setHeadline}
        />
        <View>
          <Text style={{ fontSize: 18, margin: 10, fontWeight: "bold" }}>
          {t("example")}
          </Text>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Icon name="dot-single" size={20} />
            <Text>
            {t("example1")}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Icon name="dot-single" size={20} />
            <Text>
            {t("example2")}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Icon name="dot-single" size={20} />
            <Text>{t("example3")}</Text>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            top: dimension.height - dimension.height / 5.5,
            alignItems: "center",
            justifyContent: "center",
            height: 60,
            width: "100%",
            borderTopWidth: 1,
            borderColor: "rgba(0,0,0,0.7)",
          }}
        >
          <TouchableOpacity
            disabled={!active}
            onPress={() => {
              dispatch({ type: "add", payload: { title: headline } });
              navigation.navigate("employer/postjob/category");
            }}
            style={{
              width: "80%",
              borderRadius: 20,
              backgroundColor: active ? "#0244d0" : "rgba(0,0,0,0.3)",
              height: "70%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: active ? "#fff" : "rgba(0,0,0,0.5)" }}>
            {t("next")}
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </View>
  );
};

export default HeadlineScreen;
