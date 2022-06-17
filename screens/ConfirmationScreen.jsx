import { ScrollView, View, Text, StatusBar } from "react-native";
import { TextInput, Button } from "react-native-paper";
import React from "react";
import styled from "styled-components";
const STextInput = styled(TextInput)`
  margin: 10px 0;
  background-color: #fff;
  border-bottom: 1px solid black;
`;
const ConfirmationScreen = () => {
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,.5)",
        flex: 1,
        marginTop: StatusBar.currentHeight,
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          height: "60%",
          flexDirection: "column",
          elevation: 10,
        }}
      >
        <Text
          style={{ color: "rgba(0,0,0,0.8)", fontSize: 30, fontWeight: "bold" }}
        >
          Confirmation
        </Text>
        <Text style={{ fontSize: 15 }}>
          Please enter the 6 digit code sent to you via sms or email
        </Text>
        <STextInput />
        <Button mode="text">
          <Text style={{ textTransform: "none" }}>Resend code</Text>
        </Button>
        <Button
          mode="contained"
          style={{ width: "60%", marginHorizontal: "20%" }}
        >
          <Text style={{ color: "#fff" }}>Confirm</Text>
        </Button>
      </View>
    </View>
  );
};

export default ConfirmationScreen;
