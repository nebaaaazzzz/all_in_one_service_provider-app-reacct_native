import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  Pressable,
} from "react-native";

import { ProgressBar } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { PostJobContext } from "./PostJobScreen";
const PaymentScreen = ({ navigation }) => {
  const { dispatch } = useContext(PostJobContext);
  const dimension = useWindowDimensions();
  const [fromBudget, setFromBudget] = useState("");
  const [toBudget, setToBudget] = useState("");
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          marginTop: StatusBar.currentHeight,
          flex: 1,
        }}
      >
        <ProgressBar progress={1} />
        <Text
          style={{
            fontSize: 22,
            marginTop: "10%",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Tell us about your buget
        </Text>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            marginTop: "10%",
            alignSelf: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text>From</Text>

            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <TextInput
                keyboardType="number-pad"
                onChangeText={setFromBudget}
                style={{ width: "60%" }}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text>To</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                keyboardType="number-pad"
                onChangeText={setToBudget}
                style={{ width: "60%" }}
              />
            </View>
          </View>
        </View>
        <View style={{ marginTop: "20%" }}></View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          top: dimension.height - 85,
          alignItems: "center",
          justifyContent: "center",
          height: 85,
          backgroundColor: "#fff",
          width: "100%",
          borderTopWidth: 1,
          borderColor: "#000",
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("employer/postjob/review");
          }}
          style={{
            alignSelf: "flex-start",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        >
          <Text style={{ color: "#0244d0" }}>
            Not ready to set an hourly rate?
          </Text>
        </Pressable>
        <Pressable
          disabled={!(fromBudget && toBudget)}
          onPress={() => {
            if (
              parseFloat(fromBudget) &&
              parseFloat(toBudget) &&
              parseFloat("2") < parseFloat("565")
            ) {
              dispatch({
                type: "add",
                payload: {
                  budget: {
                    from: fromBudget,
                    to: toBudget,
                  },
                },
              });
              navigation.navigate("employer/postjob/review");
            }
          }}
          style={{
            width: "80%",
            borderRadius: 20,
            backgroundColor:
              parseFloat(fromBudget) &&
              parseFloat(toBudget) &&
              parseFloat(fromBudget) < parseFloat(toBudget)
                ? "#0244d0"
                : "rgba(0,0,0,0.3)",
            height: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: fromBudget && toBudget ? "#fff" : "rgba(0,0,0,0.5)",
            }}
          >
            Next: Review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PaymentScreen;
