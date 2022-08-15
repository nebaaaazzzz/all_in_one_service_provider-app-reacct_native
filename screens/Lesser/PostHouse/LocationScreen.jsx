import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  Image,
  StyleSheet,
  Pressable,
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
import { useTranslation } from "react-i18next";

const LocationScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
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
        t("permission"),
        ToastAndroid.LONG
      );
      return;
    }
    try {
      const getLocation = async (location) => {
        try {
          setIsGettingLocation(false);
          if (route.params?.data) {
            return navigation.navigate("lesser/posthouse/pinspot", {
              center: [location.coords.longitude, location.coords.latitude],
              data: route.params.data,
            });
          }
          navigation.navigate("lesser/posthouse/pinspot", {
            center: [location.coords.longitude, location.coords.latitude],
          });
        } catch (err) {
          ToastAndroid.show(
            t("check1"),
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
    if (route.params?.data) {
      return navigation.navigate("lesser/posthouse/pinspot", {
        center: [searchResult[index].lon, searchResult[index].lat],
        data: route.params.data,
      });
    }
    navigation.navigate("lesser/posthouse/pinspot", {
      center: [searchResult[index].lon, searchResult[index].lat],
    });
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetch(
        `${MAPBOXURI}geocode/search?text=/${locationQuery}&filter=countrycode:et&format=json&apiKey=${MAPBOXTOKEN}`
      )
        .then(async (res) => {
          const s = await res.json();
          if (s.results) {
            setSearchResut(s.results);
          }
        })
        .catch((err) => {
          throw err;
        });
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [locationQuery]);
  return (
    <Pressable
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
        }}
      >
        <Modal visible={isGettingLocation} animationType="fade">
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View>
              <ActivityIndicator color={"#0244d0"} size="large" />
              <Text style={{ marginTop: "10%" }}>{t("getting")} </Text>
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
                {t("enter")}
              </Text>
              <Text></Text>
            </View>
          ) : (
            <Image
              style={{
                flex: 1,
                // borderTopLeftRadius: 15,
                // borderTopRightRadius: 15,
              }}
              source={{
                uri: `${MAPBOXURI}/staticmap?style=osm-carto&width=600&height=400&center=lonlat:38.761252,9.010793&zoom=14&apiKey=${MAPBOXTOKEN}`,
              }}
            />
          )}

          <Searchbar
            onChangeText={setLocationQuery}
            icon={"location-enter"}
            ref={inputRef}
            iconColor={"#0244d0"}
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
                      {place.formatted}
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
                <FIcon name="location-arrow" color={"#0244d0"} size={20} />
                <Text style={{ marginLeft: "5%", fontSize: 18 }}>
                  {t("current")}
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
    </Pressable>
  );
};
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: "tomato",
  },
  map: {
    flex: 1,
  },
});
export default LocationScreen;
