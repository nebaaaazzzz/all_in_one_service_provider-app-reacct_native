import {
  View,
  Text,
  StatusBar,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import FilterModal from "../../components/FilterModal";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Divider } from "react-native-paper";
import JobDetailEditScreen from "./JobDetailEditScreen";
import ReviewScreen from "./PostJob/ReviewScreen";
import PostJobScreen from "./PostJob/PostJobScreen";
import fromNow from "../../utils/time";
import { useInfiniteQuery } from "react-query";
import { BASEURI, BASETOKEN } from "../../urls";
const Tab = createMaterialTopTabNavigator();
const EmployerStackNavigator = createStackNavigator();
const fetchJobs = async ({ pageParam = 1 }) => {
  const response = await fetch(`${BASEURI}/employer/posts?page=${pageParam}`, {
    headers: {
      Authorization: `Bearer ${BASETOKEN}`,
    },
  });
  return await response.json();
};
var aDay = 24 * 60 * 60 * 1000;
const Post = ({ pressHandler, item }) => {
  const [bgColor, setBgColor] = useState(false);
  return (
    <View>
      {item.map((i, index) => {
        const ms = new Date(i.createdAt).getTime();
        return (
          <Pressable
            key={index + 1}
            onPress={() => pressHandler(i._id)}
            style={{
              padding: 15,
              backgroundColor: bgColor ? "rgba(0,0,0,0.05)" : "transparent",
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
          </Pressable>
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
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }
  if (status === "error") {
    navigation.reset({
      index: 1,
      routes: [{ name: "error", params: { error } }],
    });

    return <View></View>;
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
            return <ActivityIndicator></ActivityIndicator>;
          }
          if (!hasNextPage) {
            <Text>Nothing more to load</Text>;
          }
          return null;
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
            borderRadius: 10,
            backgroundColor: "#0244d0",
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
