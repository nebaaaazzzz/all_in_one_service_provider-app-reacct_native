import * as Location from "expo-location";

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
  Pressable,
  Modal,
  Keyboard,
  RefreshControl,
} from "react-native";
import { Searchbar } from "react-native-paper";
import React, { useState, useEffect } from "react";
import FilterModal from "../../components/FilterModal";
import { Divider, Checkbox } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";

import JobDetailScreen from "./JobDetailScreen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SelectDropdown from "react-native-select-dropdown";
import { RadioButton } from "react-native-paper";
import { BASEURI, BASETOKEN } from "../../urls";
import PaymentScreen from "../Common/PaymentScreen";
import { useInfiniteQuery, useQueryClient } from "react-query";
import fromNow from "../../utils/time";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useIsFocused } from "@react-navigation/native";
import AppliedScreen from "./AppliedScreen";
import { useTranslation } from "react-i18next";

const fetchJobs = async ({ pageParam = 1, queryKey }) => {
  const response = await fetch(
    `${BASEURI}/employee/?page=${pageParam}&nearBy=${queryKey[1]}&search=${queryKey[2]}&region=${queryKey[3]}&category=${queryKey[4]}&gender=${queryKey[5]}&permanent=${queryKey[6]}&cvRequired=${queryKey[7]}`,
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
              backgroundColor: "rgba(0,0,0,0.1)",
              marginVertical: 5,
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
            <Text style={{ color: "#ff0000" }}>{i.closed ? "closed" : ""}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Home = ({ navigation }) => {
  const { t } = useTranslation();
  const categoryList = [
    t("accounting"),
    t("admin"),
    t("advert"),
    t("agri"),
    t("arch"),
    t("auto"),
    t("banking"),
    t("business"),
    t("busin"),
    t("comm"),
    t("commun"),
    t("consult"),
    t("creative"),
    t("customer"),

    t("development"),
    t("eco"),
    t("edu"),
    t("eng"),
    t("environment"),
    t("health"),
    t("hotel"),
    t("human"),
    t("info"),
    t("language"),
    t("legal"),
    t("logistic"),
    t("maintenance"),

    t("managment"),
    t("manu"),
    t("media"),
    t("natural"),
    t("pharma"),
    t("purchasing"),
    t("quality"),
    t("research"),
    t("retail"),
    t("sales"),

    t("science"),
    t("security"),
    t("social"),
    t("strategic"),
    t("tele"),
  ];
  /*Modal states */
  const [openModal, setOpenModal] = useState(false);
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [permanent, setPermanet] = useState("");
  const [cvRequired, setCvRequired] = useState("");
  /* */
  const [searchQuery, setSearchQuery] = React.useState("");
  const [nearBy, setNearBy] = useState(false);
  const [location, setLocation] = useState("");
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
  } = useInfiniteQuery(
    [
      "jobs",
      location,
      searchQuery,
      region,
      category,
      gender,
      permanent,
      cvRequired,
    ],
    fetchJobs,
    {
      // enabled: Boolean(searchQuery),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length) {
          return pages.length + 1;
        }
        return;
      },
    }
  );
  useEffect(() => {
    queryClient.refetchQueries([
      "jobs",
      location,
      searchQuery,
      region,
      category,
      gender,
      permanent,
      cvRequired,
    ]);
  });
  // console.log("location :" + location + " op");
  useEffect(() => {
    if (nearBy) {
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
            setLocation(`${coords.longitude},${coords.latitude}`);
          }
        }, 2000);
        coords = (await Location.getCurrentPositionAsync({})).coords;
        if (latitude && longitude) {
          setLocation(`${coords.longitude},${coords.latitude}`);
        }
      })();
    } else {
      setLocation("");
    }
  }, [nearBy]);
  const isFocused = useIsFocused();
  const queryClient = useQueryClient();
  if (!isFocused) {
    queryClient.invalidateQueries([
      "jobs",
      location,
      searchQuery,
      region,
      category,
      gender,
      permanent,
      cvRequired,
    ]);
  }
  const list = [
    t("all"),
    t("near"),
    t("eco"),
    t("edu"),
    t("eng"),
    t("manu"),
    t("media"),
    t("science"),
    t("security"),
  ];
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
  if (status === "error") {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    queryClient.refetchQueries([
      "jobs",
      location,
      searchQuery,
      region,
      category,
      gender,
      permanent,
      cvRequired,
    ]);
    wait(500).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <Pressable onPress={Keyboard.dismiss()} style={{ marginBottom: "35%" }}>
        <Modal visible={openModal}>
          <View
            style={{
              alignItems: "center",
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
          >
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
              searchable={true}
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
              data={[t("any"), ...categoryList]}
              onSelect={(selectedItem, index) => {
                if (index == 0) {
                  setCategory("");
                }
                setCategory(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              defaultButtonText={category || t("catagori")}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
            <View
              style={{
                flexDirection: "row",
                marginTop: "5%",
                alignItems: "center",
              }}
            >
              <SelectDropdown
                rowStyle={{
                  color: "rgba(0,0,0,0.2)",
                }}
                dropdownOverlayColor="transparent"
                buttonStyle={{
                  borderWidth: 1,
                  borderColor: "#0244d0",
                  width: "70%",
                  height: 30,
                  borderRadius: 5,
                }}
                buttonTextStyle={{
                  fontSize: 15,
                  color: "rgba(0,0,0,0.8)",
                }}
                data={[t("any"), t("male"), t("female")]}
                onSelect={(selectedItem, index) => {
                  if (index == 0) {
                    setGender("");
                  } else {
                    setGender(selectedItem);
                  }
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                defaultButtonText={gender || t("gender")}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
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
                data={[t("any"), t("yes"), t("noo")]}
                onSelect={(selectedItem, index) => {
                  if (index == 0) {
                    setPermanent("");
                  } else {
                    if (selectedItem === t("yes")) {
                      setPermanent(true);
                    } else if (selectedItem === t("noo")) {
                      setPermanent(false);
                    }
                  }
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                defaultButtonText={permanent || t("permanent")}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
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
                data={[t("any"), t("yes"), t("no")]}
                onSelect={(selectedItem, index) => {
                  if (index == 0) {
                    setCvRequired("");
                  } else {
                    if (selectedItem === t("yes")) {
                      setCvRequired(true);
                    } else if (selectedItem === t("noo")) {
                      setCvRequired(false);
                    }
                  }
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                defaultButtonText={cvRequired || t("cv")}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
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
        </Modal>
        <FilterModal visible={visible} setVisible={setVisible} />
        <TouchableOpacity
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
            navigation.navigate("employee/applied");
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
            top: 60,
            right: 50,
            zIndex: 10,
          }}
        >
          <MaterialCommunityIcons name="filter" size={26} color="#0244d0" />
        </TouchableOpacity>
        <Searchbar
          iconColor="#0244d0"
          style={{ marginHorizontal: 10, marginTop: "4%", borderRadius: 20 }}
          placeholder={t("search")}
          onChangeText={setSearchQuery}
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
                <TouchableOpacity
                  onPress={() => {
                    if (index === 1) {
                      setNearBy(true);
                    }
                    if (index == 0) {
                      setNearBy(false);
                      setCategory(item);
                    } else {
                      setNearBy(false);
                      setCategory(item);
                    }
                    setIndex(index);
                  }}
                  style={{
                    marginHorizontal: 10,
                    borderBottomColor: "#3498db",
                    borderBottomWidth: indexS == index ? 2 : 0,
                  }}
                >
                  <Text style={{ color: "#0244d0" }}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
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
            showsVerticalScrollIndicator={false}
            data={data.pages}
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
                  <ActivityIndicator color={"#0244d0"}></ActivityIndicator>
                );
              }
              if (!hasNextPage) {
                return <Text style={{ textAlign: "center" }}>{t("no")}</Text>;
              }
              return null;
            }}
            renderItem={({ item }) => {
              return <Jobs pressHandler={onPressHandler} item={item} />;
            }}
          />
        )}
      </Pressable>
    </View>
  );
};
function EmployeeScreen() {
  const { t } = useTranslation();
  return (
    <EmployeeStackNavigator.Navigator>
      <EmployeeStackNavigator.Screen
        options={{ headerShown: false }}
        name="employee/home"
        component={Home}
      />
      <EmployeeStackNavigator.Screen
        name="employee/jobdetail"
        options={{ title: t("job") }}
        component={JobDetailScreen}
      />
      <EmployeeStackNavigator.Screen
        name="employee/payment"
        options={{ title: t("yes") }}
        component={PaymentScreen}
      />

      <EmployeeStackNavigator.Screen
        name="employee/applied"
        options={{ headerShown: false }}
        component={AppliedScreen}
      />
    </EmployeeStackNavigator.Navigator>
  );
}
export default EmployeeScreen;
