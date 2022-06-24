import {
  ScrollView,
  View,
  Text,
  Pressable,
  StatusBar,
  Image,
} from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
const ReviewListingScreen = () => {
  return (
    <View
      horizontal={false}
      style={{
        flex: 1,
        // backgroundColor: "#0099ff",
        backgroundColor: "rgba(0,0,0,0.3)",
        marginTop: StatusBar.currentHeight,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: "40%",
          backgroundColor: "#fff",
          flex: 1,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            marginVertical: 20,
            textAlign: "center",
            color: "#000",
            fontSize: 20,
          }}
        >
          Check out your listing!
        </Text>
        <View>
          <Image
            source={{ uri: "file:///s.jpg" }}
            style={{
              backgroundColor: "red",
              width: "90%",
              aspectRatio: 2,
              alignSelf: "center",
              borderRadius: 10,
            }}
          />
          <Text style={{ fontSize: 30, fontWeight: "600", marginVertical: 20 }}>
            Fun place in BahirDar
          </Text>
          <Divider />
          <View
            style={{
              marginVertical: 20,
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>Entire villa hosted by Nebiyu</Text>
            <Image
              source={{ uri: "file://a.jph" }}
              style={{
                backgroundColor: "red",
                width: 50,
                height: 50,
                borderRadius: 50,
              }}
            />
          </View>
          <Divider />
          <Text style={{ marginVertical: 20, fontSize: 16 }}>
            2 guests.1bedrrom.1bed.1bath
          </Text>
          <Text style={{ marginVertical: 20 }}>
            You'll have a great time at this comfortable place to stay.at bahir
            dar
          </Text>
          <Divider />
          <View style={{ marginVertical: 20 }}>
            <Text style={{ fontSize: 25 }}>Location</Text>
            <Text style={{ marginVertical: 15 }}> Yedi,Ethiopia</Text>
          </View>
        </View>
      </ScrollView>
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
            backgroundColor: "rgba(0,0,0,0.9)",
            width: 100,
            right: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>
            Save your listing
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReviewListingScreen;
