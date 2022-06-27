import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import theme from "./assets/Theme";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import HomeScreen from "./screens/HomeScreen";
import Lessee from "./screens/Lesse/LesseeScreen";
import HomeDetailScreen from "./screens/HomeDetailScreen";
import EmployeeScreen from "./screens/Employee/EmployeeScreen";
import JobDetailScreen from "./screens/Employee/JobDetailScreen";
import EmployerScreen from "./screens/Employer/EmployerScreen";
import HeadlineScreen from "./screens/Employer/PostJob/HeadlineScreen";
import SkillsRequiredScreen from "./screens/Employer/PostJob/SkillsRequiredScreen";
import ScopeScreen from "./screens/Employer/PostJob/ScopeScreen";
import PaymentScreen from "./screens/Employer/PostJob/PaymentScreen";
import ReviewScreen from "./screens/Employer/PostJob/ReviewScreen";

const StackNavigator = createStackNavigator();

export default function App() {
  return (
    <PaperProvider
      theme={theme}
      settings={{
        icon: (props) => <MaterialCommunityIcons {...props} />,
      }}
    >
      <NavigationContainer>
        <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
          {/* employer */}
          <StackNavigator.Screen name="review" component={ReviewScreen} />
          <StackNavigator.Screen name="payment" component={PaymentScreen} />
          <StackNavigator.Screen name="scope" component={ScopeScreen} />
          <StackNavigator.Screen
            name="skillsrequired"
            component={SkillsRequiredScreen}
          />
          <StackNavigator.Screen name="headline" component={HeadlineScreen} />
          <StackNavigator.Screen name="employer" component={EmployerScreen} />

          {/* employee */}
          <StackNavigator.Screen name="employee" component={EmployeeScreen} />
          <StackNavigator.Screen name="jobdetail" component={JobDetailScreen} />
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
