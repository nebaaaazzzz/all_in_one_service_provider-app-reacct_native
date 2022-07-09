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
import LesserScreen from "./screens/Lesser/LesserScreen";
import React, { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { BASEURI } from "./urls";
const StackNavigator = createStackNavigator();

const queryClient = new QueryClient();
export default function App() {
  const [token, setToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        fetch(`${BASEURI}/me`);
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
              {/* employer */}
              <StackNavigator.Screen name="home" component={HomeScreen} />
              <StackNavigator.Screen
                name="employer"
                component={EmployerScreen}
              />

              {/* employee */}
              <StackNavigator.Screen
                name="employee"
                component={EmployeeScreen}
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
              <StackNavigator.Screen name="login" component={LoginScreen} />
              <StackNavigator.Screen name="signup" component={SignupScreen} />
            </StackNavigator.Navigator>
          </NavigationContainer>
        </React.Suspense>
      </QueryClientProvider>
    </PaperProvider>
  );
}
