import {
  View,
  Text,
  StatusBar,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Searchbar } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import FilterModal from "../../components/FilterModal";
import { BASETOKEN, BASEURI } from "../../urls";
import { useInfiniteQuery } from "react-query";
import { createStackNavigator } from "@react-navigation/stack";
import HomeDetailScreen from "./HomeDetailScreen";
import { useIsFocused } from "@react-navigation/native";
import { useQueryClient } from "react-query";
import ViewImagesScreen from "./ViewImagesScreen";
import fromNow from "../../utils/time";
import AppliedScreen from "./AppliedScreen";
const LesseeStackNavigator = createStackNavigator();
const fetchHouses = async ({ pageParam = 1 }) => {
  const response = await fetch(`${BASEURI}/lessee/?page=${pageParam}`, {
    headers: {
      Authorization: `Bearer ${BASETOKEN}`,
    },
  });
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

const Lessee = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = () => {};
  const [visible, setVisible] = React.useState(false);
  const [indexS, setIndex] = useState(0);
  // require('./assets/images/girl.jpg'),          // Local image

  const list = [
    {
      title: "All Homes",
      name: "home",
    },
    {
      title: "Islands",
      name: "team",
    },
    {
      title: "Arctic",
      name: "setting",
    },
    {
      title: "Amazing pools",
      name: "picture",
    },
    {
      title: "surfing",
      name: "inbox",
    },
    {
      title: "Bed & Breakfast",
      name: "cloudo",
    },
    {
      title: "Design",
      name: "camera",
    },
    { title: "National parks", name: "phone" },
    {
      title: "shared homes",
      name: "smileo",
    },
    {
      title: "caves",
      name: "piechart",
    },
    { title: "tropical", name: "dingding" },
    {
      title: "Amazing view",
      name: "windowso",
    },
    {
      title: "Earth Home",
      name: "phone",
    },
  ];
  function pressHandler(id) {
    navigation.navigate("lessee/housedetail", {
      id,
    });
  }
  const isFocused = useIsFocused();
  const queryClient = useQueryClient();
  if (!isFocused) {
    queryClient.invalidateQueries("houses");
  }
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["houses"], fetchHouses, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length) {
        return pages.length + 1;
      }
      return;
    },
  });
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
      <Pressable
        style={{
          marginTop: "2%",
          alignSelf: "flex-end",
          backgroundColor: "#0244d0",
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderRadius: 5,
          marginHorizontal: "4%",
          elevation: 10,
        }}
        onPress={() => {
          navigation.navigate("lessee/applied");
        }}
      >
        <Text style={{ color: "#fff" }}>Applied</Text>
      </Pressable>
      <Searchbar
        style={{ marginTop: "2%", marginHorizontal: 10, borderRadius: 20 }}
        placeholder="Search"
        iconColor="#0244d0"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View style={{ flexDirection: "row", marginTop: 4 }}>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={list}
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  onPress={() => {
                    setIndex(index);
                  }}
                  style={{
                    marginHorizontal: 10,
                    borderBottomColor: "#0244d0",
                    borderBottomWidth: indexS == index ? 2 : 0,
                  }}
                >
                  <AntDesign
                    name={item.name}
                    size={20}
                    color="#0244d0"
                    style={{ textAlign: "center" }}
                  />
                  <Text style={{ color: "#0244d0" }}>{item.title}</Text>
                </Pressable>
              );
            }}
          ></FlatList>
        </View>
      </View>
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

const LesseeScreen = () => {
  return (
    <LesseeStackNavigator.Navigator>
      <LesseeStackNavigator.Screen
        options={{ headerShown: false }}
        name="lessee/"
        component={Lessee}
      />
      <LesseeStackNavigator.Screen
        options={{ title: "detail" }}
        name="lessee/housedetail"
        component={HomeDetailScreen}
      />
      <LesseeStackNavigator.Screen
        options={{
          headerShown: false,
        }}
        name="lessee/applied"
        component={AppliedScreen}
      />
      <LesseeStackNavigator.Screen
        options={{ title: "detail" }}
        name="lessee/viewimages"
        component={ViewImagesScreen}
      />
    </LesseeStackNavigator.Navigator>
  );
};
export default LesseeScreen;
