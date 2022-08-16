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

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { ScrollView } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";

import { useMutation, useQueryClient } from "react-query";
import { BASEURI } from "../urls";
import { List } from "react-native-paper";
import { useTranslation } from "react-i18next";
import il8n from "./../i18n";
import "./../i18n";

const LoginScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [currentLanguage, setLanguage] = useState("en");
  const [expanded, setExpanded] = React.useState(false);
  const changeLanguage = (value) => {
    il8n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch((err) => console.log(err));
  };
  const [password, setPassword] = React.useState("");
  const queryClient = useQueryClient();
  const [phoneError, setPhoneError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const { isLoading, data, error, isError, isSuccess, mutate } = useMutation(
    async () => {
      try {
        if (!(passwordError && phoneError)) {
          const response = await fetch(`${BASEURI}/auth/login`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ phoneNumber, password }),
          });

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
      <View
        style={{
          alignItems: "flex-end",
          // marginRight: 20,
          top: -35,
          right: 0,
          position: "absolute",
        }}
      >
        <List.Accordion
          style={{ width: 100, opacity: 1 }}
          title="Uncontrolled Accordion"
          right={(props) => (
            <FontAwesome name="language" color="#0244d0" size={40} />
          )}
          // right={(props) => <></>}
        >
          <List.Item
            title="አማርኛ"
            onPress={() => {
              setExpanded(false);
              changeLanguage("am");
            }}
            style={{ margin: 0, padding: 0 }}
            titleStyle={{ color: "#0244d0" }}
          />
          <List.Item
            onPress={() => {
              setExpanded(false);
              changeLanguage("en");
            }}
            style={{ margin: 0, padding: 0 }}
            title="English"
            titleStyle={{ color: "#0244d0" }}
          />
        </List.Accordion>
      </View>
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
              {t("lo")}
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
                  color="#0244d0"
                  style={{ marginRight: 5 }}
                />
                <TextInput
                  selectionColor={"#000"}
                  value={phoneNumber}
                  onChangeText={(text) => {
                    setPhoneNumber(text);
                  }}
                  placeholder={t("phoneno")}
                  keyboardType={"phone-pad"}
                  style={{
                    flex: 1,
                    paddingVertical: 0,
                  }}
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
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  placeholder={t("pass")}
                  style={{ flex: 1, paddingVertical: 0 }}
                  secureTextEntry={true}
                />
              </View>
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
                {t("lo")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("forgotpassword");
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0244d0",
                  marginBottom: 30,
                }}
              >
                {t("forg")}{" "}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 30,
              }}
            >
              <Text>{t("New")}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                <Text style={{ color: "#0244d0", fontWeight: "700" }}>
                  {" "}
                  {t("signup")}
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
