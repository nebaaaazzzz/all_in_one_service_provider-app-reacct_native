import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
// import "./i18n/i18n";
import i18n from "./../i18n/";
import React, { useState } from "react";
import styled from "styled-components/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
const DrawerNavigator = createDrawerNavigator();
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileScreen from "./Common/ProfileScreen";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AboutScreen from "./Common/AboutScreen";
import FeedbackScreen from "./Common/FeedbackScreen";
import Entypo from "@expo/vector-icons/Entypo";
import CustomDrawer from "../components/CustomDrawer";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ContactusScreen from "./Common/ContactusScreen";
import { List } from "react-native-paper";
/*language translation */
import "./../i18n";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

/**/
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
  const [expanded, setExpanded] = React.useState(true);
  const { t } = useTranslation();

  const handlePress = () => setExpanded(!expanded);
  return (
    <View
      style={{
        justifyContent: "center",
        flex: 1,
        martinTop: StatusBar.currentHeight,
        backgroundColor: "#0244d0",
      }}
    >
      <View
        style={{
          marginTop: dimen.height / 3.1,
          flex: 1,
          paddingTop: "10%",
          backgroundColor: "#fff",
          borderTopLeftRadius: 100,
        }}
      >
        <View
          style={{
            position: "absolute",
            width: dimen.height / 10,
            height: dimen.height / 10,
            backgroundColor: "#0244d0",
            right: 0,
            borderBottomRightRadius: 40,
            // borderBoRadius: 100,
            // borderRadius: 100,
            top: -dimen.height / 10,
            zIndex: 3,
          }}
        ></View>
        <View
          style={{
            position: "absolute",
            width: dimen.height / 10,
            height: dimen.height / 10,
            backgroundColor: "#fff",
            right: -6,
            top: -dimen.height / 10,
          }}
        ></View>
        <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}>
          {t("co")} ...
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
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

            <SText>{t("em")}</SText>
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

            <SText>{t("emp")}</SText>
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

            <SText>{t("les")}</SText>
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

            <SText>{t("lessor")}</SText>
          </STouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  const [expanded, setExpanded] = React.useState(false);
  const { t } = useTranslation();
  const handlePress = () => setExpanded(!expanded);
  const [currentLanguage, setLanguage] = useState("en");

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch((err) => console.log(err));
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
          headerStyle: {
            elevation: 0,
          },
          headerTitle: "",
          title: t("Home"),
          headerStyle: {
            backgroundColor: "#0244d0",
            elevation: 0,
          },
          headerRight: () => {
            return (
              <View
                style={{
                  alignItems: "flex-end",
                  // marginRight: 20,
                  top: "-5%",
                  zIndex: 9999,
                  right: 0,
                  position: "absolute",
                }}
              >
                <List.Accordion
                  expanded={expanded}
                  onPress={() => {
                    setExpanded(!expanded);
                  }}
                  style={{ backgroundColor: "#0244d0", width: 100, opacity: 1 }}
                  right={(props) => (
                    <FontAwesome name="language" color="#fff" size={30} />
                  )}
                  // right={(props) => <></>}
                >
                  <List.Item
                    onPress={() => {
                      setExpanded(false);
                      changeLanguage("am");
                    }}
                    title="አማርኛ"
                    style={{ margin: 0, padding: 0 }}
                    titleStyle={{ color: "#fff" }}
                  />
                  <List.Item
                    onPress={() => {
                      setExpanded(false);
                      changeLanguage("en");
                    }}
                    style={{ margin: 0, padding: 0 }}
                    title="English"
                    titleStyle={{ color: "#fff" }}
                  />
                </List.Accordion>
              </View>
            );
          },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          drawerIcon: ({ color }) => (
            <Entypo name="home" size={22} color={"#0244d0"} />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name={t("profile")}
        component={ProfileScreen}
        options={({ route }) => {
          const bool = getFocusedRouteNameFromRoute(route) == "profile/edit";
          return {
            headerShown: bool ? false : true,
            headerStyle: {
              elevation: 0,
            },
            drawerIcon: ({ color }) => (
              <Ionicons name="person-outline" size={22} color={"#0244d0"} />
            ),
          };
        }}
      />

      <DrawerNavigator.Screen
        name={t("About")}
        component={AboutScreen}
        options={{
          headerStyle: {
            elevation: 0,
          },
          drawerIcon: ({ color }) => (
            <AntDesign name="infocirlceo" size={22} color={"#0244d0"} />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name={t("contact")}
        component={ContactusScreen}
        options={{
          headerStyle: {
            elevation: 0,
          },
          drawerIcon: ({ color }) => (
            <MaterialIcons name="contact-page" size={22} color={"#0244d0"} />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name={t("Feed")}
        component={FeedbackScreen}
        options={{
          headerStyle: {
            elevation: 0,
          },
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
