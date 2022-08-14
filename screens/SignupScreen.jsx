import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { List } from "react-native-paper";
import DatePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RadioButton } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useMutation } from "react-query";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import RegistrationSVG from "../assets/images/misc/RegistrationSvg";
import * as yup from "yup";

import { BASEURI } from "../urls";
const SignupScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  /**/
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState();
  const [date, setDate] = useState();
  /**/
  const { data, error, isError, isLoading, isSuccess, mutate } = useMutation(
    async () => {
      try {
        const response = await fetch(`${BASEURI}/auth/register`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            phoneNumber,
            password,
            confirmPassword,
            gender,
            date,
          }),
        });
        if (!response.ok) {
          throw new Error(await response.json());
        }
        return await response.json();
      } catch (err) {
        throw new Error(err.message);
      }
    }
  );

  /* */
  const [firstNameError, setFirstNameError] = useState();
  const [lastNameError, setLastNameError] = useState();
  const [phoneNumberError, setPhoneNumberError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState();
  /* */
  const handleSubmit = async () => {
    mutate();
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#0244d0" size={"large"}></ActivityIndicator>
      </View>
    );
  }
  if (isError) {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
    // return (
    //   <View style={{ marginTop: StatusBar.currentHeight }}>
    //     <Text>An error occurred: {error.message}</Text>
    //   </View>
    // );
  }
  if (isSuccess) {
    // navigation.navigate("validate", { data });
    navigation.navigate("login");
  }

  return (
    <SafeAreaView
      style={{
        marginTop: StatusBar.currentHeight,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          alignItems: "flex-end",
          // marginRight: 20,
          top: -35,
          right: 0,
          zIndex: 999,
          position: "absolute",
        }}
      >
        <List.Accordion
          style={{ width: 100, opacity: 1 }}
          title="Uncontrolled Accordion"
          right={(props) => (
            <FontAwesome name="language" color="#0244d0" size={40} />
          )}
          // right={(props) => <></>}
        >
          <List.Item
            title="አማርኛ"
            style={{ margin: 0, padding: 0 }}
            titleStyle={{ color: "#0244d0" }}
          />
          <List.Item
            style={{ margin: 0, padding: 0 }}
            title="English"
            titleStyle={{ color: "#0244d0" }}
          />
        </List.Accordion>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={{ alignItems: "center" }}>
          <RegistrationSVG
            height={300}
            width={300}
            style={{ transform: [{ rotate: "-5deg" }] }}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Signup
        </Text>
        <View style={{ marginBottom: 25 }}>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
            }}
          >
            <Ionicons
              name="person-outline"
              size={20}
              color="#0244d0"
              style={{ marginRight: 5 }}
            />

            <TextInput
              selectionColor={"#000"}
              value={firstName}
              onChangeText={async (text) => {
                const yupSchema = yup
                  .string()
                  .required()
                  .matches(/^[A-Za-z]+$/, "alphabet only");
                try {
                  await yupSchema.validate(text);
                  setFirstNameError("");
                } catch (err) {
                  setFirstNameError(err.message);
                }
                setFirstName(text);
              }}
              placeholder="First Name"
              style={{ flex: 1, paddingVertical: 0 }}
            />
          </View>
          {firstNameError ? (
            <Text style={{ color: "red" }}>{firstNameError}</Text>
          ) : (
            <></>
          )}
        </View>

        <View style={{ marginBottom: 25 }}>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
            }}
          >
            <Ionicons
              name="person-outline"
              size={20}
              color="#0244d0"
              style={{ marginRight: 5 }}
            />

            <TextInput
              selectionColor={"#000"}
              value={lastName}
              onChangeText={async (text) => {
                const yupSchema = yup
                  .string()
                  .required()
                  .matches(/^[A-Za-z]+$/, "alphabet only");
                try {
                  await yupSchema.validate(text);
                  setLastNameError("");
                } catch (err) {
                  setLastNameError(err.message);
                }
                setLastName(text);
              }}
              placeholder={"Last Name"}
              style={{ flex: 1, paddingVertical: 0 }}
            />
          </View>
          {lastNameError ? (
            <Text style={{ color: "red" }}>{lastNameError}</Text>
          ) : (
            <></>
          )}
        </View>
        <View style={{ marginBottom: 25 }}>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
            }}
          >
            <MaterialIcons
              name="phone"
              size={20}
              color="#0244d0"
              style={{ marginRight: 5 }}
            />
            <TextInput
              onChangeText={async (text) => {
                const yupSchema = yup
                  .string()
                  .matches(/^9/, "must stary with 9")
                  .max(9)
                  .min(9)
                  .required();
                try {
                  await yupSchema.validate(text);
                  setPhoneNumberError("");
                } catch (err) {
                  setPhoneNumberError(err.message);
                }
                setPhoneNumber(text);
              }}
              value={phoneNumber}
              placeholder={"Phone number"}
              keyboardType={"phone-pad"}
              style={{ flex: 1, paddingVertical: 0 }}
            />
          </View>
          {phoneNumberError ? (
            <Text style={{ color: "red" }}>{phoneNumberError}</Text>
          ) : (
            <></>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <View style={{ marginRight: "10%" }}>
            <Text style={{ color: "rgba(0,0,0,0.8)" }}>Gender</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "rgba(0,0,0,.6)" }}>Male</Text>
            <RadioButton
              value="male"
              color="#0244d0"
              status={gender === "male" ? "checked" : "unchecked"}
              onPress={() => setGender("male")}
            />
            <Text style={{ color: "rgba(0,0,0,.6)" }}>Female</Text>

            <RadioButton
              value="female"
              color="#0244d0"
              status={gender === "female" ? "checked" : "unchecked"}
              onPress={() => setGender("female")}
            />
          </View>
        </View>
        <View style={{ marginBottom: 25 }}>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
            }}
          >
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#0244d0"
              style={{ marginRight: 5 }}
            />
            <TextInput
              onChangeText={async (text) => {
                const yupSchema = yup.string().required().min(6);
                try {
                  await yupSchema.validate(text);
                  setPasswordError("");
                } catch (err) {
                  setPasswordError(err.message);
                }
                setPassword(text);
              }}
              value={password}
              placeholder={"Password"}
              inputType="password"
              style={{ flex: 1, paddingVertical: 0 }}
              secureTextEntry={true}
            />
          </View>
          {passwordError ? (
            <Text style={{ color: "red" }}>{passwordError}</Text>
          ) : (
            <></>
          )}
        </View>
        <View style={{ marginBottom: 25 }}>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
            }}
          >
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#0244d0"
              style={{ marginRight: 5 }}
            />
            <TextInput
              onChangeText={async (text) => {
                if (passwordError) {
                  const yupSchema = yup.string().required().min(6);

                  try {
                    await yupSchema.validate(text);
                    setConfirmPasswordError("");
                  } catch (err) {
                    setConfirmPasswordError(err.message);
                  }
                } else {
                  if (password == confirmPassword) {
                    setConfirmPasswordError("");
                  } else {
                    // setConfirmPasswordError("password mismatch");
                  }
                }
                setConfirmPassword(text);
              }}
              value={confirmPassword}
              placeholder={"Confirm Password"}
              inputType="password"
              style={{ flex: 1, paddingVertical: 0 }}
              secureTextEntry={true}
            />
          </View>
          {confirmPasswordError ? (
            <Text style={{ color: "red" }}>{confirmPasswordError}</Text>
          ) : (
            <></>
          )}
        </View>

        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#0244d0"
            style={{ marginRight: 5 }}
          />
          {open ? (
            <DatePicker
              value={date ? new Date(date) : new Date()} //initial date from state
              mode="date" //The enum of date, datetime and time
              display="calendar"
              maxDate="01-01-2019"
              textColor="red"
              minimumDate={new Date(1950, 0, 1)}
              maximumDate={new Date(2000, 10, 20)}
              onChange={({ nativeEvent: { timestamp } }) => {
                if (timestamp) {
                  setDate(new Date(timestamp));
                }
                setOpen(false);
              }}
            />
          ) : (
            <Text style={{ color: "#666", marginLeft: 5, marginTop: 5 }}>
              {date
                ? date.getDay() +
                  "/" +
                  date.getMonth() +
                  "/" +
                  date.getFullYear()
                : "date of birth"}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={
            firstNameError &&
            lastNameError &&
            passwordError &&
            confirmPasswordError &&
            !(
              firstName &&
              lastName &&
              password &&
              confirmPassword &&
              date &&
              gender
            )
          }
          style={{
            backgroundColor:
              firstName &&
              lastName &&
              password &&
              confirmPassword &&
              gender &&
              date &&
              !(
                firstNameError &&
                lastNameError &&
                passwordError &&
                confirmPassword
              )
                ? "#0244d0"
                : "rgba(0,0,0,0.6)",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: 16,
              color: "#fff",
            }}
          >
            Signup
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.push("login")}>
            <Text style={{ color: "#0244d0", fontWeight: "700" }}>SignIn </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
