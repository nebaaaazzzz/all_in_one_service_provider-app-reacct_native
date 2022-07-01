import { View, Text, StatusBar, Pressable, FlatList } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import FilterModal from "../../components/FilterModal";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Divider } from "react-native-paper";
import JobDetailEditScreen from "./JobDetailEditScreen";
import ReviewScreen from "./PostJob/ReviewScreen";
import PostJobScreen from "./PostJob/PostJobScreen";
const Tab = createMaterialTopTabNavigator();
const EmployerStackNavigator = createStackNavigator();
const Post = ({ pressHandler }) => {
  const [bgColor, setBgColor] = useState(false);
  return (
    <>
      <Pressable
        onPress={() => pressHandler("id")}
        onPressIn={() => setBgColor(true)}
        onPressOut={() => setBgColor(false)}
        style={{
          padding: 15,
          backgroundColor: bgColor ? "rgba(0,0,0,0.05)" : "transparent",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          AI ML cunsultant for a financial start-up
        </Text>
        <Text
          style={{ marginVertical: 10, fontSize: 12, color: "rgba(0,0,0,0.6)" }}
        >
          Hourly - Posted 1 hour ago
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold" }}>Less than 30 hrs/week</Text>
            <Text style={{ color: "rgba(0,0,0,0.6)" }}>Hours needed</Text>
          </View>
          <View style={{}}>
            <Text style={{ fontWeight: "bold" }}>Expert</Text>
            <Text style={{ color: "rgba(0,0,0,0.6)" }}> Experience level</Text>
          </View>
        </View>
        <Text
          ellipsizeMode="tail"
          numberOfLines={3}
          style={{ fontSize: 15, marginTop: 10 }}
        >
          Hello there, I am Vick, Me and my small team is working on a Fintech
          start-up in the consumer finance space (USA). We are an early-stage
          start-up working remotely, We just finished our MVP and preparing to
          automate a few things through simple and complex ML algorithms for our
          BETA. We have a clear goal and view about how our product should be.
        </Text>
        <Text style={{ color: "rgba(0,0,0,0.6)" }}>3,869 kilometers away</Text>
      </Pressable>
      <Divider />
    </>
  );
};

{
  /*
      steps to post a job
      <StackNavigator.Screen name="headline" component={HeadlineScreen} /> 
      <StackNavigator.Screen
      name="skillsrequired"
      component={SkillsRequiredScreen}
      <StackNavigator.Screen name="scope" component={ScopeScreen} />
      <StackNavigator.Screen name="category" component={CategoryScreen} />
      <StackNavigator.Screen name="payment" component={PaymentScreen} />
      <StackNavigator.Screen name="review" component={ReviewScreen} />
      />
      */
}

const MyPosts = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [indexS, setIndex] = useState(0);
  const showModal = () => setVisible(true);
  // require('./assets/images/girl.jpg'),          // Local image
  const pressHandler = (id) => {
    requestAnimationFrame(() => {
      navigation.navigate("employer/jobdetail");
    });
  };
  const list = Array(10);
  return (
    <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <FilterModal visible={visible} setVisible={setVisible} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={list}
        renderItem={() => {
          return <Post pressHandler={pressHandler} />;
        }}
      ></FlatList>
    </View>
  );
};
function SettingsScreen() {
  return <Text>hello</Text>;
}
function Home({ navigation }) {
  return (
    <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <View style={{ alignItems: "flex-end", backgroundColor: "#fff" }}>
        <Pressable
          onPress={() => {
            requestAnimationFrame(() => {
              navigation.navigate("employer/postjob");
            });
          }}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            backgroundColor: "green",
            marginHorizontal: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text style={{ color: "#fff" }}> Post Job</Text>
        </Pressable>
      </View>

      <Tab.Navigator>
        <Tab.Screen
          name="employer/myposts"
          options={{ title: "My Posts" }}
          component={MyPosts}
        />
        <Tab.Screen name="employer/ettings" component={SettingsScreen} />
      </Tab.Navigator>
    </View>
  );
}
const EmployerScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <EmployerStackNavigator.Navigator>
        <EmployerStackNavigator.Screen
          options={{ headerShown: false }}
          name="employer/"
          component={Home}
        />
        <EmployerStackNavigator.Screen
          name="employer/jobdetail"
          options={{
            title: "Job Detail",
          }}
          component={JobDetailEditScreen}
        />
        <EmployerStackNavigator.Screen
          options={{ headerShown: false }}
          name="employer/postjob"
          component={PostJobScreen}
        />
        <EmployerStackNavigator.Screen
          options={{ title: "Edit Post" }}
          name="employer/review"
          component={ReviewScreen}
        />
      </EmployerStackNavigator.Navigator>
    </View>
  );
};

export default EmployerScreen;
