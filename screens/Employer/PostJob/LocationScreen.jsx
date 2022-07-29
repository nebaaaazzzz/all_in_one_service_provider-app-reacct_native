import {
  View,
  Text,
  TouchableOpacity,
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
import { MAPBOXTOKEN, MAPBOXURI } from "./../../../urls.js";
const LocationScreen = ({ navigation }) => {
  const [isFull, setIsFull] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [searchResult, setSearchResut] = useState([]);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const inputRef = useRef();
  const pressHandler = async () => {
    await Location.enableNetworkProviderAsync();
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      ToastAndroid.show(
        "Permission to access location was denied",
        ToastAndroid.LONG
      );
      return;
    }
    try {
      const getLocation = async (location) => {
        try {
          const response = await fetch(
            `${MAPBOXURI}/mapbox.places/${location.coords.longitude},${location.coords.latitude}.json?access_token=${MAPBOXTOKEN}`
          );
          const r = await response.json();
          if (r.features[0].place_name && r.features[0].center) {
            setIsGettingLocation(false);
            navigation.navigate("employer/postjob/pinspot", {
              center: r.features[0].center,
            });
          }
        } catch (err) {
          ToastAndroid.show(
            "check your internet connection",
            ToastAndroid.LONG
          );
          setIsGettingLocation(false);
          throw err;
        }
      };

      setIsGettingLocation(true);
      const t = setTimeout(async () => {
        try {
          const location = await Location.getLastKnownPositionAsync();
          getLocation(location);
        } catch (err) {
          throw err;
        }
      }, 10000);
      try {
        const location = await Location.getCurrentPositionAsync();
        clearTimeout(t);
        getLocation(location);

        // navigation.navigate("employer/postjob/pinspot", {
        //   center,
        //   placeName,
        // });
      } catch (err) {
        throw err;
      }
    } catch (err) {
      throw err;
    }
  };
  const searchListPressHandler = (index) => {
    navigation.navigate("employer/postjob/pinspot", {
      center: searchResult[index].center,
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
              <TouchableOpacity
                onPress={() => {
                  setIsFull(false);
                  setLocationQuery("");
                  inputRef.current.clear();
                }}
              >
                <Icon size={20} name="arrow-left" />
              </TouchableOpacity>
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
            iconColor={"#0244d0"}
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
                  <TouchableOpacity
                    key={index + 1}
                    onPress={() => {
                      searchListPressHandler(index);
                    }}
                    style={{ borderBottomWidth: 0.2, marginVertical: 5 }}
                  >
                    <Text style={{ marginVertical: "2%" }}>
                      {place.place_name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <></>
          )}
          {isFull && !search && !locationQuery ? (
            <>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  transform: [{ translateX: 25 }],

                  marginTop: "5%",
                }}
                onPress={pressHandler}
              >
                <FIcon name="location-arrow" color="#0244d0" size={20} />
                <Text style={{ marginLeft: "5%", fontSize: 18 }}>
                  Use my current location
                </Text>
              </TouchableOpacity>
              {/* add this feature to add address manually */}
              {/* <TouchableOpacity
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
              </TouchableOpacity> */}
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
