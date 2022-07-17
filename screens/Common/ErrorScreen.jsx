import { View, Text } from "react-native";
import React from "react";

const ErrorScreen = ({ route }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{route?.params?.error?.message}</Text>
    </View>
  );
};

export default ErrorScreen;
