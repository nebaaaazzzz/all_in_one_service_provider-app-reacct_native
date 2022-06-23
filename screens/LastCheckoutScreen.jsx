import { ScrollView, View, Text, Pressable, StatusBar } from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";
const PriceScreen = () => {
  const [checked, setChecked] = React.useState([false, false, false]);
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: "40%",
          backgroundColor: "#fff",
          flex: 1,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
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
          Now for the fun part--set Your price
        </Text>
        <View>
          <Text style={{ fontWeight: 700, fontSize: 20 }}>
            Do you have any of these at your place?
          </Text>
          {["Security camera(s)", "Weapons", "Dangerous animals"].map(
            (item) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{item}</Text>
                  <Checkbox
                    status={checked[index] ? "checked" : "unchecked"}
                    onPress={() => {
                      const copy = [...checked];
                      copy[index] = !copy[index];
                      setChecked(copy);
                    }}
                  />
                </View>
              );
            }
          )}
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
        <Pressable
          style={{
            backgroundColor: "rgba(0,0,0,0.9)",
            width: 100,
            right: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>
            Review your listing
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PriceScreen;
