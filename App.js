import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "./assets/Theme";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import HomeScreen from "./screens/HomeScreen";
import HomeDetailScreen from "./screens/HomeDetailScreen";
import EmployeeScreen from "./screens/Employee/EmployeeScreen";
import JobDetailScreen from "./screens/Employee/JobDetailScreen";
import EmployerScreen from "./screens/Employer/EmployerScreen";
import LesseeScreen from "./screens/Lessee/LesseeScreen";
import { useInfiniteQuery } from "react-query";

import LesserScreen from "./screens/Lesser/LesserScreen";
import React, { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { BASEURI } from "./urls";
const StackNavigator = createStackNavigator();

const queryClient = new QueryClient();
export default function App() {
  const [user, setUser] = React.useState(null);
  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        fetch(`${BASEURI}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setUser(res);
          })
          .catch((err) => {
            throw err;
          });
      }
    })();
  }, []);
  return (
    <PaperProvider
      theme={theme}
      settings={{
        icon: (props) => <MaterialCommunityIcons {...props} />,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <React.Suspense fallback={"...loading"}>
          <NavigationContainer>
            <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
              {user ? (
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
                  <StackNavigator.Screen
                    name="lessee"
                    component={LesseeScreen}
                  />
                  <StackNavigator.Screen
                    name="lesser"
                    component={LesserScreen}
                  />
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
                  <StackNavigator.Screen
                    name="signup"
                    component={SignupScreen}
                  />
                  <StackNavigator.Screen name="login" component={LoginScreen} />
                </StackNavigator.Group>
              )}
            </StackNavigator.Navigator>
          </NavigationContainer>
        </React.Suspense>
      </QueryClientProvider>
    </PaperProvider>
  );
}
