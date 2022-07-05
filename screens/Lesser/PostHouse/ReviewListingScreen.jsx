import {
  ScrollView,
  View,
  Text,
  Pressable,
  StatusBar,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { Divider } from "react-native-paper";
import { PostHouseContext } from "./PostHouseScreen";
import NetInfo from "@react-native-community/netinfo";
import * as axois from "axios";

const ReviewListingScreen = ({ navigation }) => {
  const { housePost } = useContext(PostHouseContext);

  useEffect(() => {
    (async () => {
      const formData = new FormData();
      for await (const img of housePost.houseImages) {
        const uri = img.uri;
        const arr = uri.split(".");
        const ext = arr[arr.length - 1];
        formData.append("houseImage", {
          uri: img.uri,
          type: "image/" + ext,
          name: uri,
        });
      }
      const newObj = { ...housePost };
      delete newObj.houseImages;
      formData.append("body", JSON.stringify(newObj));
      NetInfo.fetch().then((state) => {
        if (state.isConnected && state.isInternetReachable) {
          const url = "https://2c57-213-55-102-49.in.ngrok.io/lesser/posthouse";

          fetch(url, {
            method: "post",
            body: formData,
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjpmYWxzZSwic3ViIjoiNjI5ZWViNWNlYzkyZjI0ZjdkMjNlMjdmIiwiZXhwIjoxNjU0NjU5OTk0MzAzLCJpYXQiOjE2NTQ1ODIyMzR9.OAD1NzoanHjNOAUMhua1N4F5LLM-X9nYsLZXmoPJyys",
              "Content-Type": "multipart/form-data",
            },
          })
            .then((res) => {
              console.log(res);
            })

            .catch((err) => {
              if (err) {
                ToastAndroid.show(
                  "check your internet connection",
                  ToastAndroid.LONG
                );
              }
              console.log("code :", err.code, "   ", "message :", err.message);
            });
        } else {
          ToastAndroid.show("no intenet connection", ToastAndroid.LONG);
        }
      });
    })();
  }, []);
  useEffect(() => {});
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
          backgroundColor: "#fff",
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            marginVertical: 20,
            textAlign: "center",
            color: "#000",
            fontSize: 18,
          }}
        >
          Check out your listing!
        </Text>
        <View>
          <Image
            source={{ uri: housePost.houseImages[1].uri }}
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
              width: "90%",
              aspectRatio: 2,
              alignSelf: "center",
              borderRadius: 10,
            }}
          />
          <Text style={{ fontSize: 30, fontWeight: "600", marginVertical: 20 }}>
            Fun place {housePost.placeName}
          </Text>
          <Divider />
          <View style={{ marginVertical: "2%" }}>
            <Text style={{ marginVertical: "2%", fontSize: 16 }}>
              amenities
            </Text>
            {housePost?.amenities?.map((item, index) => {
              return (
                <View key={index + 1} style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      color: "#fff",
                      borderRadius: 15,
                      backgroundColor: "#0244d0",
                    }}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
          <Divider />
          <View style={{ marginVertical: "2%" }}>
            <Text style={{ marginVertical: "2%", fontSize: 16 }}>
              Best Describe
            </Text>
            {housePost?.bestdescribe?.map((item, index) => {
              return (
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      color: "#fff",
                      borderRadius: 15,
                      backgroundColor: "#0244d0",
                    }}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
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
          <Divider />
          <Divider />
          <Text style={{ marginVertical: 20, fontSize: 16 }}>
            Salary : {housePost?.price}
          </Text>
          <Divider />
          <Divider />
          <Text style={{ marginVertical: 10, fontSize: 16 }}>
            Property Type
          </Text>

          <Text style={{ marginVertical: 5, fontSize: 16 }}>
            {housePost?.propertyType}
          </Text>
          <Divider />
          <Text style={{ marginVertical: 10, fontSize: 16 }}>Place title</Text>

          <Text style={{ marginVertical: 5, fontSize: 16 }}>
            {housePost?.placetitle}
          </Text>
          <Divider />
          <Divider />
          <Text style={{ marginVertical: 10, fontSize: 16 }}>
            Place description
          </Text>

          <Text style={{ marginVertical: 5, fontSize: 16 }}>
            {housePost?.placetitle}
          </Text>
          <Divider />
          <Text style={{ marginVertical: 10, fontSize: 16 }}>Description</Text>
          <Text style={{ marginVertical: 5 }}>
            {housePost.detaildescription}
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
          onPress={() => {
            navigation.navigate("lesser/");
          }}
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
