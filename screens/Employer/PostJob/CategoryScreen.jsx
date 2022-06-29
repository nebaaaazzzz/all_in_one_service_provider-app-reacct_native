import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { RadioButton, Divider, TextInput } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import SelectDropdown from "react-native-select-dropdown";
const CategoryScreen = ({ navigation }) => {
  const countries = ["Egypt", "Canada", "Australia", "Ireland"];
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
  const [active, setActive] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          marginTop: StatusBar.currentHeight,
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 22, textAlign: "center", fontWeight: "bold" }}>
          Now Set Category
        </Text>
        <Divider />
        <View>
          <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          top: dimension.height - 150,
          alignItems: "center",
          justifyContent: "center",
          height: 90,
          width: "100%",
          borderTopWidth: 1,
          borderColor: "rgba(0,0,0,0.7)",
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("employer/postjob/skills");
          }}
          style={{
            width: "80%",
            borderRadius: 20,
            backgroundColor: "blue",
            height: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>Next: Skills</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CategoryScreen;
