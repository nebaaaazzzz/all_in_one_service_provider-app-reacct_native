import { Text, StyleSheet, View, StatusBar, ScrollView } from "react-native";
import React from "react";
import { TextInput, Button } from "react-native-paper";
import styled from "styled-components/native";
import * as SecureStore from "expo-secure-store";
const STextInput = styled(TextInput)`
  height: 50;
  border-color: #000;
  margin-top: 10;
  margin-bottom: 10;
`;
const SButton = styled(Button)`
  padding: 2px;
  color: "#fff";
`;
function LoginScreen({ navigation }) {
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 10,
        flex: 1,
        justifyContent: "center",
        marginTop: StatusBar.currentHeight,
      }}
    >
      <View style={styles.textContainer}>
        <Text style={styles.text}>Sign In</Text>
      </View>
      <STextInput
        placeholder="User name"
        left={<TextInput.Icon name="account-outline" />}
      />
      <STextInput
        placeholder="Password"
        secureTextEntry
        left={<TextInput.Icon name="lock-outline" />}
      />
      <SButton mode="contained" onPress={() => {}}>
        <Text style={{ color: "#fff", fontSize: 20 }}>Login</Text>
      </SButton>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>don't have an account?</Text>
        <Button
          mode="text"
          style={{ color: "#fff" }}
          onPress={() =>
            requestAnimationFrame(() => {
              navigation.replace("signup");
            })
          }
        >
          <Text style={{ textTransform: "none" }}>Signup</Text>
        </Button>
      </View>
      <Button mode="text" onPress={() => {}}>
        <Text style={{ textTransform: "none" }}>Forgot Password ?</Text>
      </Button>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 33,
    color: "#0099ff",
    textAlign: "center",
  },
});
export default LoginScreen;
