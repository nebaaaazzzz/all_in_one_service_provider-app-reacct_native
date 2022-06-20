import {
  View,
  Text,
  Pressable,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import Icon from "@expo/vector-icons/SimpleLineIcons";
import FIcon from "@expo/vector-icons/FontAwesome";
import { Searchbar } from "react-native-paper";
const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [bgColor, setBgColor] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  useEffect(() => {
    if (inputRef.current.isFocused()) {
      setBgColor(true);
    } else {
      setBgColor(false);
    }
  }, []);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View
        onResponderMove={() => setBgColor(true)}
        horizontal={false}
        style={{
          flex: 1,
          // backgroundColor: "#0099ff",
          backgroundColor: "rgba(0,0,0,0.3)",
          marginTop: StatusBar.currentHeight,
        }}
      >
        <View
          style={{
            marginTop: isFull ? 0 : "40%",
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
              <Pressable onPress={() => setIsFull(false)}>
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
              initialRegion={{
                latitude: 11.5968568,
                longitude: 37.3981523,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          )}

          <Searchbar
            icon={"location-enter"}
            ref={inputRef}
            onFocus={() => {
              setIsFull(true);
            }}
            onBlur={() => setBgColor(false)}
            style={{
              borderRadius: 10,
              marginTop: isFull ? "10%" : 0,
              width: "90%",
              position: isFull ? "relative" : "absolute",
              // top: "10%",
              transform: [{ translateX: 10 }],
            }}
          />
          {isFull ? (
            <>
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  transform: [{ translateX: 25 }],

                  marginTop: "5%",
                }}
              >
                <FIcon name="location-arrow" size={20} />
                <Text style={{ marginLeft: "5%", fontSize: 18 }}>
                  Use my current location
                </Text>
              </Pressable>
              <Pressable
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
              </Pressable>
            </>
          ) : (
            <></>
          )}
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            borderTopWidth: 2,
            alignItems: "flex-end",
            height: 60,
            justifyContent: "center",
            borderColor: "rgba(0,0,0,0.3)",
          }}
        >
          <Pressable
            style={{
              backgroundColor: bgColor ? "#0099ff" : "rgba(0,0,0,0.2)",
              width: 100,
              right: 20,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>Next</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LocationScreen;
