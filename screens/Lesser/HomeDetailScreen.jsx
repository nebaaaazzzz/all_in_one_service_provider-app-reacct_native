import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BASEURI, BASETOKEN } from "../../urls";
import { Divider, Badge } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

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
  const queryClient = useQueryClient();
  const dimension = useWindowDimensions();
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["house", route.params.id],
    fetchHouse
  );
  const delteMutuation = useMutation(async () => {
    const response = await fetch(`${BASEURI}/lesser/house/${data._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${
          BASETOKEN || (await SecureStore.getItemAsync("token"))
        }`,
      },
    });
    if (!response.ok) {
      throw new Error("error occured");
    }
    return response.json();
  });
  if (isLoading || isFetching || delteMutuation.isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={"#0244d0"}></ActivityIndicator>
      </View>
    );
  }
  if (isError) {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }
  if (delteMutuation.isSuccess) {
    ToastAndroid.show("successfully Deleted", ToastAndroid.LONG);
    queryClient.invalidateQueries("myhouses");
    navigation.goBack();
  }
  if (delteMutuation.isError) {
    ToastAndroid.show(delteMutuation.error.message, ToastAndroid.LONG);
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            marginVertical: 10,
            paddingHorizontal: 10,
            paddingVertical: 3,
            elevation: 10,
            borderRadius: 5,
            marginHorizontal: 10,
            backgroundColor: "#0244d0",
            alignSelf: "flex-end",
          }}
          onPress={() => {
            navigation.navigate("lesser/applicants", {
              id: data._id,
            });
          }}
        >
          <Badge>{data?.applicants?.length || 0} </Badge>
          <Text style={{ color: "#fff" }}>Applicants</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginVertical: 10,
            paddingHorizontal: 10,
            paddingVertical: 3,
            elevation: 10,
            borderRadius: 5,
            marginHorizontal: 10,
            backgroundColor: "#0244d0",
            alignSelf: "flex-end",
          }}
          onPress={() => {
            navigation.navigate("lesser/approved", {
              id: data._id,
            });
          }}
        >
          <Badge>{data?.approved?.length || 0} </Badge>
          <Text style={{ color: "#fff" }}>Approved</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginVertical: 10,
            paddingHorizontal: 10,
            paddingVertical: 3,
            elevation: 10,
            borderRadius: 5,
            marginHorizontal: 10,
            backgroundColor: "#0244d0",
            alignSelf: "flex-end",
          }}
          onPress={() => {
            navigation.navigate("lesser/rejected", {
              id: data._id,
            });
          }}
        >
          <Badge>{data?.rejected?.length || 0} </Badge>
          <Text style={{ color: "#fff" }}>Rejected</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#fff",
          marginBottom: 40,
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ fontSize: 22, marginVertical: 10, textAlign: "center" }}>
          {data.placeTitle}
        </Text>

        <View>
          <Divider />
          <Image
            source={{
              uri: `${BASEURI}/house/image/${data.houseImages[1]}`,
              headers: {
                Authorization: `Bearer ${BASETOKEN}`,
              },
            }}
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
              width: "90%",
              aspectRatio: 2,
              alignSelf: "center",
              borderRadius: 10,
            }}
          />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("lesser/viewimages", {
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
          </TouchableOpacity>
          <Text style={{ fontSize: 30, fontWeight: "600", marginVertical: 20 }}>
            {data.placeName}
          </Text>
          {data.region ? (
            <Text>
              Region :{" "}
              <Text style={{ color: "rgba(0,0,0,0.6)" }}>{data.region}</Text>
            </Text>
          ) : (
            <></>
          )}
          <Divider />
          {data?.guestFavourite?.length ? (
            <View style={{ marginVertical: "2%" }}>
              <Text style={{ marginVertical: "2%", fontSize: 16 }}>
                Guest Favourite
              </Text>
              {data?.guestFavourite?.map((item, index) => {
                return (
                  <View key={index + 1} style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 15,
                        // backgroundColor: "#0244d0",
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
                Safty Items
              </Text>
              {data?.saftyItems?.map((item, index) => {
                return (
                  <View key={index + 1} style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 15,
                        // backgroundColor: "#0244d0",
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
                Amenities
              </Text>
              {data?.amenities?.map((item, index) => {
                return (
                  <View key={index + 1} style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 15,
                        // backgroundColor: "#0244d0",
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
              {data?.bestDescribe?.map((item, index) => {
                return (
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      key={index + 1}
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 15,
                        // backgroundColor: "#0244d0",
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
          position: "absolute",
          top: dimension.height - dimension.height / 4.5,
          backgroundColor: "#fff",
          borderTopWidth: 2,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          height: 60,
          justifyContent: "space-around",
          borderColor: "rgba(0,0,0,0.3)",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            delteMutuation.mutate();
          }}
          style={{
            backgroundColor: "red",
            width: 100,
            marginHorizontal: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>
            Delete Post
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("lesser/posthouse", {
              data,
            });
          }}
          style={{
            backgroundColor: "#0244d0",
            width: 100,
            marginHorizontal: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Edit Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeDetailScreen;
