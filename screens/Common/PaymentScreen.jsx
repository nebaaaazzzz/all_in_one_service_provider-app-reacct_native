import { View, Text, StatusBar, TouchableOpacity, Linking } from "react-native";
import React, { useContext } from "react";
import { BASEURI } from "../../urls";
import { UserContext } from "../../App.Navigator";

const PaymentScreen = () => {
  const user = useContext(UserContext);
  return (
    <View style={{ marginTop: StatusBar.currentHeight, paddingHorizontal: 50 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          marginVertical: 20,
          marginTop: "50%",
          color: "red",
        }}
      >
        Payment required
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: "blue", padding: 10, borderRadius: 10 }}
        onPress={() => {
          Linking.openURL(`${BASEURI}/payment/CheckoutExpress/${user._id}`);
          // Linking.openURL(`${BASEURI}/payment/CheckoutExpress/${user._id}`);
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Pay with yenePay
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;
