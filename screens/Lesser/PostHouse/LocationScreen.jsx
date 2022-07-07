import {
  View,
  Text,
  Pressable,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Modal,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import Icon from "@expo/vector-icons/SimpleLineIcons";
import FIcon from "@expo/vector-icons/FontAwesome";
import { Searchbar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";
import { MAPBOXURI } from "./../../../urls.js";
const LocationScreen = ({ navigation }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isFull, setIsFull] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [searchResult, setSearchResut] = useState([]);
  const [placeName, setPlaceName] = useState("");
  const [center, setCenter] = useState();
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const inputRef = useRef();
  const pressHandler = async () => {
    await Location.enableNetworkProviderAsync();
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    try {
      const getLocation = (location) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected && state.isInternetReachable) {
            fetch(
              `${MAPBOXURI}/mapbox.places/${location.coords.longitude},${location.coords.latitude}.json?access_token=pk.eyJ1IjoibmViYWFhYXp6enoiLCJhIjoiY2w0bHB0bWVkMHJibDNmbzFpenA5dmRkbyJ9.jSio18EC3_YJ0EcxYsFx-w`
            )
              .then(async (res) => {
                setIsGettingLocation(false);

                const r = await res.json();
                setPlaceName(r?.features[0]?.place_name);
                setCenter(r?.features[0]?.center);
                if (center) {
                  navigation.navigate("lesser/posthouse/pinspot", {
                    center,
                    placeName,
                  });
                }
              })
              .catch((err) => {
                ToastAndroid.show(
                  "check your internet connection",
                  ToastAndroid.LONG
                );
                setIsGettingLocation(false);
                throw err;
              });
          } else {
            ToastAndroid.show("no internet connection", ToastAndroid.LONG);
            setIsGettingLocation(false);
          }
        });
      };
      let location;

      setIsGettingLocation(true);
      const t = setTimeout(async () => {
        try {
          location = await Location.getLastKnownPositionAsync();
        } catch (err) {
          throw err;
        }
        getLocation(location);
      }, 10000);
      try {
        location = await Location.getCurrentPositionAsync({});
      } catch (err) {
        throw err;
      }
      if (location) {
        clearTimeout(t);
        getLocation(location);
      } else {
      }
    } catch (err) {
      throw err;
    }
  };
  const searchListPressHandler = (index) => {
    navigation.navigate("lesser/posthouse/pinspot", {
      center: searchResult[index].center,
      placeName: searchResult[index].place_name,
    });
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationQuery}.json?access_token=pk.eyJ1IjoibmViYWFhYXp6enoiLCJhIjoiY2w0bHB0bWVkMHJibDNmbzFpenA5dmRkbyJ9.jSio18EC3_YJ0EcxYsFx-w`
      )
        .then(async (res) => {
          const s = await res.json();
          if (s.features) {
            setSearchResut(s.features);
          }
        })
        .catch((err) => {
          throw err;
        });
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [locationQuery]);
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View
        style={{
          flex: 1,
          // backgroundColor: "#0099ff",
          backgroundColor: "rgba(0,0,0,0.3)",
          marginTop: StatusBar.currentHeight,
        }}
      >
        <Modal visible={isGettingLocation} animationType="fade">
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View>
              <ActivityIndicator color={"#0244d0"} size="large" />
              <Text style={{ marginTop: "10%" }}>Getting Current Location</Text>
            </View>
          </View>
        </Modal>

        <View
          style={{
            backgroundColor: "#fff",
            flex: 1,
          }}
        >
          {isFull ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 5,
                paddingVertical: 5,
                justifyContent: "space-between",
              }}
            >
              <Pressable
                onPress={() => {
                  setIsFull(false);
                  setLocationQuery("");
                  inputRef.current.clear();
                }}
              >
                <Icon size={20} name="arrow-left" />
              </Pressable>
              <Text style={{ fontWeight: "600", fontSize: 20 }}>
                Enter your address
              </Text>
              <Text></Text>
            </View>
          ) : (
            <></>
          )}

          {isFull ? (
            <></>
          ) : (
            <MapView
              style={{
                flex: 1,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}
              cacheEnabled
              initialRegion={{
                latitude: 11.5968568,
                longitude: 37.3981523,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          )}

          <Searchbar
            onChangeText={setLocationQuery}
            icon={"location-enter"}
            ref={inputRef}
            onFocus={() => {
              if (isFull) {
                setSearch(true);
              } else {
                inputRef.current.blur();
                setIsFull(true);
              }
            }}
            onBlur={() => {
              setSearch(false);
            }}
            style={{
              borderRadius: 10,
              marginTop: "10%",
              width: "90%",
              position: isFull ? "relative" : "absolute",
              // top: "10%",
              transform: [{ translateX: 10 }],
            }}
          />
          {isFull && (search || locationQuery) ? (
            <ScrollView
              style={{ marginVertical: 10, paddingHorizontal: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {searchResult.map((place, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      searchListPressHandler(index);
                    }}
                    style={{ borderBottomWidth: 0.2, marginVertical: 5 }}
                  >
                    <Text style={{ marginVertical: "2%" }}>
                      {place.place_name}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          ) : (
            <></>
          )}
          {isFull && !search && !locationQuery ? (
            <>
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  transform: [{ translateX: 25 }],

                  marginTop: "5%",
                }}
                onPress={pressHandler}
              >
                <FIcon name="location-arrow" size={20} />
                <Text style={{ marginLeft: "5%", fontSize: 18 }}>
                  Use my current location
                </Text>
              </Pressable>
              {/* add this feature to add address manually */}
              {/* <Pressable
                style={{
                  marginVertical: 10,

                  transform: [{ translateX: 25 }],
                }}
              >
                <Text
                  style={{
                    fontWeight: "900",
                    textDecorationLine: "underline",
                    fontSize: 18,
                  }}
                >
                  Enter address manually
                </Text>
              </Pressable> */}
            </>
          ) : (
            <></>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LocationScreen;
