import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  Pressable,
  Keyboard,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { Divider } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import { PostJobContext } from "./PostJobScreen";
const CategoryScreen = ({ navigation, route }) => {
  const { dispatch } = useContext(PostJobContext);
  const dimension = useWindowDimensions();
  const category = [
    "Ecommerce Website Development",
    "Desktop Software Development",
    "Scriptiong & Automation",
    "Manual Testing",
    "Automation Testing",
    "Prototyping",
    "Mobile Design",
    "Web Desgin",
    "UX/UI Design",
    "MobileApp Development",
    "Mobile Game Developemnt",
    "Crypto Coins & Tokens",
    "Blockchain & NFT Development",
    "Blosckchain & NFT Developmment",
    "Blosckchain & NFT Developmment",
    "Crypto Wallet Developemtn",
    "Scrum Leadership",
    "Agile Leadership",
    "FIrmware Developemtn",
    "Emerging Tech AR/VR Developement",
    "CodingTutoring",
    "Database Development",
    "Back-end Development",
    "Font-End Development",
    "Full Stack Development",
    "CMS Development",
    "Video Game Development",
  ];
  const [categorySelect, setCategorySelect] = useState(
    route?.params?.category && ""
  );
  const [specificSelect, setSpecificSelect] = useState(
    route?.params?.specificCategory && ""
  );
  const [categoryIndex, setCategoryIndex] = useState(route?.params?.category);
  const [specificIndex, setSpecificIndex] = useState(
    route?.params?.specificCategory
  );
  useEffect(() => {
    if (route?.params?.category && route?.params?.specificCategory) {
      setCategoryIndex(
        category.findIndex((i, j) => {
          return i == route.params.category;
        })
      );
      setSpecificIndex(
        category.findIndex((i, j) => {
          return i == route.params.specificCategory;
        })
      );
    }
  }, []);
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
            Now Set Category
          </Text>
          <Divider />
          <View style={{ alignItems: "center", marginTop: "20%" }}>
            <SelectDropdown
              rowStyle={{
                color: "rgba(0,0,0,0.2)",
              }}
              dropdownOverlayColor="transparent"
              defaultValueByIndex={categoryIndex}
              buttonStyle={{
                borderWidth: 1,
                marginTop: "5%",
                borderColor: "#0244d0",
                width: "90%",
                borderRadius: 15,
              }}
              data={category}
              onSelect={(selectedItem, index) => {
                setCategorySelect(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              defaultButtonText="Select Category"
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <SelectDropdown
              rowStyle={{
                color: "#0244d0",
              }}
              defaultValueByIndex={specificIndex}
              dropdownOverlayColor="transparent"
              dropdownStyle={{}}
              buttonStyle={{
                borderWidth: 1,
                marginTop: "5%",
                borderColor: "#0244d0",
                width: "90%",
                borderRadius: 15,
              }}
              data={category}
              onSelect={(selectedItem, index) => {
                setSpecificSelect(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              defaultButtonText="Select specific"
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
          top: dimension.height - 100,
          alignItems: "center",
          justifyContent: "center",
          height: 90,
          width: "100%",
          borderTopWidth: 1,
          borderColor: "rgba(0,0,0,0.7)",
        }}
      >
        <Pressable
          disabled={!(categorySelect && specificSelect)}
          onPress={() => {
            dispatch({
              type: "add",
              payload: {
                category: categorySelect,
                specificCategory: specificSelect,
              },
            });
            if (route?.params?.category && route?.params?.specificCategory) {
              navigation.navigate("employer/postjob/review");
            } else {
              navigation.navigate("employer/postjob/skills");
            }
          }}
          style={{
            width: "80%",
            borderRadius: 20,
            backgroundColor:
              categorySelect && specificSelect ? "#0244d0" : "#rgba(0,0,0,0.4)",
            height: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 17 }}>Next: Skills</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CategoryScreen;
