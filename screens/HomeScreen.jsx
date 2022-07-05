import { View, Text, StatusBar, Pressable, Image } from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components/native";
const SPressable = styled(Pressable).attrs({
  android_ripple: {
    color: "#3498db",
    borderless: false,
  },
})`
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #3498db;
  width: 35%;
  margin: 10px 10px;
`;
const SText = styled(Text)`
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
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
            style={{ alignItems: "center" }}
            onPress={() => {
              requestAnimationFrame(() => navigation.navigate("employee"));
            }}
          >
            {/* <Icon name="phone" style={{ textAlign: "center" }} size={35} /> */}
            <Image
              style={{
                height: 60,
                width: 100,
                resizeMode: "cover",
              }}
              source={require("./../assets/homescreenicons/employee.png")}
            />

            <SText>Employee</SText>
          </SPressable>
          <SPressable
            style={{ alignItems: "center" }}
            onPress={() => {
              requestAnimationFrame(() => navigation.navigate("employer"));
            }}
          >
            <Image
              style={{
                height: 60,
                width: 100,
                resizeMode: "contain",
              }}
              source={require("./../assets/homescreenicons/employer.png")}
            />

            <SText>Employer</SText>
          </SPressable>
          <SPressable
            style={{ alignItems: "center" }}
            onPress={() =>
              requestAnimationFrame(() => navigation.navigate("lessee"))
            }
          >
            <Image
              style={{
                height: 60,
                width: 100,
                resizeMode: "contain",
              }}
              source={require("./../assets/homescreenicons/lessee.png")}
            />

            <SText>Lessee</SText>
          </SPressable>
          <SPressable
            style={{ alignItems: "center" }}
            onPress={() => {
              requestAnimationFrame(() => navigation.navigate("lesser"));
            }}
          >
            <Image
              style={{
                height: 60,
                width: 100,
                resizeMode: "contain",
              }}
              source={require("./../assets/homescreenicons/lesser.png")}
            />

            <SText>Lesser</SText>
          </SPressable>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
