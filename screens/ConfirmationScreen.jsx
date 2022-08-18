import {
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  StatusBar,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import React, { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { BASEURI, BASETOKEN } from "../urls";
const STextInput = styled(TextInput)`
  margin: 10px 0;
  background-color: #fff;
  border-bottom: 1px solid black;
`;
const ConfirmationScreen = ({ route, navigation }) => {
  const user = route.params.data;
  console.log(user);
  const [randStr, setRandStr] = useState();
  const { isSuccess, isLoading, isError, error, data, mutate } = useMutation(
    async () => {
      const response = await fetch(`${BASEURI}/auth/check-confirmation`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: user._id,
          randString: randStr,
        }),
      });
      if (!response.ok) {
        throw new Error((await response.json()).message);
      }
      return await response.json();
    }
  );
  if (isSuccess) {
    navigation.navigate("forgotchangepasssword", { data });
  }
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator color="#0244d0"></ActivityIndicator>
      </View>
    );
  }
  if (isError) {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }

  return (
    <View
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight,
        justifyContent: "flex-end",
      }}
    >
      <Text>{error?.message}</Text>
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
        <STextInput
          onChangeText={(text) => {
            setRandStr(text);
          }}
        />
        <Button mode="text">
          <Text style={{ textTransform: "none" }}>Resend code</Text>
        </Button>
        <Button
          onPress={() => {
            mutate();
          }}
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
