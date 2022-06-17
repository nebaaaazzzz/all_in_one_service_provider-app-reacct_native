import { View, Text, StatusBar, Pressable } from "react-native";
import React from "react";
import styled from "styled-components/native";
import Icon from "@expo/vector-icons/FontAwesome5";

const SPressable = styled(Pressable).attrs({
  android_ripple: {
    color: "#3498db",
    borderless: false,
  },
})`
  border-radius: 10px;
  border: 1px solid #3498db;
  width: 40%;
  margin: 10px 10px;
  padding: 20px 20px;
`;
const SText = styled(Text)`
  text-align: center;
  font-size: 20px;
  margin-top: 10px;
`;
const HomeScreen = () => {
  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight,
        justifyContent: "center",
        flex: 1,
      }}
    >
      <View style={{ marginTop: "40%" }}>
        <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}>
          Continue as ...
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <SPressable>
            <Icon name="phone" style={{ textAlign: "center" }} size={35} />
            <SText>Employee</SText>
          </SPressable>
          <SPressable>
            <Icon name="phone" style={{ textAlign: "center" }} size={40} />

            <SText>Employer</SText>
          </SPressable>
          <SPressable>
            <Icon name="phone" style={{ textAlign: "center" }} size={40} />

            <SText>Lessee</SText>
          </SPressable>
          <SPressable>
            <Icon name="phone" style={{ textAlign: "center" }} size={40} />

            <SText>Lessor</SText>
          </SPressable>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
