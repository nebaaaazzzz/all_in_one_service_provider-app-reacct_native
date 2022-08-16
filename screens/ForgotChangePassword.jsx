import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  TextInput,
  StatusBar,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

import { ScrollView } from "react-native-gesture-handler";

import { useMutation } from "react-query";
import { BASEURI } from "../urls";
import { useTranslation } from "react-i18next";

const ForgotChangePassword = ({ navigation, route }) => {
  const user = route.params.data;
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const { isLoading, data, error, isError, isSuccess, mutate } = useMutation(
    async () => {
      try {
        if (
          !(passwordError && confirmPasswordError) &&
          password === confirmPassword
        ) {
          const response = await fetch(
            `${BASEURI}/auth/forgot-change-password`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ id: user._id, password, confirmPassword }),
            }
          );

          if (!response.ok) {
            throw new Error((await response.json()).message);
          }
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
    navigation.navigate("login");
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
              {t("chgpass")}
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
                  borderBottomColor: passwordError ? "red" : "#ccc",
                  borderBottomWidth: 1,
                  paddingBottom: 8,
                }}
              >
                <Ionicons
                  name="ios-lock-closed-outline"
                  size={20}
                  color="#0244d0"
                  style={{ marginRight: 5 }}
                />
                <TextInput
                  selectionColor={"#000"}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  placeholder={t("newpass")}
                  style={{ flex: 1, paddingVertical: 0 }}
                  secureTextEntry={true}
                />
              </View>
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
                  color="#0244d0"
                  style={{ marginRight: 5 }}
                />
                <TextInput
                  selectionColor={"#000"}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                  }}
                  placeholder={t("confpass")}
                  style={{ flex: 1, paddingVertical: 0 }}
                  secureTextEntry={true}
                />
              </View>
            </View>

            <TouchableOpacity
              disabled={passwordError && confirmPasswordError}
              onPress={() => {
                mutate();
              }}
              style={{
                backgroundColor:
                  !(passwordError && confirmPasswordError) &&
                  password == confirmPassword
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
                {t("save")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Pressable>
    </SafeAreaView>
  );
};

export default ForgotChangePassword;
