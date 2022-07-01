import { ScrollView, View, Text, Pressable, StatusBar } from "react-native";
import React, { useContext, useState } from "react";
import { Checkbox } from "react-native-paper";
import { PostHouseContext } from "./PostHouseScreen";
const LastCheckoutScreen = ({ navigation }) => {
  const { dispatch } = useContext(PostHouseContext);
  const [checked, setChecked] = React.useState([false, false, false]);
  const list = ["Security camera(s)", "Weapons", "Dangerous animals"];
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
          what the house contain
        </Text>
        <View style={{ marginTop: "10%" }}>
          <Text style={{ fontWeight: "700", fontSize: 20 }}>
            Do you have any of these at your place?
          </Text>
          {list.map((item, index) => {
            return (
              <View
                style={{
                  marginTop: "2%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 16 }}>{item}</Text>
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
          })}
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
            const newArray = checked.map((i, j) => {
              if (i) {
                return list[j];
              }
            });
            const newArr = checked
              .map((i, j) => {
                if (i) {
                  return list[j];
                }
              })
              .filter((i) => i);
            if (newArr.length) {
              dispatch({
                type: "add",
                payload: {
                  contain: newArr,
                },
              });
            }

            navigation.navigate("lesser/posthouse/reviewlisting");
          }}
          style={{
            backgroundColor: "#0244d0",
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

export default LastCheckoutScreen;
