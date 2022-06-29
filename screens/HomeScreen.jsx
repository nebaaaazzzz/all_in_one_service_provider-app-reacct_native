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
  overflow: hidden;
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
const HomeScreen = ({ navigation }) => {
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
          <SPressable
            onPress={() => {
              requestAnimationFrame(() => navigation.navigate("employee"));
            }}
          >
            <Icon name="phone" style={{ textAlign: "center" }} size={35} />
            <SText>Employee</SText>
          </SPressable>
          <SPressable
            onPress={() => {
              requestAnimationFrame(() => navigation.navigate("employer"));
            }}
          >
            <Icon name="phone" style={{ textAlign: "center" }} size={40} />

            <SText>Employer</SText>
          </SPressable>
          <SPressable
            onPress={() =>
              requestAnimationFrame(() => navigation.navigate("lessee"))
            }
          >
            <Icon name="phone" style={{ textAlign: "center" }} size={40} />

            <SText>Lessee</SText>
          </SPressable>
          <SPressable
            onPress={() => {
              requestAnimationFrame(() => navigation.navigate("lesser"));
            }}
          >
            <Icon name="phone" style={{ textAlign: "center" }} size={40} />

            <SText>Lesser</SText>
          </SPressable>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
