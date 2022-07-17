import {
  View,
  Text,
  StatusBar,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Searchbar } from "react-native-paper";
import React, { useState } from "react";
import FilterModal from "../../components/FilterModal";
import { Divider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import JobDetailScreen from "./JobDetailScreen";
import { BASEURI, BASETOKEN } from "../../urls";
import { useInfiniteQuery } from "react-query";
const fetchJobs = async ({ pageParam = 1 }) => {
  const response = await fetch(`${BASEURI}/employee/?page=${pageParam}`, {
    headers: {
      Authorization: `Bearer ${BASETOKEN}`,
    },
  });
  return await response.json();
};
const EmployeeStackNavigator = createStackNavigator();
const Jobs = ({ pressHandler, item }) => {
  const [bgColor, setBgColor] = useState(false);
  return (
    <View>
      {item.map((i, index) => {
        return (
          <>
            <Pressable
              onPress={() => {
                requestAnimationFrame(() => {
                  pressHandler(i._id);
                });
              }}
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
                style={{
                  marginVertical: 10,
                  fontSize: 12,
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                Hourly - Posted 1 hour ago
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <View>
                  <Text style={{ fontWeight: "bold" }}>
                    Less than 30 hrs/week
                  </Text>
                  <Text style={{ color: "rgba(0,0,0,0.6)" }}>Hours needed</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Expert</Text>
                  <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                    {" "}
                    Experience level
                  </Text>
                </View>
              </View>
              <Text
                ellipsizeMode="tail"
                numberOfLines={3}
                style={{ fontSize: 15, marginTop: 10 }}
              >
                Hello there, I am Vick, Me and my small team is working on a
                Fintech start-up in the consumer finance space (USA). We are an
                early-stage start-up working remotely, We just finished our MVP
                and preparing to automate a few things through simple and
                complex ML algorithms for our BETA. We have a clear goal and
                view about how our product should be.
              </Text>
              <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                3,869 kilometers away
              </Text>
            </Pressable>
            <Divider />
          </>
        );
      })}
    </View>
  );
};

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = () => {};
  const [visible, setVisible] = React.useState(false);
  const [indexS, setIndex] = useState(0);
  const showModal = () => setVisible(true);
  const onPressHandler = (id) => {
    requestAnimationFrame(() => {
      navigation.navigate("employee/jobdetail", {
        id,
      });
    });
  };
  // require('./assets/images/girl.jpg'),          // Local image
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("myjobd", fetchJobs, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length) {
        return pages.length + 1;
      }
      return;
    },
  });
  const list = [
    "All",
    "Grapics & Design",
    "Sells & Markating",
    "Writing & Translation",
    "Video & Animation",
    "Finance & Accounting",
    "Engineering & Architecture",
    "Admin & Customer support",
    "Music & Audio",
    "Programming & Tech",
    "Business",
    "LifeStyle",
    "Legal",
  ];
  if (status === "loading") {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={"#0244d0"}></ActivityIndicator>
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
    <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <FilterModal visible={visible} setVisible={setVisible} />

      <Searchbar
        style={{ marginHorizontal: 10, borderRadius: 20 }}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={list}
          style={{ paddingTop: 10 }}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={() => setIndex(index)}
                style={{
                  marginHorizontal: 10,
                  borderBottomColor: "#3498db",
                  borderBottomWidth: indexS == index ? 2 : 0,
                }}
              >
                <Text style={{ color: "#0244d0" }}>{item}</Text>
              </Pressable>
            );
          }}
        ></FlatList>
      </View>
      <FlatList
        style={{ marginTop: 20 }}
        showsVerticalScrollIndicator={false}
        data={data.pages}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
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
        renderItem={({ item }) => {
          return <Jobs pressHandler={onPressHandler} item={item} />;
        }}
      ></FlatList>
    </View>
  );
};
function EmployeeScreen() {
  return (
    <EmployeeStackNavigator.Navigator>
      <EmployeeStackNavigator.Screen
        options={{ headerShown: false }}
        name="employee/home"
        component={Home}
      />
      <EmployeeStackNavigator.Screen
        name="employee/jobdetail"
        options={{ title: "Job Detail" }}
        component={JobDetailScreen}
      />
    </EmployeeStackNavigator.Navigator>
  );
}
export default EmployeeScreen;
