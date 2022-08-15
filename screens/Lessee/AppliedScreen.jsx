import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import FilterModal from "../../components/FilterModal";
import { BASETOKEN, BASEURI } from "../../urls";
import { useInfiniteQuery } from "react-query";
import { createStackNavigator } from "@react-navigation/stack";
import HomeDetailScreen from "./HomeDetailScreen";
import RejectedScreen from "./RejectedScreen";
import ApprovedScreen from "./ApprovedScreen";
import { useIsFocused } from "@react-navigation/native";
import { useQueryClient } from "react-query";
import ViewImagesScreen from "./ViewImagesScreen";
import fromNow from "../../utils/time";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const LesseeStackNavigator = createStackNavigator();
const AppliedTabNavigator = createMaterialTopTabNavigator();
const fetchHouses = async ({ pageParam = 1 }) => {
  const response = await fetch(`${BASEURI}/lessee/applied/?page=${pageParam}`, {
    headers: {
      Authorization: `Bearer ${
        BASETOKEN || (await SecureStore.getItemAsync("token"))
      }`,
    },
  });
  return await response.json();
};

const Home = ({ item, pressHandler }) => {
  const { t } = useTranslation();
  const [bgColor, setBgColor] = useState(false);
  return (
    <View>
      {item.map((i, index) => {
        return (
          <TouchableOpacity
            onPress={() => pressHandler(i._id)}
            key={index + 1}
            onPressIn={() => setBgColor(true)}
            onPressOut={() => setBgColor(false)}
            style={{
              paddingVertical: 15,
              backgroundColor: bgColor ? "rgba(0,0,0,0.05)" : "transparent",
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
                <Text>{fromNow(new Date(i.createdAt))}</Text>

                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {i.placeName}
                </Text>
              </View>
              <Text style={{ color: "rgba(0,0,0,0.6)" }}> {i.price}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Lessee = ({ navigation }) => {
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
  } = useInfiniteQuery("appliedhouses", fetchHouses, {
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
    navigation.navigate("lessee/applied/housedetail", {
      id,
    });
  }
  const isFocused = useIsFocused();
  const queryClient = useQueryClient();
  if (!isFocused) {
    queryClient.invalidateQueries("appliedhouses");
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
          return <Home item={item} pressHandler={pressHandler} />;
        }}
      ></FlatList>
    </View>
  );
};

const AppiedNavigation = () => {
  const { t } = useTranslation();
  return (
    <AppliedTabNavigator.Navigator>
      <AppliedTabNavigator.Screen
        options={{ title: t("pending") }}
        name="lessee/applied/home"
        component={Lessee}
      />
      <AppliedTabNavigator.Screen
        options={{ title: t("approved") }}
        name="lessee/approved"
        component={ApprovedScreen}
      />
      <AppliedTabNavigator.Screen
        options={{ title: t("rejected") }}
        name="lessee/rejected"
        component={RejectedScreen}
      />
    </AppliedTabNavigator.Navigator>
  );
};
const AppliedScreen = () => {
  const { t } = useTranslation();
  return (
    <LesseeStackNavigator.Navigator>
      <LesseeStackNavigator.Screen
        options={{
          title: t("applied"),
          headerTitleContainerStyle: { textAlign: "center" },
        }}
        name="lessee/applied/"
        component={AppiedNavigation}
      />
      <LesseeStackNavigator.Screen
        options={{ title: t("det") }}
        name="lessee/applied/housedetail"
        component={HomeDetailScreen}
      />
      <LesseeStackNavigator.Screen
        options={{ title: t("det") }}
        name="lessee/applied/viewimages"
        component={ViewImagesScreen}
      />
    </LesseeStackNavigator.Navigator>
  );
};
export default AppliedScreen;
