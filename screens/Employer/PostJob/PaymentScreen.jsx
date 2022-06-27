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
const PaymentScreen = () => {
  const dimension = useWindowDimensions();
  const [active, setActive] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          marginTop: StatusBar.currentHeight,
          flex: 1,
        }}
      >
        <ProgressBar progress={1} />
        <Text style={{ fontSize: 22, textAlign: "center", fontWeight: "bold" }}>
          Tell us about your buget
        </Text>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            alignSelf: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text>From</Text>

            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <TextInput style={{ width: "60%" }} />
              <Text>/hour</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text>To</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput style={{ width: "60%" }} />
              <Text>/hour</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: "20%" }}></View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          top: dimension.height - 90,
          alignItems: "center",
          justifyContent: "center",
          height: 90,
          width: "100%",
          borderTopWidth: 1,
          borderColor: "rgba(0,0,0,0.7)",
        }}
      >
        <Pressable
          style={{
            alignSelf: "flex-start",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        >
          <Text style={{ color: "blue" }}>
            Not ready to set an hourly rate?
          </Text>
        </Pressable>
        <Pressable
          disabled={active}
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

export default PaymentScreen;
