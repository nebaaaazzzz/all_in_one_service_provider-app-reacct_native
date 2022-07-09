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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View>
                <Text style={{ fontWeight: "bold" }}>
                  Less than 30 hrs/week
                </Text>
                <Text style={{ color: "rgba(0,0,0,0.6)" }}>Hours needed</Text>
              </View>
              <View style={{}}>
                <Text style={{ fontWeight: "bold" }}>
                  {i.experience?.title}
                </Text>
                <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                  Experience level
                </Text>
              </View>
            </View>
            <Text
              ellipsizeMode="tail"
              numberOfLines={3}
              style={{ fontSize: 15, marginTop: 10 }}
            >
              {i.description}
            </Text>
            <Text style={{ color: "rgba(0,0,0,0.6)" }}>
              3,869 kilometers away
            </Text>
          </Pressable>
        );
      })}

      <Divider />
    </View>
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
  return status === "loading" ? (
    <View style={{ marginTop: "50%" }}>
      <ActivityIndicator></ActivityIndicator>
    </View>
  ) : status === "error" ? (
    <Text>Error: {error.message}</Text>
  ) : (
    <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
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

function fromNow(date) {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;
  const units = [
    {
      max: 30 * SECOND,
      divisor: 1,
      past1: "just now",
      pastN: "just now",
      future1: "just now",
      futureN: "just now",
    },
    {
      max: MINUTE,
      divisor: SECOND,
      past1: "a second ago",
      pastN: "# seconds ago",
      future1: "in a second",
      futureN: "in # seconds",
    },
    {
      max: HOUR,
      divisor: MINUTE,
      past1: "a minute ago",
      pastN: "# minutes ago",
      future1: "in a minute",
      futureN: "in # minutes",
    },
    {
      max: DAY,
      divisor: HOUR,
      past1: "an hour ago",
      pastN: "# hours ago",
      future1: "in an hour",
      futureN: "in # hours",
    },
    {
      max: WEEK,
      divisor: DAY,
      past1: "yesterday",
      pastN: "# days ago",
      future1: "tomorrow",
      futureN: "in # days",
    },
    {
      max: 4 * WEEK,
      divisor: WEEK,
      past1: "last week",
      pastN: "# weeks ago",
      future1: "in a week",
      futureN: "in # weeks",
    },
    {
      max: YEAR,
      divisor: MONTH,
      past1: "last month",
      pastN: "# months ago",
      future1: "in a month",
      futureN: "in # months",
    },
    {
      max: 100 * YEAR,
      divisor: YEAR,
      past1: "last year",
      pastN: "# years ago",
      future1: "in a year",
      futureN: "in # years",
    },
    {
      max: 1000 * YEAR,
      divisor: 100 * YEAR,
      past1: "last century",
      pastN: "# centuries ago",
      future1: "in a century",
      futureN: "in # centuries",
    },
    {
      max: Infinity,
      divisor: 1000 * YEAR,
      past1: "last millennium",
      pastN: "# millennia ago",
      future1: "in a millennium",
      futureN: "in # millennia",
    },
  ];
  const diff =
    Date.now() - (typeof date === "object" ? date : new Date(date)).getTime();
  const diffAbs = Math.abs(diff);
  for (const unit of units) {
    if (diffAbs < unit.max) {
      const isFuture = diff < 0;
      const x = Math.round(Math.abs(diff) / unit.divisor);
      if (x <= 1) return isFuture ? unit.future1 : unit.past1;
      return (isFuture ? unit.futureN : unit.pastN).replace("#", x);
    }
  }
}
export default EmployerScreen;
