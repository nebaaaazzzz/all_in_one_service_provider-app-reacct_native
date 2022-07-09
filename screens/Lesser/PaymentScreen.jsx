import { View, Text, StatusBar, Pressable, Linking } from "react-native";
import React from "react";
import { BASEURI } from "../../urls";

const PaymentScreen = () => {
  return (
    <View style={{ marginTop: StatusBar.currentHeight }}>
      <Text>Payment required</Text>
      <Pressable
        style={{ backgroundColor: "blue", padding: 10 }}
        onPress={() => {
          Linking.openURL(`${BASEURI}/payment/CheckoutExpress`);
        }}
      >
        <Text>Pay with yenePay</Text>
      </Pressable>
    </View>
  );
};

export default PaymentScreen;
