import React, { useContext, useEffect } from "react";
import { UserContext } from "../../App.Navigator";
import { BASETOKEN, BASEURI } from "../../urls";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";

//       <Text>{user.email}</Text>
//       <Text>{user.description}</Text>
//       <View>
//         {user.skills.map((skill, index) => {
//           return <Text key={index + 1}>{skill}</Text>;
//         })}
//       </View>
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Avatar, Title, Caption, Text, Divider } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfileScreen from "./EditProfileScreen";
const ProfileStackNavigator = createStackNavigator();
const Profile = ({ navigation }) => {
  const user = useContext(UserContext);
  const [cvExists, setCvExists] = React.useState(false);
  const localFile = `${RNFS.DocumentDirectoryPath}/${user.cv}`;
  useEffect(() => {
    async function check() {
      setCvExists(
        await RNFS.exists(`${RNFS.DocumentDirectoryPath}/${user.cv}`)
      );
    }
    check();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Avatar.Image
              source={{
                uri: `${BASEURI}/profile-pic/${user.profilePic}`,
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
                {user.firstName + " " + user.lastName}
              </Title>
              <Caption style={styles.caption}>{user.userName}</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          {user.city || user.region ? (
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#0244d0" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                {user.city} {user.region}
              </Text>
            </View>
          ) : (
            <></>
          )}
          <View style={styles.row}>
            <Icon name="phone" color="#0244d0" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {user.phoneNumber}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="gender-male-female" color="#0244d0" size={20} />
            <Text style={{ color: "rgba(0,0,0,0.6)", marginHorizontal: 20 }}>
              {user.gender}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#0244d0" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {user.email}
            </Text>
          </View>
        </View>

        <Divider />
        <View
          style={{
            paddingHorizontal: "10%",
            marginVertical: 10,
            marginTop: "2%",
          }}
        >
          {user.skills.length ? (
            <View
              style={{
                marginTop: "2%",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Skills
              </Text>
              <Divider />

              {user.skills.map((item, index) => (
                <View
                  key={index + 1}
                  style={{
                    flexDirection: "row",
                    // backgroundColor: "#0244d0",
                    margin: 5,
                    padding: "3%",
                    paddingVertical: 5,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      marginHorizontal: "3%",
                    }}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <></>
          )}
          {user.education.length ? (
            <View>
              <Text style={{ fontWeight: "bold" }}>Education</Text>
              {user.education.map((item, index) => {
                return (
                  <View key={index + 1}>
                    <Divider style={{ borderWidth: 0.25 }} />
                    <Text>{item.institution}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Text>
                          {new Date(item.start).getMonth() +
                            "/" +
                            new Date(item.start).getFullYear()}
                          -
                        </Text>
                        <Text>
                          {new Date(item.to).getMonth() +
                            "/" +
                            new Date(item.to).getFullYear()}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>
                        {item.major} {"    "}
                      </Text>
                      <Text>{item.degree}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <></>
          )}
          {user.languages.length ? (
            <View style={{ marginVertical: 15 }}>
              <Text style={{ fontWeight: "bold" }}>Languages</Text>
              <Divider />
              <View style={{ paddingVertical: 10 }}>
                {user.languages.map((item, index) => {
                  return (
                    <View
                      key={index + 1}
                      style={{
                        paddingVertical: 5,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <View
                        style={{
                          paddingRight: "10%",
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexDirection: "row",
                        }}
                      >
                        <Text>{item.language}</Text>
                        <Text>{item.level}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          ) : (
            <></>
          )}

          <View style={{ paddingHorizontal: "5%", marginVertical: "5%" }}>
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginVertical: "5%",
              }}
            >
              Bio
            </Text>
            <Text style={{ borderWidth: 0.6, borderRadius: 5, padding: 15 }}>
              {user.description}
            </Text>
          </View>
          {user.cv ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#0244d0",
                paddingVertical: 5,
                paddingHorizontal: 5,
                borderRadius: 5,
              }}
              onPress={async () => {
                if (cvExists) {
                  FileViewer.open(localFile);
                } else {
                  const options = {
                    fromUrl: `${BASEURI}/cv/${user.cv}`,
                    toFile: localFile,
                  };
                  RNFS.downloadFile(options, {
                    begin: (s) => console.log(s),
                    progress: (s) => {
                      console.log(s);
                    },
                  })
                    .promise.then(() => FileViewer.open(localFile))
                    .then(() => {
                      // success
                    })
                    .catch((error) => {
                      // error
                    });
                }
              }}
            >
              {cvExists ? (
                <Text
                  style={{
                    textAlign: "center",
                    paddingVertical: 5,
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Open cv
                </Text>
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    paddingVertical: 5,
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Download and open cv
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const ProfileScreen = ({ navigation }) => {
  return (
    <ProfileStackNavigator.Navigator>
      <ProfileStackNavigator.Screen
        options={{
          title: "profile",
          headerTitle: "",
          headerStyle: {
            elevation: 0,
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginHorizontal: "5%" }}
              onPress={() => {
                navigation.navigate("profile/edit");
              }}
            >
              <FontAwesome5 name="user-edit" size={24} color="#0244d0" />
            </TouchableOpacity>
          ),
        }}
        name="profile/"
        component={Profile}
      />
      <ProfileStackNavigator.Screen
        name="profile/edit"
        options={{
          title: "Edit profile",
        }}
        component={EditProfileScreen}
      />
    </ProfileStackNavigator.Navigator>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
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
