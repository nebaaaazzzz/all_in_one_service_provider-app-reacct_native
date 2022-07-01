import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  Pressable,
} from "react-native";
import * as yup from "yup";

let schema = yup.object().shape({
  fromBudget: yup.number().required().positive().integer(),
  toBudget: yup.number().required().positive().integer(),
});
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
              <Text>/hour</Text>
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
              <Text>/hour</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: "20%" }}></View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          top: dimension.height - 100,
          alignItems: "center",
          justifyContent: "center",
          height: 90,
          width: "100%",
          borderTopWidth: 1,
          borderColor: "rgba(0,0,0,0.7)",
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
          <Text style={{ color: "blue" }}>
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
                : "rgba(0,0,0,0.6)",
            height: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PaymentScreen;
