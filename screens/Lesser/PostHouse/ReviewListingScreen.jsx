import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useContext } from "react";
import { Divider } from "react-native-paper";
import { PostHouseContext } from "./PostHouseScreen";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { BASETOKEN, BASEURI } from "../../../urls";
import { useTranslation } from "react-i18next";
const ReviewListingScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const clientQuery = useQueryClient();
  const { housePost } = useContext(PostHouseContext);
  const { isSuccess, isLoading, isError, error, data, mutate } = useMutation(
    async (bool) => {
      const imgFilterList = [];
      const formData = new FormData();
      for await (const img of housePost.houseImages) {
        if (img?.length == 24) {
          imgFilterList.push(img);
        } else {
          const uri = img.uri;
          const arr = uri.split(".");
          const ext = arr[arr.length - 1];
          formData.append("houseImage", {
            uri: img.uri,
            type: "image/" + ext,
            name: uri,
          });
        }
      }
      const newObj = { ...housePost, imgFilterList };
      newObj.guestFavourite = newObj.guestFav;
      delete newObj.guestFav;
      delete newObj.houseImages;
      formData.append("body", JSON.stringify(newObj));
      try {
        const response = await fetch(
          bool
            ? `${BASEURI}/lesser/edit-post/${route.params?.data?._id}`
            : `${BASEURI}/lesser/posthouse`,
          {
            method: "post",
            body: formData,
            headers: {
              Authorization: `Bearer ${BASETOKEN}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (!response.ok) {
          throw new Error((await response.json()).message);
        }
        return response.json();
      } catch (err) {
        throw new Error(err.message);
      }
    }
  );

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
          {t("check")}
        </Text>
        <Text style={{ fontSize: 22, marginVertical: 10, textAlign: "center" }}>
          {housePost.placeTitle}
        </Text>

        <View>
          <Divider />
          {housePost.houseImages[1]?.length == 24 ? (
            <Image
              source={{
                uri: `${BASEURI}/house/image/${housePost.houseImages[1]}`,
                headers: {
                  Authorization: `Bearer ${BASETOKEN}`,
                },
              }}
              style={{
                width: "100%",
                height: 200,
              }}
            />
          ) : (
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
          )}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("lesser/posthouse/viewimages", {
                images: housePost.houseImages,
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
            <Text style={{ color: "#fff" }}>{t("View")}</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 30, fontWeight: "600", marginVertical: 20 }}>
            {t("plac")} {housePost.placeName}
          </Text>
          {housePost.region ? (
            <Text>
              {t("region")} :{" "}
              <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                {housePost.region}
              </Text>
            </Text>
          ) : (
            <></>
          )}
          <Text></Text>
          <Divider />
          {housePost?.guestFav?.length ? (
            <View style={{ marginVertical: "2%" }}>
              <Text style={{ marginVertical: "2%", fontSize: 16 }}>
                {t("Guesttt")}
              </Text>
              {housePost?.guestFav?.map((item, index) => {
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
          {housePost?.saftyItems?.length ? (
            <View style={{ marginVertical: "2%" }}>
              <Text style={{ marginVertical: "2%", fontSize: 16 }}>
                {t("Safty")}
              </Text>
              {housePost?.saftyItems?.map((item, index) => {
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
          {housePost?.amenities?.length ? (
            <View style={{ marginVertical: "2%" }}>
              <Text style={{ marginVertical: "2%", fontSize: 16 }}>
                {t("Amenities")}
              </Text>
              {housePost?.amenities?.map((item, index) => {
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
          {housePost?.bestDescribe?.length ? (
            <View style={{ marginVertical: "2%" }}>
              <Text style={{ marginVertical: "2%", fontSize: 16 }}>
                {t("best")}
              </Text>
              {housePost?.bestDescribe?.map((item, index) => {
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
          {/* {housePost?.bestDescribe?.length ? (
            <View style={{ marginVertical: "2%" }}>
              <Text style={{ marginVertical: "2%", fontSize: 16 }}>
                Best Describe
              </Text>
              {housePost?.bestdescribe?.map((item, index) => {
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
          )} */}

          <Divider />
          {/* {housePost?.contain?.length ? (
            <View style={{ marginVertical: "2%" }}>
              <Text style={{ marginVertical: "2%", fontSize: 16 }}>
                Contain
              </Text>
              {housePost?.contain?.map((item, index) => {
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
          )} */}

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
              {t("price")} :{" "}
              <Text style={{ color: "rgba(0,0,0,0.7)" }}>
                {housePost.price}
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
              <Text style={{ color: "rgba(0,0,0,0.7)" }}>
                {housePost.placeKind}
              </Text>
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
              {t("type")}
            </Text>
            <View>
              <Text style={{ fontSize: 16 }}>
                {t("typee")} :{"  "}
                <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                  {housePost?.placeDescription?.title}
                </Text>
              </Text>
              <Text style={{ fontSize: 16 }}>
                {t("des")} :{" "}
                <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                  {housePost?.placeDescription?.description}
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
            <Text style={{ fontSize: 16 }}>{housePost.detailDescription}</Text>
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
        {route.params?.data ? (
          <TouchableOpacity
            onPress={() => {
              mutate(true);
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
              {t("save")}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              mutate(false);
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
              {t("postt")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ReviewListingScreen;
