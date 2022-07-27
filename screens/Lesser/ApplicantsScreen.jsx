import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React from "react";
import FilterModal from "../../components/FilterModal";
import { BASETOKEN, BASEURI } from "../../urls";
import { useInfiniteQuery } from "react-query";
import { createStackNavigator } from "@react-navigation/stack";
import { useIsFocused } from "@react-navigation/native";
import { Divider } from "react-native-paper";
import { useQueryClient } from "react-query";
import UserDetailScreen from "./UserDetailScreen";
const LesserStackNavigator = createStackNavigator();
const fetchApplicant = async ({ pageParam = 1, queryKey }) => {
  const response = await fetch(
    `${BASEURI}/lesser/applicants/${queryKey[1]}?page=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer ${BASETOKEN}`,
      },
    }
  );
  return await response.json();
};

const Users = ({ item, pressHandler }) => {
  return (
    <View>
      {item.map((i, index) => {
        return (
          <Pressable key={index + 1} onPress={() => pressHandler(i._id)}>
            <Divider
              style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.5)" }}
            />

            <View
              style={{
                paddingVertical: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 50, height: 50, borderRadius: 30 }}
                source={{
                  uri: `${BASEURI}/profile-pic/${i.profilePic}`,
                  // uri: `${BASEURI}/profile-pic/${userContext.profilePic}`,
                  headers: {
                    Authorization: `Bearer ${BASETOKEN}`,
                  },
                }}
              />
              <Text>
                {i.firstName} {i.lastName}
              </Text>
            </View>
            <Divider
              style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.5)" }}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const Lessee = ({ navigation, route }) => {
  const [visible, setVisible] = React.useState(false);
  // require('./assets/images/girl.jpg'),          // Local image

  navigation.setOptions({
    headerShown: true,
  });
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["houseapplicants", route.params.id], fetchApplicant, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length) {
        return pages.length + 1;
      }
      return;
    },
  });

  function pressHandler(id) {
    navigation.setOptions({
      headerShown: false,
    });
    navigation.navigate("lesser/applicants/userdetail", {
      id,
      houseId: route.params.id,
    });
  }
  const isFocused = useIsFocused();
  const queryClient = useQueryClient();
  if (!isFocused) {
    queryClient.invalidateQueries("houseapplicants");
  }
  if (status === "loading") {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={"#0244d0"}></ActivityIndicator>
      </View>
    );
  }
  if (status === "error") {
    // navigation.reset({
    //   index: 1,
    //   routes: [{ name: "error", params: { error } }],houseapplicants
    // });
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }

  return (
    <View style={{ flex: 1 }}>
      <FilterModal visible={visible} setVisible={setVisible} />
      <FlatList
        style={{ marginTop: 20 }}
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
            return (
              <Text style={{ textAlign: "center" }}>
                Nothing more to load ....
              </Text>
            );
          }
          return null;
        }}
        renderItem={({ item }) => {
          return <Users item={item} pressHandler={pressHandler} />;
        }}
      ></FlatList>
    </View>
  );
};

const ApplicantsScreen = ({ route }) => {
  return (
    <LesserStackNavigator.Navigator>
      <LesserStackNavigator.Screen
        initialParams={{ id: route.params.id }}
        options={{
          title: "Applicants",
          headerTitleContainerStyle: { textAlign: "center" },
        }}
        name="lesser/applicants/"
        component={Lessee}
      />
      <LesserStackNavigator.Screen
        options={{ title: "detail" }}
        name="lesser/applicants/userdetail"
        component={UserDetailScreen}
      />
    </LesserStackNavigator.Navigator>
  );
};
export default ApplicantsScreen;
