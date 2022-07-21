import {
  View,
  Text,
  StatusBar,
  Pressable,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import FilterModal from "../../components/FilterModal";
import { Divider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import JobDetailScreen from "./JobDetailScreen";
import { BASEURI, BASETOKEN } from "../../urls";
import { useInfiniteQuery, useQueryClient } from "react-query";
import fromNow from "../../utils/time";

import { useIsFocused } from "@react-navigation/native";
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
  return (
    <View>
      {item.map((i, index) => {
        return (
          <Pressable
            key={index + 1}
            onPress={() => pressHandler(i._id)}
            style={{
              padding: 15,
              backgroundColor: "transparent",
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

const Home = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [indexS, setIndex] = useState(0);
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
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("jobs", fetchJobs, {
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
    queryClient.invalidateQueries("jobs");
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
    <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <FilterModal visible={visible} setVisible={setVisible} />
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
function AppliedScreen() {
  return (
    <EmployeeStackNavigator.Navigator>
      <EmployeeStackNavigator.Screen
        options={{ headerShown: false }}
        name="employee/applied/"
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
export default AppliedScreen;
