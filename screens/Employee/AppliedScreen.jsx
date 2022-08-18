import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
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
import { useInfiniteQuery, useQueryClient } from "react-query";
import fromNow from "../../utils/time";
import * as SecureStore from "expo-secure-store";

const ApplyTabNavigator = createMaterialTopTabNavigator();
import { useIsFocused } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ApprovedScreen from "./ApprovedScreen";
import RejectedScreen from "./RejectedScreen";
import { useTranslation } from "react-i18next";
const fetchJobs = async ({ pageParam = 1 }) => {
  let token = await SecureStore.getItemAsync("token");
  const response = await fetch(
    `${BASEURI}/employee/applied/?page=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer ${BASETOKEN || token}`,
      },
    }
  );
  return await response.json();
};
const EmployeeStackNavigator = createStackNavigator();
const Jobs = ({ pressHandler, item }) => {
  return (
    <View>
      {item.map((i, index) => {
        return (
          <TouchableOpacity
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
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Home = ({ navigation }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(false);
  const onPressHandler = (id) => {
    requestAnimationFrame(() => {
      navigation.navigate("employee/applied/jobdetail", {
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
  } = useInfiniteQuery("appliedjobs", fetchJobs, {
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
        showsVerticalScrollIndicator={false}
        data={data.pages}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        ListFooterComponent={() => {
          if (isFetchingNextPage) {
            return <ActivityIndicator color={"#0244d0"}></ActivityIndicator>;
          }
          if (!hasNextPage) {
            return <Text style={{ textAlign: "center" }}>{t("no")}</Text>;
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
const ApplyNavigation = () => {
  const { t } = useTranslation();
  return (
    <ApplyTabNavigator.Navigator>
      <ApplyTabNavigator.Screen
        options={{ title: t("pending") }}
        name="employee/applied/home/"
        component={Home}
      />
      <ApplyTabNavigator.Screen
        options={{ title: t("approved") }}
        name="employee/applied/approved"
        component={ApprovedScreen}
      />
      <ApplyTabNavigator.Screen
        options={{ title: t("rejected") }}
        name="employee/applied/rejected"
        component={RejectedScreen}
      />
    </ApplyTabNavigator.Navigator>
  );
};
function AppliedScreen() {
  const { t } = useTranslation();
  return (
    <EmployeeStackNavigator.Navigator>
      <EmployeeStackNavigator.Screen
        options={{ title: t("applied") }}
        name="employee/applied/home"
        component={ApplyNavigation}
      />
      <EmployeeStackNavigator.Screen
        name="employee/applied/jobdetail"
        options={{ title: t("job") }}
        component={JobDetailScreen}
      />
    </EmployeeStackNavigator.Navigator>
  );
}
export default AppliedScreen;
