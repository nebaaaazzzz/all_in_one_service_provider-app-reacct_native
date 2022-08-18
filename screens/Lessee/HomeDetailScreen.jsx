import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  ToastAndroid,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { BASEURI, BASETOKEN, MAPBOXURI, MAPBOXTOKEN } from "../../urls";
import { UserContext } from "./../../App.Navigator";
import React, { useContext } from "react";
import { Divider } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";

const fetchHouse = async ({ queryKey }) => {
  const response = await fetch(`${BASEURI}/lessee/house/${queryKey[1]}`, {
    headers: {
      Authorization: `Bearer ${
        BASETOKEN || (await SecureStore.getItemAsync("token"))
      }`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return (await response.json()).data;
};

const HomeDetailScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const user = useContext(UserContext);
  const clientQuery = useQueryClient();
  const { isLoading, isError, error, data, isFetching, isSuccess } = useQuery(
    ["house", route.params.id],
    fetchHouse
  );
  const dime = useWindowDimensions();

  const applyMutuation = useMutation(async () => {
    const response = await fetch(`${BASEURI}/lessee/apply/${data._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BASETOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("error occured");
    }
    return response.json();
  });
  if (isLoading || isFetching || applyMutuation.isLoading) {
    return (
      <View style={{ marginTop: "50%" }}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }
  if (isError) {
    ToastAndroid.show(
      error.message || applyMutuation.error.message,
      ToastAndroid.LONG
    );
  }
  if (applyMutuation.isSuccess) {
    if (data.applied) {
      navigation.goBack();
      clientQuery.invalidateQueries(["appliedhouses"]);
      ToastAndroid.show("successfully removed", ToastAndroid.LONG);
    } else {
      navigation.navigate("lessee/");
      clientQuery.invalidateQueries(["houses"]);

      ToastAndroid.show("successfully applied", ToastAndroid.LONG);
    }
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={"#0244d0"}></ActivityIndicator>
      </View>
    );
  }
  if (isSuccess) {
    clientQuery.invalidateQueries("appliedhouses");
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
        <Text style={{ fontSize: 22, marginVertical: 10, textAlign: "center" }}>
          {data.placeTitle}
        </Text>
        <Text style={{ fontSize: 22, marginVertical: 10, textAlign: "center" }}>
          {data?.closed ? "closed" : ""}
        </Text>
        {data?.deleted ? <Text>Job deleted</Text> : <></>}
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
              navigation.navigate("lessee/viewimages", {
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
            <Text style={{ color: "#fff" }}>{t("view")}</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 30, fontWeight: "600", marginVertical: 20 }}>
            place {data.placeName}
          </Text>
          {data.region ? (
            <Text>
              {t("region")} :{" "}
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
                {t("guesttt")}
              </Text>
              {data?.guestFav?.map((item, index) => {
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
                {t("Safty")}
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
                {t("Amenities")}
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
              {data?.bestdescribe?.map((item, index) => {
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

          <Divider />

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
              {t("prop")}:{" "}
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
              {t("price")} :{" "}
              <Text style={{ color: "rgba(0,0,0,0.7)" }}>
                {data.price} birr
              </Text>
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
              {t("Kind")} :{" "}
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
              {t("ped")}
            </Text>
            <View>
              <Text style={{ fontSize: 16 }}>
                {t("Typee")} :{"  "}
                <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                  {data.placeDescription.title}
                </Text>
              </Text>
              <Text style={{ fontSize: 16 }}>
                {t("des")} :{" "}
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
              {t("detail")}
            </Text>
            <Text style={{ fontSize: 16 }}>{data.detailDescription}</Text>
          </View>
        </View>
        {data.isUserApproved ? (
          <View style={{ paddingHorizontal: "5%", marginTop: "5%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18 }}>{t("phoneno")}</Text>
              <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                {data?.user?.phoneNumber}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18 }}>{t("Email")}</Text>
              <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                {data?.user?.email}
              </Text>
            </View>
            <View
              style={{
                width: dime.width,
                height: 200,
                backgroundColor: "blue",
                flex: 1,
                alignItems: "center",
                justifyContext: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{
                  flex: 1,
                  width: dime.width,
                  borderRadius: 10,
                  backgroundColor: "#0244d0",
                }}
                source={{
                  uri: `${MAPBOXURI}/staticmap?style=osm-carto&width=${500}&height=${600}&center=lonlat:${
                    data.location.coordinates[0]
                  },${data.location.coordinates[1]}&zoom=14&marker=lonlat:${
                    data.location.coordinates[0]
                  },${
                    data.location.coordinates[1]
                  };color:%23ff0000;size:medium&apiKey=${MAPBOXTOKEN}`,
                }}
              />
            </View>
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
      <View
        style={{
          backgroundColor: "#fff",
          borderTopWidth: 2,
          alignItems: "flex-end",
          height: 50,
          justifyContent: "center",
          borderColor: "rgba(0,0,0,0.3)",
        }}
      >
        {data.applied ? (
          <TouchableOpacity
            onPress={() => {
              applyMutuation.mutate();
            }}
            style={{
              backgroundColor: data.applied ? "red" : "#0244d0",
              width: 100,
              right: 30,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>
              {t("rem")}
            </Text>
          </TouchableOpacity>
        ) : data.isUserApproved || data.isUserRejected ? (
          <></>
        ) : user?.left > 0 ? (
          data?.closed ? (
            <></>
          ) : (
            <TouchableOpacity
              onPress={() => {
                applyMutuation.mutate();
              }}
              style={{
                backgroundColor: data.applied ? "red" : "#0244d0",
                width: 100,
                right: 30,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
              }}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>Apply</Text>
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("lesse/payment");
            }}
            style={{
              backgroundColor: "#0244d0",
              width: 100,
              right: 30,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>
              {t("pay")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default HomeDetailScreen;
