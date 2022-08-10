import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Linking,
} from "react-native";
import React, { useEffect } from "react";
import Svg, { Path } from "react-native-svg";
import styled from "styled-components/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
const DrawerNavigator = createDrawerNavigator();
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileScreen from "./Common/ProfileScreen";
import SettingsScreen from "./Common/SettingsScreen";
import AntDesign from "react-native-vector-icons/AntDesign";
import DatePicker from "@react-native-community/datetimepicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AboutScreen from "./Common/AboutScreen";
import FeedbackScreen from "./Common/FeedbackScreen";
import Entypo from "@expo/vector-icons/Entypo";
import CustomDrawer from "../components/CustomDrawer";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ContactusScreen from "./Common/ContactusScreen";
const STouchableOpacity = styled(TouchableOpacity)`
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #3498db;
  width: 35%;
  margin: 10px 10px;
`;

const SText = styled(Text)`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Home = ({ navigation }) => {
  const dimen = useWindowDimensions();
  return (
    <View
      style={{
        justifyContent: "center",
        flex: 1,
        martinTop: StatusBar.currentHeight,
        // backgroundColor: "#0244d0",
      }}
    >
      {/* <View style={{ height: "5%" }}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={dimen.width}
          // width={450}
          // height={450}
          height={dimen.height}
          viewBox={`0 0 ${dimen.width} ${dimen.height}`}
        >
          <Path
            id="Path_1"
            data-name="Path 1"
            d="M75.35-12.54H276.424C351.337-12.54,375-53.025,375-53.025V523.437H0V53.121C0,16.857,33.736-12.54,75.35-12.54Z"
            transform="translate(0 53.025)"
            fill="#fff"
          />
        </Svg>
      </View> */}
      <View style={{ paddingTop: "10%" }}>
        <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}>
          Continue as ...
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            bacgroundColor: "red",
            justifyContent: "center",
          }}
        >
          <STouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => {
              requestAnimationFrame(() => navigation.navigate("employee"));
            }}
          >
            {/* <Icon name="phone" style={{ textAlign: "center" }} size={35} /> */}
            <Image
              style={{
                height: 60,
                width: 100,
                resizeMode: "cover",
              }}
              source={require("./../assets/homescreenicons/employee.png")}
            />

            <SText>Employee</SText>
          </STouchableOpacity>
          <STouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => {
              requestAnimationFrame(() => navigation.navigate("employer"));
            }}
          >
            <Image
              style={{
                height: 60,
                width: 100,
                resizeMode: "contain",
              }}
              source={require("./../assets/homescreenicons/employer.png")}
            />

            <SText>Employer</SText>
          </STouchableOpacity>
          <STouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() =>
              requestAnimationFrame(() => navigation.navigate("lessee"))
            }
          >
            <Image
              style={{
                height: 60,
                width: 100,
                resizeMode: "contain",
              }}
              source={require("./../assets/homescreenicons/lessee.png")}
            />

            <SText>Lessee</SText>
          </STouchableOpacity>
          <STouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => {
              requestAnimationFrame(() => navigation.navigate("lesser"));
            }}
          >
            <Image
              style={{
                height: 60,
                width: 100,
                resizeMode: "contain",
              }}
              source={require("./../assets/homescreenicons/lesser.png")}
            />

            <SText>Lessor</SText>
          </STouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  const handleOpenURL = (url) => {
    // if (isSucceedPayment(url)) {
    //   console.log("hello");
    //   // your condition
    //   // handle success payment
    // } else {
    //   console.log("handle failure");
    //   // handle failure
    // }
    return;
  };

  return (
    <DrawerNavigator.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: "#0244d0",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}
    >
      {/* <Drawer.Screen
    name="Home"
    component={TabNavigator}
    options={{
      drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
      ),
    }}
  /> */}

      <DrawerNavigator.Screen
        name="home/"
        component={Home}
        options={{
          headerTitle: "",
          title: "Home",
          headerStyle: {
            backgroundColor: "#0244d0",
            elevation: 0,
          },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          drawerIcon: ({ color }) => (
            <Entypo name="home" size={22} color={"#0244d0"} />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => {
          const bool = getFocusedRouteNameFromRoute(route) == "profile/edit";
          return {
            headerShown: bool ? false : true,
            drawerIcon: ({ color }) => (
              <Ionicons name="person-outline" size={22} color={"#0244d0"} />
            ),
          };
        }}
      />

      <DrawerNavigator.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="infocirlceo" size={22} color={"#0244d0"} />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name="Contact us"
        component={ContactusScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="contact-page" size={22} color={"#0244d0"} />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name="FeedBack"
        component={FeedbackScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              size={22}
              color={"#0244d0"}
            />
          ),
        }}
      />
      {/* <DrawerNavigator.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      /> */}
    </DrawerNavigator.Navigator>
  );
};
export default HomeScreen;
