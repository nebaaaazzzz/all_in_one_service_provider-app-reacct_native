import { Text, StyleSheet, View, StatusBar, ScrollView } from "react-native";
import React, { useState } from "react";
import { TextInput, Button, RadioButton } from "react-native-paper";
import styled from "styled-components/native";
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
function SignupScreen({ navigation }) {
  const [checked, setChecked] = React.useState("first");
  const [phone, setPhone] = useState(true);
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
        <Text style={styles.text}>Register</Text>
      </View>
      <STextInput
        placeholder="first name"
        left={<TextInput.Icon name="AccountCircle" />}
      />
      <STextInput
        placeholder="last name"
        left={<TextInput.Icon name="AccountCircle" />}
      />
      {phone ? (
        <STextInput
          placeholder="email"
          left={<TextInput.Icon name="AccountCircle" />}
        />
      ) : (
        <STextInput
          placeholder="phone"
          left={<TextInput.Icon name="AccountCircle" />}
        />
      )}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Gender</Text>
        <RadioButton
          value="first"
          status={checked === "first" ? "checked" : "unchecked"}
          onPress={() => setChecked("first")}
        />
        <RadioButton
          value="second"
          status={checked === "second" ? "checked" : "unchecked"}
          onPress={() => setChecked("second")}
        />
      </View>
      <STextInput
        placeholder="Password"
        secureTextEntry
        left={<TextInput.Icon name="LockOpen" />}
      />
      <STextInput
        placeholder="confirm Password"
        secureTextEntry
        left={<TextInput.Icon name="LockOpen" />}
      />
      <SButton mode="contained" onPress={() => console.log("Pressed")}>
        <Text style={{ color: "#fff", fontSize: 20, textTransform: "none" }}>
          Register
        </Text>
      </SButton>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          mode="text"
          style={{ color: "#fff", textTransform: "none" }}
          onPress={() =>
            requestAnimationFrame(() => {
              setPhone(!phone);
            })
          }
        >
          <Text style={{ textTransform: "none", fontSize: 15 }}>
            signup with phone number
          </Text>
        </Button>
      </View>
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
export default SignupScreen;
