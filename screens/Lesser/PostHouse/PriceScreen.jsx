import { ScrollView, View, Text, Pressable, StatusBar } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
const PriceScreen = ({ navigation }) => {
  const [price, setPrice] = useState("1000");
  return (
    <View
      horizontal={false}
      style={{
        flex: 1,
        // backgroundColor: "#0099ff",
        backgroundColor: "rgba(0,0,0,0.3)",
        marginTop: StatusBar.currentHeight,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            marginTop: "20%",

            marginVertical: 20,
            textAlign: "center",
            color: "#000",
            fontSize: 20,
          }}
        >
          Now for the fun part--set Your price
        </Text>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Pressable
              style={{
                borderRadius: 50,
                backgroundColor: "rgba(0,0,0,0.3)",
                padding: 10,
              }}
              onPress={() => {
                if (price > 0) {
                  setPrice(String(+price - 1));
                } else {
                  setPrice(0);
                }
              }}
            >
              <Icon size={20} name="minus" />
            </Pressable>
            <TextInput
              value={price}
              style={{ fontSize: 20, textAlign: "center", width: "70%" }}
              keyboardType="numeric"
            />
            <Pressable
              style={{
                borderRadius: 50,
                backgroundColor: "rgba(0,0,0,0.3)",
                padding: 10,
              }}
              onPress={() => setPrice(String(+price + 1))}
            >
              <Icon name="plus" size={20} />
            </Pressable>
          </View>
          <Text style={{ textAlign: "center" }}> per month</Text>
        </View>
      </View>
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
        <Pressable
          onPress={() => {
            navigation.navigate("lesser/postjob/lastcheckout");
          }}
          style={{
            backgroundColor: "#0099ff",
            width: 100,
            right: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PriceScreen;
