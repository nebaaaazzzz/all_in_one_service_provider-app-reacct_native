import {
  View,
  ActivityIndicator,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from "react-native";
import React, { useContext, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import PostHouseScreen from "./PostHouse/PostHouseScreen";
import HomeDetailScreen from "./HomeDetailScreen";
import ApplicantsScreen from "./ApplicantsScreen";
import ApprovedScreen from "./ApprovedScreen";
import PaymentScreen from "../Common/PaymentScreen";
import RejectedScreen from "./RejectedScreen";
const LesserTopTabNavigator = createMaterialTopTabNavigator();
const LesserStackNavigator = createStackNavigator();
import { useInfiniteQuery, useQueryClient } from "react-query";
import { BASETOKEN, BASEURI } from "./../../urls";
import ViewImagesScreen from "./ViewImagesScreen";
import { useIsFocused } from "@react-navigation/native";
import { UserContext } from "../../App.Navigator";
const fetchHouses = async ({ pageParam = 1 }) => {
  const response = await fetch(`${BASEURI}/lesser/posts?page=${pageParam}`, {
    headers: {
      Authorization: `Bearer ${BASETOKEN}`,
    },
  });
  return await response.json();
};

const MyPosts = ({ navigation }) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("myhouses", fetchHouses, {
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
    queryClient.invalidateQueries("myhouses");
  }
  // require('./assets/images/girl.jpg'),          // Local image
  function pressHandler(id) {
    navigation.navigate("lesser/housedetail", {
      id,
    });
  }
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
      <FlatList
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        style={{ marginTop: 20 }}
        data={data.pages}
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

const Home = ({ navigation }) => {
  const user = useContext(UserContext);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "flex-end", backgroundColor: "#fff" }}>
        {user?.left > 0 ? (
          <TouchableOpacity
            onPress={() => {
              requestAnimationFrame(() => {
                navigation.navigate("lesser/posthouse");
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
            <Text style={{ color: "#fff" }}> Post House</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              requestAnimationFrame(() => {
                navigation.navigate("lesser/payment");
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
            <Text style={{ color: "#fff" }}> pay</Text>
          </TouchableOpacity>
        )}
      </View>
      <LesserTopTabNavigator.Navigator>
        <LesserTopTabNavigator.Screen
          options={{ title: "My Posts" }}
          name="lesser/myposts"
          component={MyPosts}
        />
      </LesserTopTabNavigator.Navigator>
    </View>
  );
};
const LesserScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <LesserStackNavigator.Navigator>
        <LesserStackNavigator.Screen
          options={{ headerShown: false }}
          name="lesser/"
          component={Home}
        />
        <LesserStackNavigator.Screen
          options={{ headerShown: false }}
          name="lesser/posthouse"
          component={PostHouseScreen}
        />

        <LesserStackNavigator.Screen
          options={{ title: "House Detail" }}
          name="lesser/housedetail"
          component={HomeDetailScreen}
        />
        <LesserStackNavigator.Screen
          options={{ title: "House Detail" }}
          name="lesser/viewimages"
          component={ViewImagesScreen}
        />
        <LesserStackNavigator.Screen
          options={{ headerShown: false }}
          name="lesser/applicants"
          component={ApplicantsScreen}
        />
        <LesserStackNavigator.Screen
          options={{ headerShown: false }}
          name="lesser/approved"
          component={ApprovedScreen}
        />
        <LesserStackNavigator.Screen
          options={{ headerShown: false }}
          name="lesser/rejected"
          component={RejectedScreen}
        />
        <LesserStackNavigator.Screen
          options={{ headerShown: false }}
          option={{ title: "detail" }}
          name="lesser/payment"
          component={PaymentScreen}
        />
      </LesserStackNavigator.Navigator>
    </View>
  );
};

// const images = [
//   "https://source.unsplash.com/1024x768/?home",
//   "https://source.unsplash.com/1024x768/?water",
//   "https://source.unsplash.com/1024x768/?nature",
//   "https://source.unsplash.com/1024x768/?tree", // Network image
// ];
const Post = ({ item, pressHandler }) => {
  const [bgColor, setBgColor] = useState(false);
  return (
    <View>
      {item.map((i, index) => {
        return (
          <TouchableOpacity
            key={index + 1}
            onPress={() => {
              setBgColor(true);
              pressHandler(i._id);
            }}
            style={{
              paddingVertical: 15,
              backgroundColor: bgColor ? "rgba(0,0,0,0.02)" : "transparent",
            }}
          >
            <Image
              source={{
                uri: `${BASEURI}/house/image/${i.houseImages[0]}`,
                headers: {
                  Authorization: `Bearer ${BASETOKEN}`,
                },
              }}
              style={{ width: "100%", height: 200, resizeMode: "cover" }}
            />
            <View style={{ marginHorizontal: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {i.placeName}
                </Text>
              </View>

              <Text style={{ color: "rgba(0,0,0,0.6)" }}>{i.price} birr</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default LesserScreen;
