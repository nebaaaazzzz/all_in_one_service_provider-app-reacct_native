import { useQuery, useMutation } from "react-query";
import { BASEURI, BASETOKEN } from "../../urls";
import React, { useEffect } from "react";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";

import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Avatar, Title, Caption, Text, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";

const fetchUser = async ({ queryKey }) => {
  let token;
  (async () => {
    token = await SecureStore.getItemAsync("token");
  })();
  const response = await fetch(
    `${BASEURI}/employer/${queryKey[1]}/${queryKey[2]}`,
    {
      headers: {
        Authorization: `Bearer ${
          BASETOKEN || (await SecureStore.getItemAsync("token"))
        }`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};
const UserDetailScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const approveMutation = useMutation(async () => {
    const response = await fetch(
      `${BASEURI}/employer/accept/${route.params.id}/${route.params.jobId}`,
      {
        headers: {
          Authorization: `Bearer ${BASETOKEN}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  });
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["user", route.params.jobId, route.params.id],
    fetchUser
  );
  const rejectMutation = useMutation(async () => {
    const response = await fetch(
      `${BASEURI}/employer/reject/${route.params.id}/${route.params.jobId}`,
      {
        headers: {
          Authorization: `Bearer ${BASETOKEN}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  });
  const user = data;
  const [cvExists, setCvExists] = React.useState(false);
  const localFile = `${RNFS.DocumentDirectoryPath}/${user?.cv}`;
  useEffect(() => {
    async function check() {
      setCvExists(
        await RNFS.exists(`${RNFS.DocumentDirectoryPath}/${user?.cv}`)
      );
    }
    check();
  }, []);
  if (
    isLoading ||
    isFetching ||
    rejectMutation.isLoading ||
    approveMutation.isLoading
  ) {
    return (
      <View style={{ marginTop: "50%" }}>
        <ActivityIndicator color={"#0244d0"}></ActivityIndicator>
      </View>
    );
  }
  if (isError) {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }
  if (rejectMutation.isSuccess || approveMutation.isSuccess) {
    queryClient.invalidateQueries("jobapplicants");
    navigation.navigate("employer/applicants/");
  }
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
                {t("skill")}
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
              <Text style={{ fontWeight: "bold" }}>{t("edu")}</Text>
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
              <Text style={{ fontWeight: "bold" }}>{t("language")}</Text>
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
              {t("bio")}
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
                  {t("open")}
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
                  {t("down")}
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
      {user.approved ? (
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
          <TouchableOpacity
            onPress={() => {
              rejectMutation.mutate();
            }}
            style={{
              backgroundColor: "red",
              width: 100,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>
              {t("rej")}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      {/* if user is rejected */}
      {/* if user is rejected */}
      {/* if user is rejected */}
      {user.rejected ? (
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
          <TouchableOpacity
            onPress={() => {
              approveMutation.mutate();
            }}
            style={{
              backgroundColor: "#0244d0",
              width: 100,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>
              {t("Approve")}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      {/* if user is rejected */}
      {/* if user is rejected */}
      {/* if user is rejected */}
      {user.applied ? (
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
          <TouchableOpacity
            onPress={() => {
              rejectMutation.mutate();
            }}
            style={{
              backgroundColor: "red",
              width: 100,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>
              {t("rej")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              approveMutation.mutate();
            }}
            style={{
              backgroundColor: "#0244d0",
              width: 100,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>
              {t("Approve")}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default UserDetailScreen;

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
