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
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginSVG from "../assets/images/misc/LoginSVG";

import GoogleSVG from "../assets/images/misc/GoogleSvg.jsx";
import FacebookSVG from "../assets/images/misc/FacebookSvg.jsx";
import TwitterSVG from "../assets/images/misc/TwitterSvg.jsx";
import CustomButton from "../components/CustomButton";
import { ScrollView } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";

import { useMutation, useQueryClient } from "react-query";
import { BASEURI } from "../urls";
import * as yup from "yup";
const yupEmailSchema = yup.object().shape({
  email: yup.string().email().required(),
});
const yupPasswordSchema = yup.object().shape({
  password: yup.string().required().min(6),
});
const LoginScreen = ({ navigation, route }) => {
  const [password, setPassword] = React.useState("");
  const queryClient = useQueryClient();
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const { isLoading, data, error, isError, isSuccess, mutate } = useMutation(
    async () => {
      try {
        if (!(passwordError && emailError)) {
          const response = await fetch(`${BASEURI}/auth/login`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          return await response.json();
        }
      } catch (err) {
        throw err;
      }
    }
  );
  if (isLoading) {
    <View>
      <ActivityIndicator color={"#0244d0"}></ActivityIndicator>
    </View>;
  }
  if (isError) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{error.message}</Text>
      </View>
    );
  }
  if (isSuccess) {
    (async () => {
      await SecureStore.setItemAsync("token", data.token);
      await queryClient.invalidateQueries("user");
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
                marginBottom: 30,
              }}
            >
              Login
            </Text>

            <View style={{ marginBottom: 25 }}>
              <View
                style={{
                  flexDirection: "row",
                  borderColor: emailError ? "red" : "#ccc",
                  borderBottomWidth: 1,
                  paddingBottom: 8,
                }}
              >
                <MaterialIcons
                  name="alternate-email"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
                <TextInput
                  value={email}
                  onChangeText={(text) => {
                    yupEmailSchema
                      .validate({ email: text })
                      .then(() => {
                        setEmailError("");
                      })
                      .catch((err) => {
                        setEmailError(err.message);
                      });
                    setEmail(text);
                  }}
                  placeholder={"Email ID"}
                  keyboardType={"email-address"}
                  style={{
                    flex: 1,
                    paddingVertical: 0,
                  }}
                />
              </View>
              {emailError ? <Text>{emailError}</Text> : <></>}
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

            <CustomButton
              label={"Login"}
              onPress={() => {
                mutate({ id: new Date(), title: "Do Laundry" });
              }}
            />

            <Text
              style={{ textAlign: "center", color: "#666", marginBottom: 30 }}
            >
              Or, login with ...
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 30,
              }}
            >
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  borderColor: "#ddd",
                  borderWidth: 2,
                  borderRadius: 10,
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                }}
              >
                <GoogleSVG height={24} width={24} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  borderColor: "#ddd",
                  borderWidth: 2,
                  borderRadius: 10,
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                }}
              >
                <FacebookSVG height={24} width={24} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  borderColor: "#ddd",
                  borderWidth: 2,
                  borderRadius: 10,
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                }}
              >
                <TwitterSVG height={24} width={24} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 30,
              }}
            >
              <Text>New to the app?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("register")}>
                <Text style={{ color: "#0244d0", fontWeight: "700" }}>
                  {" "}
                  Register
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
