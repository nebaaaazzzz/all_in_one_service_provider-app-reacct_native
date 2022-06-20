import { View, Text, StatusBar, Pressable } from "react-native";
import React from "react";
import Styled from "styled-components";
const SText = Styled(Text)`
margin: 20px 20px`;
const HostScreen = () => {
  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight,
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
      <View
        style={{
          borderRadius: 25,
          backgroundColor: "#fff",
          height: "100%",
          marginTop: "50%",
        }}
      >
        <SText style={{ fontSize: 40 }}>Try Hosting on Connect</SText>
        <SText style={{ fontSize: 20 }}>
          Join Us. We'll help you every step of the way
        </SText>
        <View
          style={{
            top: "10%",
            borderTopColor: "rgba(0,0,0,.4)",
            borderTopWidth: 1,
            paddingHorizontal: 10,
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              position: "absolute",
              backgroundColor: "#0099ff",
              borderRadius: 10,
              marginTop: 15,
              width: "100%",
              elevation: 5,
              paddingHorizontal: 10,
              paddingVertical: 15,
            }}
          >
            <Text style={{ fontSize: 18, color: "#fff", textAlign: "center" }}>
              Let's Go
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default HostScreen;
