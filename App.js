import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import theme from "./assets/Theme";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import HomeScreen from "./screens/HomeScreen";
import Lessee from "./screens/Lessee";
import HomeDetailScreen from "./screens/HomeDetailScreen";
const DrawerNavigator = createDrawerNavigator();
const StackNavigator = createStackNavigator();
function Home() {
  return (
    <>
      <View>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </>
  );
}
function Drawer() {
  return (
    <DrawerNavigator.Navigator>
      <DrawerNavigator.Screen name="Login" component={LoginScreen} />
    </DrawerNavigator.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider
      theme={theme}
      settings={{
        icon: (props) => <MaterialCommunityIcons {...props} />,
      }}
    >
      <NavigationContainer>
        <StackNavigator.Navigator
          initialRouteName="home"
          screenOptions={{ headerShown: false }}
        >
          <StackNavigator.Screen
            name="homedetail"
            component={HomeDetailScreen}
          />
          <StackNavigator.Screen name="lessee" component={Lessee} />
          <StackNavigator.Screen name="home" component={HomeScreen} />
          <StackNavigator.Screen
            name="confirmation"
            component={ConfirmationScreen}
          />
          <StackNavigator.Screen name="login" component={LoginScreen} />
          <StackNavigator.Screen name="signup" component={SignupScreen} />
        </StackNavigator.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
