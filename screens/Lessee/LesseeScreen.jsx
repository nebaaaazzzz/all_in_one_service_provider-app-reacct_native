import * as Location from "expo-location";

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Modal,
  ToastAndroid,
  Pressable,
  Keyboard,
  RefreshControl,
} from "react-native";
import { regionsList } from "../../constants/data";
import SelectDropdown from "react-native-select-dropdown";
import { Searchbar, TextInput } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState, useEffect } from "react";
import FilterModal from "../../components/FilterModal";
import { BASETOKEN, BASEURI } from "../../urls";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as SecureStore from "expo-secure-store";

import { useInfiniteQuery } from "react-query";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import HomeDetailScreen from "./HomeDetailScreen";
import { useIsFocused } from "@react-navigation/native";
import { useQueryClient } from "react-query";
import ViewImagesScreen from "./ViewImagesScreen";
import fromNow from "../../utils/time";
import AppliedScreen from "./AppliedScreen";
import PaymentScreen from "../Common/PaymentScreen";
import { useTranslation } from "react-i18next";
const LesseeStackNavigator = createStackNavigator();
const fetchHouses = async ({ pageParam = 1, queryKey }) => {
  const response = await fetch(
    `${BASEURI}/lessee/?page=${pageParam}&nearBy=${queryKey[1]}&search=${queryKey[2]}&region=${queryKey[3]}&propertyType=${queryKey[4]}&price=${queryKey[5]}`,
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

const Home = ({ item, pressHandler }) => {
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
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "rgba(0,0,0,0.6)" }}> {i.price}</Text>
                <Text
                  style={{ color: "#ff0000", marginLeft: "50%", fontSize: 16 }}
                >
                  {i.closed ? t("reserved") : ""}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Lessee = ({ navigation }) => {
  const { t } = useTranslation();
  const regionsList = [
    t("addis"),
    t("afar"),
    t("amhara"),
    t("bengu"),
    t("dire"),
    t("gambela"),
    t("harer"),
    t("oro"),
    t("sida"),
    t("soma"),
    t("south"),
    t("tigray"),
    t("southern"),
  ];
  const propertyType = [
    t("ho"),
    t("vil"),
    t("Apa"),
    t("Cota"),
    t("Hut"),
    t("Tiny"),
    t("Guest"),
    t("office"),
  ];
  const [searchQuery, setSearchQuery] = React.useState("");
  const [nearBy, setNearBy] = useState(false);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false); // while location fetch
  useEffect(() => {
    if (nearBy) {
      setLoading(true);
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          ToastAndroid.show(
            "Permission to access location was denied",
            ToastAndroid.LONG
          );
        }
        let coords;
        setTimeout(async () => {
          if (!coords) {
            coords = (await Location.getLastKnownPositionAsync({})).coords;
            console.log("coords ", coords);
            setLocation(`${coords.longitude},${coords.latitude}`);
            setLoading(false);
          }
        }, 2000);
        coords = (await Location.getCurrentPositionAsync({})).coords;
        console.log("coords ", coords);

        if (latitude && longitude) {
          setLocation(`${coords.longitude},${coords.latitude}`);
          setLoading(false);
        }
      })();
    } else {
      setLocation("");
    }
  }, [nearBy]);

  const [visible, setVisible] = React.useState(false);
  const [indexS, setIndex] = useState(0);
  // require('./assets/images/girl.jpg'),          // Local image

  const list = [
    {
      title: t("Allh"),
      name: "home",
    },
    {
      title: "NearBy",
      name: "enviromento",
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
  /*Modal states */
  const [openModal, setOpenModal] = useState(false);
  const [region, setRegion] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [price, setPrice] = useState("");
  /* */
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ["houses", location, searchQuery, region, placeType, price],
    fetchHouses,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length) {
          return pages.length + 1;
        }
        return;
      },
    }
  );
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    queryClient.refetchQueries([
      "houses",
      location,
      searchQuery,
      region,
      placeType,
      price,
    ]);
    wait(500).then(() => setRefreshing(false));
  }, []);

  if (status === "error") {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }
  if (isLoading || loading) {
    <View style={{ flex: 1 }}>
      <ActivityIndicator color={"#0244d0"} size={"large"} />
    </View>;
  }

  return (
    <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <Modal visible={openModal}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.1)",
            paddingTop: "20%",
          }}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={{ alignItems: "center", flex: 1 }}>
            <SelectDropdown
              rowStyle={{
                color: "rgba(0,0,0,0.2)",
              }}
              dropdownOverlayColor="transparent"
              buttonStyle={{
                borderWidth: 1,
                marginTop: "5%",
                borderColor: "#0244d0",
                width: "70%",
                height: 30,
                borderRadius: 5,
              }}
              buttonTextStyle={{
                fontSize: 15,
                color: "rgba(0,0,0,0.8)",
              }}
              data={[t("any"), ...regionsList]}
              onSelect={(selectedItem, index) => {
                if (index == 0) {
                  setRegion("");
                } else {
                  setRegion(selectedItem);
                }
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              defaultButtonText={region || t("reg")}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
            <SelectDropdown
              rowStyle={{
                color: "rgba(0,0,0,0.2)",
              }}
              buttonTextStyle={{
                fontSize: 15,
                color: "rgba(0,0,0,0.8)",
              }}
              dropdownOverlayColor="transparent"
              buttonStyle={{
                borderWidth: 1,
                marginTop: "5%",
                borderColor: "#0244d0",
                width: "70%",
                width: "70%",
                height: 30,
                borderRadius: 5,
              }}
              data={[t("any"), ...propertyType]}
              onSelect={(selectedItem, index) => {
                if (index == 0) {
                  setPlaceType("");
                } else {
                  setPlaceType(selectedItem);
                }
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              defaultButtonText={placeType || t("place")}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: "15%",
                marginVertical: "5%",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", marginHorizontal: "2%" }}>
                {t("start")}{" "}
              </Text>
              <TextInput
                value={price}
                onChangeText={(text) => {
                  setPrice(text.replace(/\D/g, ""));
                }}
                keyboardType="numeric"
                style={{ flex: 1, height: 40 }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  elevation: 10,
                  backgroundColor: "#0244d0",
                  paddingHorizontal: "10%",
                  paddingVertical: "2%",
                  marginTop: "10%",
                  borderRadius: 5,
                }}
                onPress={() => setOpenModal(false)}
              >
                <Text style={{ fontSize: 18, color: "#fff" }}>
                  {t("close")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
      <FilterModal visible={visible} setVisible={setVisible} />
      <TouchableOpacity
        style={{
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
        <MaterialIcons
          name="notifications-active"
          size={20}
          color="#fff"
          style={{ elevation: 10 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setOpenModal(true);
        }}
        style={{
          elevation: 10,
          position: "absolute",
          top: 45,
          right: 50,
          zIndex: 10,
        }}
      >
        <MaterialCommunityIcons name="filter" size={26} color="#0244d0" />
      </TouchableOpacity>
      <Searchbar
        style={{ marginTop: "2%", marginHorizontal: 10, borderRadius: 20 }}
        placeholder="Search"
        iconColor="#0244d0"
        onChangeText={setSearchQuery}
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
                <TouchableOpacity
                  onPress={() => {
                    if (index === 1) {
                      setNearBy(true);
                    } else {
                      setNearBy(false);
                    }
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
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>

      {status === "loading" ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={"#0244d0"}></ActivityIndicator>
        </View>
      ) : (
        <FlatList
          style={{ marginTop: 20 }}
          data={data.pages}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          ListFooterComponent={() => {
            if (isFetchingNextPage) {
              return (
                <ActivityIndicator color={"#0244d0"} r></ActivityIndicator>
              );
            }
            if (!hasNextPage) {
              return <Text style={{ textAlign: "center" }}>{t("no")} </Text>;
            }
            return null;
          }}
          renderItem={({ item }) => {
            return <Home item={item} pressHandler={pressHandler} />;
          }}
        />
      )}
    </View>
  );
};

const LesseeScreen = () => {
  const { t } = useTranslation();
  return (
    <LesseeStackNavigator.Navigator>
      <LesseeStackNavigator.Screen
        options={{ headerShown: false }}
        name="lessee/"
        component={Lessee}
      />
      <LesseeStackNavigator.Screen
        options={{ title: t("det") }}
        name="lessee/housedetail"
        component={HomeDetailScreen}
      />
      <LesseeStackNavigator.Screen
        options={{ title: "payment" }}
        name="lessee/payment"
        component={PaymentScreen}
      />
      <LesseeStackNavigator.Screen
        options={{
          headerShown: false,
        }}
        name="lessee/applied"
        component={AppliedScreen}
      />
      <LesseeStackNavigator.Screen
        options={{ title: t("Det") }}
        name="lessee/viewimages"
        component={ViewImagesScreen}
      />
    </LesseeStackNavigator.Navigator>
  );
};
export default LesseeScreen;
