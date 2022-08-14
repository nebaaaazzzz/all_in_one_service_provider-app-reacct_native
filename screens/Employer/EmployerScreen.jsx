import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import FilterModal from "../../components/FilterModal";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Divider } from "react-native-paper";
import JobDetailScreen from "./JobDetailScreen";
import ReviewScreen from "./PostJob/ReviewScreen";
import PostJobScreen from "./PostJob/PostJobScreen";
import fromNow from "../../utils/time";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { BASEURI, BASETOKEN } from "../../urls";
import { useIsFocused } from "@react-navigation/native";
import ApplicantsScreen from "./ApplicantsScreen";
import ApprovedScreen from "./ApprovedScreen";
import RejectedScreen from "./RejectedScreen";
import EditPostScreen from "./EditPostScreen";
import { UserContext } from "../../App.Navigator";
import * as SecureStore from "expo-secure-store";

import PaymentScreen from "../Common/PaymentScreen";
const Tab = createMaterialTopTabNavigator();
const EmployerStackNavigator = createStackNavigator();
const fetchJobs = async ({ pageParam = 1, nearBy }) => {
  const response = await fetch(
    `${BASEURI}/employer/posts?page=${pageParam}&nearby=${nearBy}`,
    {
      headers: {
        Authorization: `Bearer ${
          BASETOKEN || (await SecureStore.getItemAsync("token"))
        }`,
      },
    }
  );
  return await response.json();
};
const Post = ({ pressHandler, item }) => {
  return (
    <View>
      {item.map((i, index) => {
        return (
          <TouchableOpacity
            key={index + 1}
            onPress={() => pressHandler(i._id)}
            style={{
              padding: 15,
              backgroundColor: "rgba(0,0,0,0.03)",
              marginVertical: 5,
            }}
          >
            <Divider
              style={{
                marginBottom: 10,
                borderWidth: 0.17,
                borderColor: "rgba(0,0,0,.3)",
              }}
            />
            <Text style={{ fontSize: 18, fontWeight: "700" }}>{i.title}</Text>
            <Text
              style={{
                marginVertical: 10,
                fontSize: 12,
                color: "rgba(0,0,0,0.6)",
              }}
            >
              {/* Hourly - Posted {timeSince(new Date(ms - aDay))} */}
              {/* {fromNow((new Date(i.createdAt))} */}
              {fromNow(new Date(i.createdAt))}
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={3}
              style={{ fontSize: 15, marginTop: 10 }}
            >
              {i.description}
            </Text>
            <Text style={{ color: "rgba(0,0,0,0.6)" }}>{i.placeName}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MyPosts = ({ navigation }) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("myjobs", fetchJobs, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length) {
        return pages.length + 1;
      }
      return;
    },
  });
  const isFocused = useIsFocused();
  const queryClient = useQueryClient();
  if (!isFocused) {
    queryClient.invalidateQueries("myjobs");
  }
  const [visible, setVisible] = React.useState(false);
  // require('./assets/images/girl.jpg'),          // Local image
  const pressHandler = (id) => {
    requestAnimationFrame(() => {
      navigation.navigate("employer/jobdetail", {
        id,
      });
    });
  };

  if (status === "loading") {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={"#0244d0"}></ActivityIndicator>
      </View>
    );
  }
  if (status === "error") {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }
  return (
    <View style={{ flex: 1 }}>
      <FilterModal visible={visible} setVisible={setVisible} />

      <FlatList
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        data={data.pages}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <Post item={item} pressHandler={pressHandler} />;
        }}
        ListFooterComponent={() => {
          if (isFetchingNextPage) {
            return <ActivityIndicator color={"#0244d0"}></ActivityIndicator>;
          }
          if (!hasNextPage) {
            return (
              <Text style={{ textAlign: "center" }}>
                Nothing more to load ....
              </Text>
            );
          }
          return null;
        }}
      ></FlatList>
    </View>
  );
};

function Home({ navigation }) {
  const user = useContext(UserContext);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "flex-end", backgroundColor: "#fff" }}>
        {user?.left > 0 ? (
          <TouchableOpacity
            onPress={() => {
              if (user.suspended) {
                return ToastAndroid.show(
                  "your Account Hasbeen suspened",
                  ToastAndroid.LONG
                );
              }
              requestAnimationFrame(() => {
                navigation.navigate("employer/postjob");
                // navigation.navigate("lesser/payment");
              });
            }}
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              backgroundColor: "#0244d0",
              marginHorizontal: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Text style={{ color: "#fff" }}>Post Job </Text>
          </TouchableOpacity>
        ) : user.suspended ? (
          <Text
            style={{
              color: "#fff",
              backgroundColor: "red",
              borderRadius: 10,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            Suspended
          </Text>
        ) : (
          <TouchableOpacity
            onPress={() => {
              requestAnimationFrame(() => {
                navigation.navigate("employer/payment");
                // navigation.navigate("lesser/payment");
              });
            }}
            style={{
              backgroundColor: "#fff",
              backgroundColor: "#0244d0",
              borderRadius: 10,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Text style={{ color: "#fff" }}>Pay</Text>
          </TouchableOpacity>
        )}
      </View>

      <Tab.Navigator>
        <Tab.Screen
          name="employer/myposts"
          options={{ title: "My Posts" }}
          component={MyPosts}
        />
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
          component={JobDetailScreen}
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
        <EmployerStackNavigator.Screen
          options={{
            headerShown: false,
          }}
          name="employer/appicants"
          component={ApplicantsScreen}
        />
        <EmployerStackNavigator.Screen
          options={{
            headerShown: false,
          }}
          name="employer/approved"
          component={ApprovedScreen}
        />
        <EmployerStackNavigator.Screen
          options={{
            headerShown: false,
          }}
          name="employer/payment"
          component={PaymentScreen}
        />

        <EmployerStackNavigator.Screen
          options={{
            headerShown: false,
          }}
          name="employer/rejected"
          component={RejectedScreen}
        />
        <EmployerStackNavigator.Screen
          options={{
            headerShown: false,
          }}
          name="employer/editpost"
          component={EditPostScreen}
        />
      </EmployerStackNavigator.Navigator>
    </View>
  );
};

export default EmployerScreen;
