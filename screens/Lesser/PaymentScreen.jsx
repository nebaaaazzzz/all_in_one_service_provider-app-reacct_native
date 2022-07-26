import { View, Text, StatusBar, Pressable, Linking } from "react-native";
import React, { useContext } from "react";
import { BASEURI } from "../../urls";
import { UserContext } from "../../App.Navigator";

const PaymentScreen = () => {
  const user = useContext(UserContext);
  return (
    <View style={{ marginTop: StatusBar.currentHeight }}>
      <Text>Payment required</Text>
      <Pressable
        style={{ backgroundColor: "blue", padding: 10 }}
        onPress={() => {
          Linking.openURL(`${BASEURI}/payment/CheckoutExpress/${user._id}`);
          // Linking.openURL(`${BASEURI}/payment/CheckoutExpress/${user._id}`);
        }}
      >
        <Text>Pay with yenePay</Text>
      </Pressable>
    </View>
  );
};

export default PaymentScreen;
