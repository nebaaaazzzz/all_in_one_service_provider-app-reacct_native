import {
  ScrollView,
  View,
  Text,
  Pressable,
  StatusBar,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { BASEURI, BASETOKEN } from "../../urls";
import React from "react";
import { Divider } from "react-native-paper";
const fetchHouse = async ({ queryKey }) => {
  const response = await fetch(`${BASEURI}/lesser/house/${queryKey[1]}`, {
    headers: {
      Authorization: `Bearer ${BASETOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return (await response.json()).data;
};

const HomeDetailScreen = ({ navigation, route }) => {
  const clientQuery = useQueryClient();
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["house", route.params.id],
    fetchHouse
  );
  if (isLoading || isFetching) {
    return (
      <View style={{ marginTop: "50%" }}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }
  if (isError) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={"#0244d0"}></ActivityIndicator>
      </View>
    );
  }
  if (isSuccess) {
    navigation.navigate("lesser/");
    clientQuery.invalidateQueries("myhouses");
  }
  if (isError) {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }

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
            marginVertical: 10,
            textAlign: "center",
            color: "#000",
            fontSize: 18,
          }}
        >
          Check out your listing!
        </Text>
        <Text style={{ fontSize: 22, marginVertical: 10, textAlign: "center" }}>
          {data.placeTitle}
        </Text>

        <View>
          <Divider />
          <Image
            source={{ uri: data.houseImages[1].uri }}
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
              width: "90%",
              aspectRatio: 2,
              alignSelf: "center",
              borderRadius: 10,
            }}
          />
          <Pressable
            onPress={() => {
              navigation.navigate("lesser/posthouse/viewimages", {
                images: data.houseImages,
              });
            }}
            style={{
              backgroundColor: "#0244d0",
              alignSelf: "center",
              paddingVertical: 5,
              marginVertical: 5,
              elevation: 10,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#fff" }}>View All Images</Text>
          </Pressable>
          <Text style={{ fontSize: 30, fontWeight: "600", marginVertical: 20 }}>
            Fun place {data.placeName}
          </Text>
          {data.region ? (
            <Text>
              Region :{" "}
              <Text style={{ color: "rgba(0,0,0,0.6)" }}>{data.region}</Text>
            </Text>
          ) : (
            <></>
          )}
          <Text></Text>
          <Divider />
          {data?.guestFav?.length ? (
            <View style={{ marginVertical: "2%" }}>
              <Text style={{ marginVertical: "2%", fontSize: 16 }}>
                guest favourite
              </Text>
              {data?.guestFav?.map((item, index) => {
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
          ) : (
            <></>
          )}
          <Divider />
          {data?.saftyItems?.length ? (
            <View style={{ marginVertical: "2%" }}>
              <Text style={{ marginVertical: "2%", fontSize: 16 }}>
                amenities
              </Text>
              {data?.saftyItems?.map((item, index) => {
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
          ) : (
            <></>
          )}
          <Divider />
          {data?.amenities?.length ? (
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
          ) : (
            <></>
          )}
          <Divider />
          {data?.bestDescribe?.length ? (
            <View style={{ marginVertical: "2%" }}>
              <Text style={{ marginVertical: "2%", fontSize: 16 }}>
                Best Describe
              </Text>
              {data?.bestdescribe?.map((item, index) => {
                return (
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      key={index + 1}
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
          ) : (
            <></>
          )}

          <Divider />
          {data?.contain?.length ? (
            <View style={{ marginVertical: "2%" }}>
              <Text style={{ marginVertical: "2%", fontSize: 16 }}>
                Contain
              </Text>
              {data?.contain?.map((item, index) => {
                return (
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      key={index + 1}
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
          ) : (
            <></>
          )}

          <Divider />
          <View
            style={{
              marginVertical: 20,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.7)" }}>
              Kitchens : {data.guestSize.kitchens}
            </Text>
            <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.7)" }}>
              bedrooms : {data.guestSize.bedrooms}
            </Text>
            <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.7)" }}>
              bathrooms : {data.guestSize.bathrooms}
            </Text>
          </View>
          <Divider />
          <View
            style={{
              marginVertical: 15,
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 17 }}>
              Property Type :{" "}
              <Text style={{ color: "rgba(0,0,0,0.7)" }}>
                {data.propertyType}
              </Text>
            </Text>
          </View>
          <Divider />
          <View
            style={{
              marginVertical: 15,
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 17 }}>
              Price :{" "}
              <Text style={{ color: "rgba(0,0,0,0.7)" }}>{data.price}</Text>
            </Text>
          </View>
          <Divider />
          <View
            style={{
              marginVertical: 15,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 17 }}>
              Place Kind :{" "}
              <Text style={{ color: "rgba(0,0,0,0.7)" }}>{data.placeKind}</Text>
            </Text>
          </View>
          <Divider />

          <View
            style={{
              marginVertical: 20,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}
            >
              Place Description
            </Text>
            <View>
              <Text style={{ fontSize: 16 }}>
                Type :{"  "}
                <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                  {data.placeDescription.title}
                </Text>
              </Text>
              <Text style={{ fontSize: 16 }}>
                Description :{" "}
                <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                  {data.placeDescription.description}
                </Text>
              </Text>
            </View>
          </View>
          <Divider />
          <View
            style={{
              marginVertical: 20,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}
            >
              Detail Description
            </Text>
            <Text style={{ fontSize: 16 }}>{data.detailDescription}</Text>
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
            mutate();
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
          <Text style={{ textAlign: "center", color: "#fff" }}>
            Save your listing
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeDetailScreen;
