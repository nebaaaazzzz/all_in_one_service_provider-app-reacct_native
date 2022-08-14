import React, { useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { BASEURI, BASETOKEN } from "../../urls";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserContext } from "../../App.Navigator";
import { QueryCache } from "react-query";
import * as SecureStore from "expo-secure-store";

import { useQuery, useQueryClient } from "react-query";

// Get QueryClient from the context

const CustomDrawer = (props) => {
  const queryClient = useQueryClient();

  const user = useContext(UserContext);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#0244d0" }}
      >
        <ImageBackground
          source={require("../../assets/images/menu-bg.jpeg")}
          style={{ padding: 20 }}
        >
          <Image
            source={{
              uri: `${BASEURI}/profile-pic/${user.profilePic}`,
              // uri: `${BASEURI}/profile-pic/${userContext.profilePic}`,
              headers: {
                Authorization: `Bearer ${BASETOKEN}`,
              },
            }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              marginBottom: 5,
            }}
          >
            {user.firstName + " " + user.lastName}
          </Text>
          {/* <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#fff",
                marginRight: 5,
              }}
            >
              280 Coins
            </Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
          </View> */}
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#0244d0" }}
      >
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} color="#0244d0" />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Share
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await SecureStore.deleteItemAsync("token");
            queryClient.resetQueries();
            queryClient.clear();
          }}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} color="#0244d0" />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
