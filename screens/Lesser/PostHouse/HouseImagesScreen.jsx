import {
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, createRef, useEffect } from "react";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";

import * as MediaLibrary from "expo-media-library";
const HouseImagesScreen = () => {
  const [imgUri, setImgUri] = useState([]);
  const [visible, setVisible] = useState([]);
  const [coverPhotoIndex, setCoverPhotoIndex] = useState(0);
  const openMenu = (index) =>
    setVisible(
      visible.map((i, j) => {
        return j === index ? true : false;
      })
    );

  const closeMenu = (index) =>
    setVisible(
      visible.map((i, j) => {
        return j === index ? false : false;
      })
    );
  useEffect(() => {
    if (coverPhotoIndex >= imgUri.length) {
      setCoverPhotoIndex(0);
    }
  }, [coverPhotoIndex]);
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
      <View
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
          Let us know what your place has to offer
        </Text>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
          style={{
            marginTop: 10,
          }}
        >
          {imgUri.map((item, index) => {
            return (
              <View
                onPress={async () => {
                  let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                  });
                  if (!result.cancelled) {
                    setImgUri(
                      imgUri.map((i, j) => {
                        if (j === i) {
                          return result.uri;
                        }
                        return i;
                      })
                    );
                  }
                }}
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  marginVertical: 10,
                  width: "90%",
                  height: 200,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    zIndex: 2,
                    left: 3,
                    top: 3,
                  }}
                >
                  {coverPhotoIndex === index ? (
                    <Text
                      style={{
                        backgroundColor: "white",
                        padding: 5,
                        borderRadius: 5,
                        fontWeight: "700",
                      }}
                    >
                      Cover Photo
                    </Text>
                  ) : (
                    <></>
                  )}
                </View>
                <View style={{ position: "absolute", right: 5, zIndex: 2 }}>
                  <Menu
                    contentStyle={{ borderRadius: 10 }}
                    visible={visible[index]}
                    onDismiss={() => closeMenu(index)}
                    anchor={
                      <Pressable
                        onPress={() => openMenu(index)}
                        style={{
                          backgroundColor: "rgba(255,255,255,0.8)",
                          borderRadius: 50,
                          elevation: 10,
                        }}
                      >
                        <MaterialIcon name="more-horiz" size={30} />
                      </Pressable>
                    }
                  >
                    {imgUri.length - 1 !== index ? (
                      <Menu.Item onPress={() => {}} title="Move Forward" />
                    ) : (
                      <></>
                    )}

                    {index !== 0 ? (
                      <Menu.Item onPress={() => {}} title="Move Backward" />
                    ) : (
                      <></>
                    )}
                    {coverPhotoIndex !== index ? (
                      <Menu.Item
                        onPress={() => {
                          setCoverPhotoIndex(index);
                        }}
                        title="Make Cover photo"
                      />
                    ) : (
                      <></>
                    )}

                    <Menu.Item
                      titleStyle={{ color: "red" }}
                      onPress={() => {
                        setImgUri(
                          imgUri.filter((i) => {
                            return i != index;
                          })
                        );
                      }}
                      title="Delete"
                    />
                  </Menu>
                </View>

                <Image
                  source={{
                    uri: item,
                  }}
                  style={{
                    width: "100%",
                    height: 200,
                  }}
                />
              </View>
            );
          })}
          <Pressable
            onPress={async () => {
              let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });

              if (!result.cancelled) {
                setImgUri([...imgUri, result.uri]);
                setVisible([...visible, false]);
              }
            }}
            style={{
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.2)",
              marginVertical: 10,
              width: "90%",
              paddingVertical: "20%",
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Icon name={"file-image-plus"} size={30} />
            <Text>Add at lest 5 potos</Text>
            <Text>Upload from your device</Text>
          </Pressable>
        </ScrollView>
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
            backgroundColor: imgUri.length < 5 ? "rgba(0,0,0,0.7)" : "#0099ff",
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
  );
};

export default HouseImagesScreen;