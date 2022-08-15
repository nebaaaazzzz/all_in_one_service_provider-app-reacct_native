import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Keyboard,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { TextInput } from "react-native";
import { RadioButton } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useMutation } from "react-query";
import { BASETOKEN, BASEURI } from "../../urls";
import { useTranslation } from "react-i18next";
const FeedbackScreen = () => {
  const { t } = useTranslation();
  const mutation = useMutation(async (data) => {
    const response = await fetch(`${BASEURI}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BASETOKEN}`,
      },
      body: data,
    });
    return response.json();
  });
  const [checked, setChecked] = React.useState();
  const [paymentComplain, setPaymentComplain] = React.useState("");
  const [complain, setComplain] = React.useState("");
  if (mutation.isLoading) {
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      ></View>
    );
  }
  if (mutation.isError) {
    ToastAndroid.show(mutation.error.message, ToastAndroid.SHORT);
  }

  return (
    <Pressable
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={{ flex: 1, padding: 10 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesome name="comments-o" size={60} color="#0244d0" />
        <Text style={{ marginHorizontal: 20, fontSize: 25, color: "#0244d0" }}>
        {t("Feed")}
        </Text>
      </View>
      <View style={{ marginTop: "5%" }}>
        <Pressable
          onPress={() => setChecked("first")}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <RadioButton
            color="#0244d0"
            value="first"
            status={checked === "first" ? "checked" : "unchecked"}
            onPress={() => setChecked("first")}
          />
          <Text>{t("paymentc")}</Text>
        </Pressable>
        {checked == "first" ? (
          <>
            <TextInput
              multiline={true}
              onChangeText={setPaymentComplain}
              numberOfLines={10}
              maxLength={50}
              value={paymentComplain}
              placeholder={t("enterc")}
              style={{
                borderColor: "gray",
                padding: 10,
                marginTop: 20,
                borderRadius: 5,
                marginHorizontal: 15,
                textAlignVertical: "top",
                borderWidth: 1,
              }}
            />
            <Text style={{ textAlign: "right" }}>
              {paymentComplain.length}/50
            </Text>
            <TouchableOpacity
              onPress={() => {
                mutation.mutate(
                  JSON.stringify({
                    comment: false,
                    description: paymentComplain,
                  })
                );
                setPaymentComplain("");
              }}
              disabled={paymentComplain.length < 10}
              style={{
                position: "absolute",
                top: 225,
                right: 25,
                backgroundColor:
                  paymentComplain.length > 9 ? "#0244d0" : "rgba(0,0,0,0.6)",
                alignSelf: "flex-end",
                paddingHorizontal: 30,
                paddingVertical: 5,
                borderRadius: 5,
                elevation: 5,
              }}
            >
              <Text style={{ color: "#fff" }}>{t("send")}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <></>
        )}
        <Pressable
          onPress={() => setChecked("second")}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <RadioButton
            color="#0244d0"
            value="second"
            status={checked === "second" ? "checked" : "unchecked"}
            onPress={() => setChecked("second")}
          />
          <Text>{t("comment")}</Text>
        </Pressable>
        {checked == "second" ? (
          <>
            <TextInput
              multiline
              maxLength={50}
              value={complain}
              onChangeText={(text) => setComplain(text)}
              numberOfLines={10}
              placeholder={t("commab")}
              style={{
                borderColor: "gray",
                padding: 10,
                marginTop: 20,
                borderRadius: 5,
                marginHorizontal: 15,
                textAlignVertical: "top",
                borderWidth: 1,
              }}
            />
            <Text style={{ textAlign: "right" }}>{complain.length}/50</Text>
            <TouchableOpacity
              disabled={complain.length < 10}
              onPress={() => {
                mutation.mutate(
                  JSON.stringify({
                    comment: true,
                    description: complain,
                  })
                );
                setComplain("");
              }}
              style={{
                position: "absolute",
                top: 260,
                backgroundColor:
                  complain.length > 9 ? "#0244d0" : "rgba(0,0,0,0.6)",

                right: 25,
                alignSelf: "flex-end",
                paddingHorizontal: 30,
                paddingVertical: 5,
                borderRadius: 5,
                elevation: 5,
              }}
            >
              <Text style={{ color: "#fff" }}>{t("send")}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text></Text>
        )}
      </View>
    </Pressable>
  );
};

export default FeedbackScreen;
