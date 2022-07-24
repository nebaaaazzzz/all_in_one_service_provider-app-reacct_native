import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { languageList } from "../../constants/data";
import { RadioButton } from "react-native-paper";
const AddLanguage = ({ setOpenModal, addLanguage, languages }) => {
  const [checked, setChecked] = useState("");
  const [language, setLanguage] = useState();
  const [isSelected, setIsSelected] = useState(false);
  return (
    <View>
      <View
        style={{
          marginTop: "10%",
          paddingHorizontal: "5%",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 20 }}>Add Language</Text>
        <SelectDropdown
          search={true}
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
          data={languageList}
          onSelect={(selectedItem, index) => {
            setIsSelected(true);
            setLanguage(selectedItem.language);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem.language;
          }}
          defaultButtonText="Select Langugage"
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item.language;
          }}
        />
        {isSelected ? (
          <View style={{ marginVertical: "5%" }}>
            {["Beginner", "Conversational", "Fluent", "Native"].map(
              (item, index) => {
                return (
                  <Pressable
                    style={{ flexDirection: "row", alignItems: "center" }}
                    key={index + 1}
                    onPress={() => setChecked(item)}
                  >
                    <RadioButton
                      color="#0244d0"
                      onPress={() => setChecked(item)}
                      value={item}
                      status={checked === item ? "checked" : "unchecked"}
                    />
                    <Text>{item}</Text>
                  </Pressable>
                );
              }
            )}
          </View>
        ) : (
          <></>
        )}
      </View>
      <View
        style={{
          marginVertical: "10%",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Pressable
          style={{
            alignSelf: "center",
            elevation: 5,
            backgroundColor: "red",
            paddingHorizontal: "15%",
            paddingVertical: "2%",
            borderRadius: 5,
          }}
          onPress={() => {
            setOpenModal(false);
          }}
        >
          <Text style={{ color: "#fff" }}>Close</Text>
        </Pressable>
        <Pressable
          disabled={!(language && checked)}
          style={{
            alignSelf: "center",
            elevation: 5,
            backgroundColor: language && checked ? "#0244d0" : "#ccc",
            paddingHorizontal: "15%",
            paddingVertical: "2%",
            borderRadius: 5,
          }}
          onPress={() => {
            addLanguage([...languages, { language, level: checked }]);
            setOpenModal(false);
          }}
        >
          <Text style={{ color: "#fff" }}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddLanguage;
