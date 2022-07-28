import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Keyboard,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StatusBar,
  ToastAndroid,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { ScrollView } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";

import { useMutation, useQueryClient } from "react-query";
import { BASEURI } from "../urls";
import * as yup from "yup";
const yupPhoneSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^9/, "must stary with 9")
    .max(9)
    .min(9)
    .required(),
});
const yupPasswordSchema = yup.object().shape({
  password: yup.string().required().min(6),
});
const LoginScreen = ({ navigation, route }) => {
  const [password, setPassword] = React.useState("");
  const queryClient = useQueryClient();
  const [phoneError, setPhoneError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const { isLoading, data, error, isError, isSuccess, mutate } = useMutation(
    async () => {
      try {
        if (!(passwordError && phoneError)) {
          console.log("world");

          const response = await fetch(`${BASEURI}/auth/login`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ phoneNumber, password }),
          });
          console.log("hello1");

          if (!response.ok) {
            console.log("reponse text", response.statusText);
            throw new Error((await response.json()).err);
          }
          console.log("hello");
          return await response.json();
        }
      } catch (err) {
        throw err;
      }
    }
  );
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={"#0244d0"} size={"large"}></ActivityIndicator>
      </View>
    );
  }
  if (isSuccess) {
    (async () => {
      if (data.token) {
        await SecureStore.setItemAsync("token", data.token);
        await queryClient.invalidateQueries("user");
      }
    })();
  }
  return (
    <SafeAreaView
      style={{
        marginTop: StatusBar.currentHeight,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Pressable onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <View style={{ paddingHorizontal: 25 }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "500",
                color: "#333",
                textAlign: "center",
                color: "#0244d0",
                marginBottom: 10,
              }}
            >
              Login
            </Text>
            <View style={{ marginBottom: 10 }}>
              {isError && (
                <Text style={{ textAlign: "center", color: "red" }}>
                  {error.message}
                </Text>
              )}
            </View>
            <View style={{ marginBottom: 25 }}>
              <View
                style={{
                  flexDirection: "row",
                  borderColor: phoneError ? "red" : "#ccc",
                  borderBottomWidth: 1,
                  paddingBottom: 8,
                }}
              >
                <MaterialIcons
                  name="phone"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
                <TextInput
                  selectionColor={"#000"}
                  value={phoneNumber}
                  onChangeText={(text) => {
                    yupPhoneSchema
                      .validate({ phoneNumber: text })
                      .then(() => {
                        setPhoneError("");
                      })
                      .catch((err) => {
                        setPhoneError(err.message);
                      });
                    setPhoneNumber(text);
                  }}
                  placeholder={"Phone number"}
                  keyboardType={"phone-pad"}
                  style={{
                    flex: 1,
                    paddingVertical: 0,
                  }}
                />
              </View>
              {phoneError ? (
                <Text style={{ color: "red" }}>{phoneError}</Text>
              ) : (
                <></>
              )}
            </View>
            <View style={{ marginBottom: 25 }}>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomColor: passwordError ? "red" : "#ccc",
                  borderBottomWidth: 1,
                  paddingBottom: 8,
                }}
              >
                <Ionicons
                  name="ios-lock-closed-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
                <TextInput
                  selectionColor={"#000"}
                  value={password}
                  onChangeText={(text) => {
                    yupPasswordSchema
                      .validate({ password: text })
                      .then(() => {
                        setPasswordError("");
                      })
                      .catch((err) => {
                        setPasswordError(err.message);
                      });
                    setPassword(text);
                  }}
                  placeholder={"Password"}
                  style={{ flex: 1, paddingVertical: 0 }}
                  secureTextEntry={true}
                />
              </View>
              {passwordError ? (
                <Text style={{ color: "red" }}>{passwordError}</Text>
              ) : (
                <></>
              )}
            </View>

            <TouchableOpacity
              disabled={passwordError && phoneError}
              onPress={() => mutate({ id: new Date() })}
              style={{
                backgroundColor: !(passwordError && phoneError)
                  ? "#0244d0"
                  : "rgba(0,0,0,0.6)",
                padding: 20,
                borderRadius: 10,
                marginBottom: 30,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("forgotpassword");
              }}
            >
              <Text
                style={{ textAlign: "center", color: "#666", marginBottom: 30 }}
              >
                forget password?
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 30,
              }}
            >
              <Text>New to the app?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                <Text style={{ color: "#0244d0", fontWeight: "700" }}>
                  {" "}
                  Signup
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Pressable>
    </SafeAreaView>
  );
};

export default LoginScreen;
