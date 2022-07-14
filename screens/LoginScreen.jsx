import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Keyboard,
  Pressable,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginSVG from "../assets/images/misc/LoginSVG";
import GoogleSVG from "../assets/images/misc/GoogleSvg.jsx";
import FacebookSVG from "../assets/images/misc/FacebookSvg.jsx";
import TwitterSVG from "../assets/images/misc/TwitterSvg.jsx";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { ScrollView } from "react-native-gesture-handler";
const LoginScreen = ({ navigation }) => {
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
                fontFamily: "Roboto-Medium",
                fontSize: 28,
                fontWeight: "500",
                color: "#333",
                marginBottom: 30,
              }}
            >
              Login
            </Text>

            <InputField
              label={"Email ID"}
              icon={
                <MaterialIcons
                  name="alternate-email"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
              }
              keyboardType="email-address"
            />

            <InputField
              label={"Password"}
              icon={
                <Ionicons
                  name="ios-lock-closed-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
              }
              inputType="password"
              fieldButtonFunction={() => {}}
            />

            <CustomButton label={"Login"} onPress={() => {}} />

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
