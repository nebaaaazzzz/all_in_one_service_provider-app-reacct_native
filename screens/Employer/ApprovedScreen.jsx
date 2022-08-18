import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useEffect } from "react";
import FilterModal from "../../components/FilterModal";
import { BASETOKEN, BASEURI } from "../../urls";
import { useInfiniteQuery } from "react-query";
import { createStackNavigator } from "@react-navigation/stack";
import { useIsFocused } from "@react-navigation/native";
import { useQueryClient } from "react-query";
import UserDetailScreen from "./UserDetailScreen";
import { Divider } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";

const EmployerStackNavigator = createStackNavigator();

const fetchApproved = async ({ pageParam = 1, queryKey }) => {
  const response = await fetch(
    `${BASEURI}/employer/approved/${queryKey[1]}?page=${pageParam}`,
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

const Users = ({ item, pressHandler }) => {
  const { t } = useTranslation();
  return (
    <View>
      {item.map((i, index) => {
        return (
          <TouchableOpacity key={index + 1} onPress={() => pressHandler(i._id)}>
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
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Employer = ({ navigation, route }) => {
  const { t } = useTranslation();
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
  } = useInfiniteQuery(["jobapproved", route.params.id], fetchApproved, {
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
    navigation.navigate("employer/approved/userdetail", {
      id,
      jobId: route.params.id,
    });
  }
  const isFocused = useIsFocused();
  useEffect(() => {
    queryClient.invalidateQueries(["jobapproved", route.params.id]);
  }, [isFocused]);
  const queryClient = useQueryClient();
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
    //   routes: [{ name: "error", params: { error } }],
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
            return <ActivityIndicator color={"#0244d0"}></ActivityIndicator>;
          }
          if (!hasNextPage) {
            return <Text style={{ textAlign: "center" }}>{t("no")}</Text>;
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

const ApprovedScreen = ({ route }) => {
  const { t } = useTranslation();
  return (
    <EmployerStackNavigator.Navigator>
      <EmployerStackNavigator.Screen
        initialParams={{ id: route.params.id }}
        options={{
          title: t("Approved"),
          headerTitleContainerStyle: { textAlign: "center" },
        }}
        name="employer/approved/"
        component={Employer}
      />
      <EmployerStackNavigator.Screen
        options={{ title: t("det") }}
        name="employer/approved/userdetail"
        component={UserDetailScreen}
      />
    </EmployerStackNavigator.Navigator>
  );
};
export default ApprovedScreen;
