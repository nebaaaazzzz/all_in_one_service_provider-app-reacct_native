import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { Divider } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import { PostJobContext } from "./PostJobScreen";
import { useTranslation } from "react-i18next";
const CategoryScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const categoryList = [
    t("accounting"),
    t("admin"),
    t("advert"),
    t("agri"),
    t("arch"),
    t("auto"),
    t("banking"),
    t("business"),
    t("busin"),
    t("comm"),
    t("commun"),
    t("consult"),
    t("creative"),
    t("customer"),

    t("development"),
    t("eco"),
    t("edu"),
    t("eng"),
    t("environment"),
    t("health"),
    t("hotel"),
    t("human"),
    t("info"),
    t("language"),
    t("legal"),
    t("logistic"),
    t("maintenance"),

    t("managment"),
    t("manu"),
    t("media"),
    t("natural"),
    t("pharma"),
    t("purchasing"),
    t("quality"),
    t("research"),
    t("retail"),
    t("sales"),

    t("science"),
    t("security"),
    t("social"),
    t("strategic"),
    t("tele"),
  ];
  const { dispatch } = useContext(PostJobContext);
  const dimension = useWindowDimensions();

  const [categorySelect, setCategorySelect] = useState("");

  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        <ProgressBar progress={0.25} />
        <ScrollView
          style={{
            marginTop: StatusBar.currentHeight,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "15%",
            }}
          >
            {t("set")}
          </Text>
          <Divider />
          <View style={{ alignItems: "center", marginTop: "20%" }}>
            <SelectDropdown
              rowStyle={{
                color: "rgba(0,0,0,0.2)",
              }}
              search={true}
              dropdownOverlayColor="transparent"
              buttonStyle={{
                borderWidth: 1,
                marginTop: "5%",
                borderColor: "#0244d0",
                width: "90%",
                borderRadius: 15,
              }}
              data={categoryList}
              onSelect={(selectedItem, index) => {
                setCategorySelect(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              defaultButtonText={t("catagori")}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
        </ScrollView>
      </Pressable>
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
          disabled={!categorySelect}
          onPress={() => {
            dispatch({
              type: "add",
              payload: {
                category: categorySelect,
              },
            });

            navigation.navigate("employer/postjob/skills");
          }}
          style={{
            width: "80%",
            borderRadius: 20,
            backgroundColor: categorySelect ? "#0244d0" : "#rgba(0,0,0,0.4)",
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: categorySelect ? "#fff" : "rgba(0,0,0,0.5)" }}>
            {t("next1")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryScreen;
