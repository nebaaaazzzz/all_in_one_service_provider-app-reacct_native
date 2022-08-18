import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StatusBar,
  ToastAndroid,
  Pressable,
  Keyboard,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import React, { useState } from "react";
import styled from "styled-components";
const STextInput = styled(TextInput)`
  margin: 10px 0;
  background-color: #fff;
  border-bottom: 1px solid black;
`;
import { useMutation } from "react-query";
import { BASEURI } from "../urls";
import * as yup from "yup";
const ValidateScreen = ({ route, navigation }) => {
  const user = route.params.data;
  const [randStr, setRandStr] = useState();
  const [randStrError, setRandStrError] = useState();
  const { isSuccess, isLoading, isError, error, data, mutate } = useMutation(
    async () => {
      const response = await fetch(`${BASEURI}/auth/validate`, {
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
    navigation.navigate("login");
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
    <Pressable
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={{
        backgroundColor: "rgba(0,0,0,.5)",
        flex: 1,
        marginTop: StatusBar.currentHeight,
        justifyContent: "flex-end",
      }}
    >
      {error.message}
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
          Please enter the 6 digit code sent to you via sms
        </Text>
        <STextInput
          onChangeText={async (text) => {
            const yupSchema = yup.string().min(6).max(6).required();
            try {
              const valid = await yupSchema.validate(text);
              setRandStrError("");
            } catch (err) {
              setRandStrError(err.message);
            }
            setRandStr(text);
          }}
        />
        {randStrError ? <Text>{randStrError}</Text> : <></>}
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
    </Pressable>
  );
};

export default ValidateScreen;
