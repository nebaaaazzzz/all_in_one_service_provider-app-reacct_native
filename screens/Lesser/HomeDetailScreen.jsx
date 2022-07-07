import {
  ScrollView,
  View,
  Text,
  Pressable,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
import { useQuery } from "react-query";
import { BASEURI, BASETOKEN } from "../../urls";
const fetchHouse = async (id) => {
  console.log(`${BASEURI}/lesser/house/${id}`);
  const house = await fetch(`${BASEURI}/lesser/house/${id}`, {
    headers: {
      Authorization: `Bearer ${BASETOKEN}`,
    },
  });
  const response = await house.json();
  con;
  return response;
};
const HomeDetailScreen = ({ navigation, route }) => {
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["house", route.params.id],
    () => {
      fetchHouse(route.params.id);
    }
  );
  console.log(data);
  if (isLoading) {
    return (
      <View style={{ marginTop: "50%" }}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }
  if (isError) {
    return <View>{error.message}</View>;
  }
  return (
    <View
      horizontal={false}
      style={{
        flex: 1,
        // backgroundColor: "#0099ff",
        backgroundColor: "rgba(0,0,0,0.3)",
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
          <Text style={{ fontSize: 30, fontWeight: "600", marginVertical: 20 }}>
            Fun place
            {data?.placeName}
          </Text>
          <Divider />
          <View style={{ marginVertical: "2%" }}>
            <Text style={{ marginVertical: "2%", fontSize: 16 }}>
              amenities
            </Text>
            {data?.amenities?.map((item, index) => {
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
            {data?.bestdescribe?.map((item, index) => {
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
            Price : {data?.price}
          </Text>
          <Divider />
          <Divider />
          <Text style={{ marginVertical: 10, fontSize: 16 }}>
            Property Type
          </Text>

          <Text style={{ marginVertical: 5, fontSize: 16 }}>
            {data?.propertyType}
          </Text>
          <Divider />
          <Text style={{ marginVertical: 10, fontSize: 16 }}>Place title</Text>

          <Text style={{ marginVertical: 5, fontSize: 16 }}>
            {data?.placetTitle}
          </Text>
          <Divider />
          <Divider />
          <Text style={{ marginVertical: 10, fontSize: 16 }}>
            Place description
          </Text>

          <Text style={{ marginVertical: 5, fontSize: 16 }}>
            {data?.placeTitle}
          </Text>
          <Divider />
          <Text style={{ marginVertical: 10, fontSize: 16 }}>Description</Text>
          {/* <Text style={{ marginVertical: 5 }}>{data.detailDescription}</Text> */}
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
            postHouse();
          }}
          style={{
            backgroundColor: "#0244d0",
            width: 100,
            right: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Edit</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeDetailScreen;
