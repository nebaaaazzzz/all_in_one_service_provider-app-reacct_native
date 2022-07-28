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
import { RadioButton, Divider } from "react-native-paper";

const PaymentScreen = ({ navigation }) => {
  const { dispatch } = useContext(PostJobContext);
  const dimension = useWindowDimensions();
  const [fromBudget, setFromBudget] = useState("");
  const [paymentStyle, setPaymentStyle] = React.useState();

  const [toBudget, setToBudget] = useState("");
  const exp = ["Fixed", "By Negotiation", "By The Organization Scale"];
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
          Choose Payment Style
        </Text>
        <View style={{ marginVertical: 14 }}>
          {exp.map((item, index) => {
            return (
              <Pressable
                key={index + 1}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
                onPress={() => setPaymentStyle(index)}
              >
                <RadioButton
                  value={index}
                  color="#0244d0"
                  onPress={() => setPaymentStyle(index)}
                  status={paymentStyle === index ? "checked" : "unchecked"}
                />

                <View>
                  <Text style={{ fontSize: 16 }}>{item}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
        {paymentStyle === 0 && (
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
        )}

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
          disabled={
            !(fromBudget && toBudget) &&
            !(
              paymentStyle == 0 &&
              parseFloat(fromBudget) &&
              parseFloat(toBudget) &&
              parseFloat(fromBudget) < parseFloat(toBudget)
            )
          }
          onPress={() => {
            if (paymentStyle == 0) {
              dispatch({
                type: "add",
                payload: {
                  paymentStyle: exp[paymentStyle],
                  budget: {
                    from: fromBudget,
                    to: toBudget,
                  },
                },
              });
            } else {
              dispatch({
                type: "add",
                payload: {
                  paymentStyle: exp[paymentStyle],
                },
              });
            }

            // if (
            //   parseFloat(fromBudget) &&
            //   parseFloat(toBudget) &&
            //   parseFloat("2") < parseFloat("565")
            // ) {

            navigation.navigate("employer/postjob/review");
            // }
          }}
          style={{
            width: "80%",
            borderRadius: 20,
            backgroundColor:
              paymentStyle > 0 ||
              (paymentStyle == 0 &&
                parseFloat(fromBudget) &&
                parseFloat(toBudget) &&
                parseFloat(fromBudget) < parseFloat(toBudget))
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
            {/* 
            exp[1] exp[2]
            exp[0]

             */}
            Next: Review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PaymentScreen;
