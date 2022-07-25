import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import FilterModal from "../../components/FilterModal";
import { BASETOKEN, BASEURI } from "../../urls";
import { useInfiniteQuery } from "react-query";
import { useIsFocused } from "@react-navigation/native";
import { useQueryClient } from "react-query";
import fromNow from "../../utils/time";
const fetchHouses = async ({ pageParam = 1 }) => {
  const response = await fetch(
    `${BASEURI}/lessee/rejected/?page=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer ${BASETOKEN}`,
      },
    }
  );
  return await response.json();
};

const Home = ({ item, pressHandler }) => {
  const [bgColor, setBgColor] = useState(false);
  return (
    <View>
      {item.map((i, index) => {
        return (
          <Pressable
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
          </Pressable>
        );
      })}
    </View>
  );
};

const RejectedScreen = ({ navigation }) => {
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
  } = useInfiniteQuery("rejectedhouses", fetchHouses, {
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
    ToastAndroid(error.message, ToastAndroid.LONG);
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
            <Text>Nothing more to load</Text>;
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
export default RejectedScreen;
