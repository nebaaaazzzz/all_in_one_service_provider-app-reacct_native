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
} from "react-native";
import { categoryList, regionsList } from "../../constants/data";
import SelectDropdown from "react-native-select-dropdown";
import { Searchbar } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import { RadioButton } from "react-native-paper";
import React, { useState, useEffect } from "react";
import FilterModal from "../../components/FilterModal";
import { BASETOKEN, BASEURI } from "../../urls";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
  const [searchQuery, setSearchQuery] = React.useState("");
  const [nearBy, setNearBy] = useState(false);
  const [location, setLocation] = useState("");

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
        let {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({});
        if (latitude && longitude) {
          setLocation(`${longitude},${latitude}`);
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
  /*Modal states */
  const [openModal, setOpenModal] = useState(false);
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [permanent, setPermanet] = useState("");
  const [cvRequired, setCvRequired] = useState("");
  /* */
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    [
      "houses",
      location,
      searchQuery,
      region,
      category,
      gender,
      permanent,
      cvRequired,
    ],
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

  if (status === "error") {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }

  return (
    <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <Modal visible={openModal}>
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
              borderRadius: 15,
            }}
            buttonTextStyle={{
              fontSize: 15,
              color: "rgba(0,0,0,0.8)",
            }}
            data={["Any", ...regionsList]}
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
            defaultButtonText="Select Region"
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
              borderRadius: 15,
            }}
            data={["Any", ...categoryList]}
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
            defaultButtonText="Select Category"
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
            <Text style={{ fontWeight: "bold", marginRight: 10 }}>Gender</Text>
            {["male", "female", "both", "Any"].map((item, index) => {
              return (
                <TouchableOpacity
                  key={index + 1}
                  onPress={() => {
                    if (index == 3) {
                      setGender("");
                    }
                    setGender(item);
                  }}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <RadioButton
                    color="#0244d0"
                    onPress={() => setGender(item)}
                    value={item}
                    status={gender === item ? "checked" : "unchecked"}
                  />
                  <Text>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "5%",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>permanent</Text>
            {["yes", "no", "Any"].map((item, index) => {
              return (
                <TouchableOpacity
                  key={index + 1}
                  onPress={() => {
                    if (index == 0) {
                      setPermanet(true);
                    } else if (index == 1) {
                      setPermanet(false);
                    } else {
                      setPermanent("");
                    }
                  }}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <RadioButton
                    color="#0244d0"
                    onPress={() => setGender(item)}
                    value={item}
                    status={gender === item ? "checked" : "unchecked"}
                  />
                  <Text>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "5%",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>cv required</Text>
            {["yes", "no", "Any"].map((item, index) => {
              return (
                <TouchableOpacity
                  key={index + 1}
                  onPress={() => {
                    if (index == 0) {
                      setCvRequired(true);
                    } else if (index == 1) {
                      setCvRequired(false);
                    } else {
                      setCvRequired("");
                    }
                  }}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <RadioButton
                    color="#0244d0"
                    onPress={() => setGender(item)}
                    value={item}
                    status={gender === item ? "checked" : "unchecked"}
                  />
                  <Text>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                elevation: 10,
                backgroundColor: "#0244d0",
                marginRight: "5%",
                paddingHorizontal: "10%",
                paddingVertical: "2%",
                marginTop: "10%",
                borderRadius: 5,
              }}
              onPress={() => setOpenModal(false)}
            >
              <Text style={{ fontSize: 18, color: "#fff" }}>Close</Text>
            </TouchableOpacity>
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
              <Text style={{ fontSize: 18, color: "#fff" }}>Save</Text>
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
          top: 50,
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
            return <Home item={item} pressHandler={pressHandler} />;
          }}
        />
      )}
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
        options={{ title: "detail" }}
        name="lessee/viewimages"
        component={ViewImagesScreen}
      />
    </LesseeStackNavigator.Navigator>
  );
};
export default LesseeScreen;
