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
    "Accounting and Finance",
    "Admin, Secretarial and Clerk",
    "Advetising and Media",
    "Agriculture and Farming",
    "Architecture and Construction",
    "Automotive",
    "Banking and Insurance",
    "Business Development",
    "Bussiness and Administration",
    "communication, PR and Jornalism",
    "Community Service Jobs",
    "Consultancy and Training",
    "Creative Arts Jobs",
    "Customer Service",
    "Development adn Project Management",
    "Economics and Finance",
    "Education",
    "Engineering",
    "Environment and Natural Resources",
    "Healthcare",
    "Hotel and Hospitality Jobs",
    "Human Resources and Recruitment",
    "Information Technology",
    "Languages",
    "Legal",
    "Logistics, Transportation and Supply",
    "Maintenance and Repair",
    "Managment and Industrial",
    "Manufacturing",
    "Media and Journalism",
    "Natural Sciences Jobs",
    "Pharmaceutical",
    "Purchasing and Procurement",
    "Qualtity Assurance",
    "Research and Development",
    "Retail, Wholesale and Distribution",
    "Sales and Marketing",
    "Science and Technology",
    "Security and Protection",
    "Social Sciences and Communication",
    "Strategic Planning",
    "Telecommunications",
  ];

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
            Now Set Category
          </Text>
          <Divider />
          <View style={{ alignItems: "center", marginTop: "20%" }}>
            <SelectDropdown
              rowStyle={{
                color: "rgba(0,0,0,0.2)",
              }}
              dropdownOverlayColor="transparent"
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
        </ScrollView>
      </Pressable>
      <View
        style={{
          position: "absolute",
          top: dimension.height - 80,
          alignItems: "center",
          justifyContent: "center",
          height: 60,
          width: "100%",
          borderTopWidth: 1,
          borderColor: "rgba(0,0,0,0.7)",
        }}
      >
        <Pressable
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
            Next: Skills
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CategoryScreen;
