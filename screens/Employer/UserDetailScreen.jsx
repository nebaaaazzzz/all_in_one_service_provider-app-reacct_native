import {
  View,
  ActivityIndicator,
  ScrollView,
  Pressable,
  ToastAndroid,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React from "react";
import { useQuery, useQueryClient } from "react-query";

import { BASEURI, BASETOKEN } from "../../urls";
import { useIsFocused } from "@react-navigation/native";

//       <Text>{user.email}</Text>
//       <Text>{user.description}</Text>
//       <View>
//         {user.skills.map((skill, index) => {
//           return <Text key={index + 1}>{skill}</Text>;
//         })}
//       </View>
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  Divider,
} from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// Requests permissions for external directory

const fetchUser = async ({ queryKey }) => {
  const response = await fetch(`${BASEURI}/user/${queryKey[1]}`, {
    headers: {
      Authorization: `Bearer ${BASETOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

const UserDetailScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const queryClient = useQueryClient();
  if (!isFocused) {
    queryClient.invalidateQueries(["user", route.params.id]);
  }
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["user", route.params.id],
    fetchUser
  );
  if (!isFocused) {
    queryClient.invalidateQueries(["user", route.params.id]);
  }
  console.log(data);
  if (isLoading || isFetching) {
    return (
      <View style={{ marginTop: "50%" }}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }
  if (isError) {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Avatar.Image
              source={{
                uri: `${BASEURI}/profile-pic/${data.profilePic}`,
                // uri: `${BASEURI}/profile-pic/${userContext.profilePic}`,
                headers: {
                  Authorization: `Bearer ${BASETOKEN}`,
                },
              }}
              size={80}
            />
            <View style={{ marginLeft: 20 }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}
              >
                {data.firstName + " " + data.lastName}
              </Title>
              <Caption style={styles.caption}>{data.userName}</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              Addis Ababa, Ethiopia
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {data.phoneNumber}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {data.email}
            </Text>
          </View>
        </View>
        <Divider style={{ borderWidth: 0.2 }} />
      </ScrollView>
      <View
        style={{
          backgroundColor: "#fff",
          borderTopWidth: 2,
          flexDirection: "row",
          height: 60,
          alignItems: "center",
          justifyContent: "space-evenly",
          borderColor: "rgba(0,0,0,0.3)",
        }}
      >
        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor: "red",
            width: 100,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Reject</Text>
        </Pressable>
        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor: "#0244d0",
            width: 100,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Approve</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default UserDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
