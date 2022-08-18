import React from "react";
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
import { useTranslation } from "react-i18next";

const ForgotPasswordScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [password, setPassword] = React.useState("");
  const queryClient = useQueryClient();
  const [phoneError, setPhoneError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const { isLoading, data, error, isError, isSuccess, mutate } = useMutation(
    async () => {
      try {
        if (!(passwordError && phoneError)) {
          const response = await fetch(`${BASEURI}/auth/forgot-password`, {
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
    navigation.navigate("confirmation", { data });
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
              {t("forgot")}
            </Text>
            <View style={{ marginBottom: 10 }}>
              {isError ? (
                <Text style={{ textAlign: "center", color: "red" }}>
                  {error?.message}
                </Text>
              ) : (
                <></>
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
                {t("send")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Pressable>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
