import React from "react";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import HomeScreen from "./screens/HomeScreen";
import EmployeeScreen from "./screens/Employee/EmployeeScreen";
import JobDetailScreen from "./screens/Employee/JobDetailScreen";
import EmployerScreen from "./screens/Employer/EmployerScreen";
import LesseeScreen from "./screens/Lessee/LesseeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import LesserScreen from "./screens/Lesser/LesserScreen";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";

import { ActivityIndicator } from "react-native";
import { View, Text } from "react-native";
import { useQuery } from "react-query";
import { BASEURI } from "./urls";
const StackNavigator = createStackNavigator();
export const UserContext = React.createContext();
const AppNavigator = () => {
  const { data, isFetching, isError, error, isLoading, isSuccess } = useQuery(
    "user",

    async function () {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        const response = await fetch(`${BASEURI}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return await response.json();
      }
    }
  );
  if (isLoading || isFetching) {
    return (
      <View style={{ marginTop: "80%" }}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }
  if (isError) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <UserContext.Provider value={data}>
        <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
          {data ? (
            <StackNavigator.Group>
              <StackNavigator.Screen name="home" component={HomeScreen} />
              <StackNavigator.Screen
                name="employee"
                component={EmployeeScreen}
              />
              <StackNavigator.Screen
                name="employer"
                component={EmployerScreen}
              />
              <StackNavigator.Screen name="lessee" component={LesseeScreen} />
              <StackNavigator.Screen name="lesser" component={LesserScreen} />
              <StackNavigator.Screen
                name="jobdetail"
                component={JobDetailScreen}
              />

              <StackNavigator.Screen
                name="confirmation"
                component={ConfirmationScreen}
              />
            </StackNavigator.Group>
          ) : (
            <StackNavigator.Group>
              <StackNavigator.Screen name="signup" component={SignupScreen} />
              <StackNavigator.Screen name="login" component={LoginScreen} />
            </StackNavigator.Group>
          )}
        </StackNavigator.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
};

export default AppNavigator;
