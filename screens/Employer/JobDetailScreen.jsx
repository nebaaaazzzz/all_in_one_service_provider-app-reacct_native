import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect } from "react";
import { Divider, Badge } from "react-native-paper";
import { useMutation, useQuery } from "react-query";
import { useQueryClient } from "react-query";
import fromNow from "../../utils/time";
import * as FileSystem from "expo-file-system";
import { BASEURI, BASETOKEN } from "../../urls";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";
import RNFS from "react-native-fs";
import { useIsFocused } from "@react-navigation/native";

// Requests permissions for external directory

const fetchJob = async ({ queryKey }) => {
  const response = await fetch(`${BASEURI}/employer/job/${queryKey[1]}`, {
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

const JobDetailScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  // navigation.setOptions({
  const queryClient = useQueryClient();
  //   headerRight: () => (

  //   ),
  // });
  const dimension = useWindowDimensions();
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["job", route.params.id],
    fetchJob
  );
  const [documentExists, setDocumentExists] = React.useState(false);
  const localFile = `${RNFS.DocumentDirectoryPath}/${
    data ? data?.document : ""
  }`;
  useEffect(() => {
    async function check() {
      if (!isLoading) {
        setDocumentExists(
          await RNFS.exists(`${RNFS.DocumentDirectoryPath}/${data.document}`)
        );
      }
    }
    check();
  }, [documentExists, isLoading]);
  const delteMutuation = useMutation(async () => {
    const response = await fetch(`${BASEURI}/employer/job/${data._id}`, {
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
  const isFocused = useIsFocused();
  useEffect(() => {
    queryClient.invalidateQueries(["job", route.params.id]);
  }, [isFocused]);
  const closeMutuation = useMutation(async () => {
    const response = await fetch(`${BASEURI}/employer/close/${data._id}`, {
      method: "PATCH",
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
  if (
    isLoading ||
    isFetching ||
    delteMutuation.isLoading ||
    closeMutuation.isLoading
  ) {
    return (
      <View style={{ marginTop: "50%" }}>
        <ActivityIndicator color={"#0244d0"}></ActivityIndicator>
      </View>
    );
  }
  if (closeMutuation.isError) {
    ToastAndroid.show(closeMutuation.error.message, ToastAndroid.LONG);
  }
  if (closeMutuation.isSuccess) {
    navigation.goBack();
  }
  if (isError) {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }
  if (delteMutuation.isSuccess) {
    ToastAndroid.show("successfully Deleted", ToastAndroid.LONG);
    queryClient.invalidateQueries("myjobs");
    navigation.navigate("employer/");
  }
  if (delteMutuation.isError) {
    ToastAndroid.show(delteMutuation.error.message, ToastAndroid.LONG);
  }
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
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
            navigation.navigate("employer/appicants", {
              id: data._id,
            });
          }}
        >
          <Badge>{data?.applicants?.length || 0} </Badge>
          <Text style={{ color: "#fff" }}>{t("Applicants")}</Text>
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
            navigation.navigate("employer/approved", {
              id: data._id,
            });
          }}
        >
          <Badge>{data?.approved?.length || 0} </Badge>
          <Text style={{ color: "#fff" }}>{t("approved")}</Text>
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
            navigation.navigate("employer/rejected", {
              id: data._id,
            });
          }}
        >
          <Badge>{data?.rejected?.length || 0} </Badge>
          <Text style={{ color: "#fff" }}>{t("rejected")}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ marginBottom: 100, backgroundColor: "#fff" }}
        showsVerticalScrollIndicator={false}
      >
        {data?.closed ? (
          <Text style={{ fontSize: 20, textAlign: "center", color: "#ff0000" }}>
            ....Job Closed.....
          </Text>
        ) : (
          <></>
        )}
        <></>
        <Text
          style={{ textAlign: "center", fontSize: 25, marginVertical: "5%" }}
        >
          {data.title}
        </Text>
        <Divider />
        <Text style={{ color: "rgba(0,0,0,0.6)", marginLeft: 20 }}>
          Posted {fromNow(new Date(data.createdAt))}
        </Text>
        <View style={{ paddingHorizontal: 20, paddingVertical: "5%" }}>
          <Text>{data.description}</Text>
        </View>
        <Divider />

        <Divider />
        <View>
          <Text style={{ margin: 10, fontSize: 18, fontWeight: "bold" }}>
            {t("sk")}
          </Text>
          <View
            style={{
              marginBottom: "5%",
              flexDirection: "row",
              paddingHorizontal: "5%",
            }}
          >
            {data.skills.map((skill, index) => {
              return (
                <Text
                  key={index + 1}
                  style={{
                    marginHorizontal: "2%",
                    // backgroundColor: "#0244d0",
                    paddingHorizontal: "3%",
                    paddingVertical: "2%",
                    borderRadius: 5,
                  }}
                >
                  {skill}
                </Text>
              );
            })}
          </View>
          <Divider />
        </View>
        <View>
          <Text style={{ margin: 10, fontSize: 18, fontWeight: "bold" }}>
            {t("oth")}
          </Text>
          <View
            style={{
              marginBottom: "5%",
              paddingHorizontal: "5%",
            }}
          >
            <View>
              <Text>
                {t("cat")} : {data.category}
              </Text>
            </View>
            <View>
              <Text>
                {t("experience")} : {data.experience.title}
              </Text>
            </View>
            {data.cvRequired ? (
              <View>
                <Text>{t("cv1")} </Text>
              </View>
            ) : (
              <></>
            )}
            {data.permanent ? (
              <View>
                <Text>{t("permanent1")} </Text>
              </View>
            ) : (
              <></>
            )}

            {data.budget ? (
              <View>
                <Text>
                  {t("salary")} : {data.budget.from} - {data.budget.to}
                </Text>
              </View>
            ) : (
              <View>
                <Text>
                  {t("salary")} : {data.paymentStyle}
                </Text>
              </View>
            )}
            {data.englishLevel ? (
              <View>
                <Text>
                  {t("engl")} : {data.englishLevel}
                </Text>
              </View>
            ) : (
              <></>
            )}
            <View>
              <Text>
                {t("cv1")} : {data?.cvRequired ? "Required" : "Not Required"}
              </Text>
            </View>
            <View>
              <Text>
                {t("permanent1")} : {data?.permanent ? "Yes" : "No"}
              </Text>
            </View>
            {data.hourPerWeek ? (
              <View>
                <Text>
                  {t("hours")}: {data.hourPerWeek}
                </Text>
              </View>
            ) : (
              <></>
            )}
            {data.gender ? (
              <View>
                <Text>
                  {t("gende")}: {data.gender}
                </Text>
              </View>
            ) : (
              <></>
            )}
            {data.deadline ? (
              <View>
                <Text>
                  {t("deadline")}:{" "}
                  {new Date(data.deadline).getDate() +
                    "/" +
                    (new Date(data.deadline).getMonth() +
                      "/" +
                      new Date(data.deadline).getFullYear())}
                </Text>
                {data.deadtime ? (
                  <Text>
                    {new Date(data.deadline).getHours() +
                      ":" +
                      new Date(data.deadline).getMinutes()}
                  </Text>
                ) : (
                  <></>
                )}
              </View>
            ) : (
              <></>
            )}
            <View>
              <Text>
                {t("place")}: {data.placeName}
              </Text>
            </View>
            {data.document ? (
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
                      fromUrl: `${BASEURI}/cv/${user.document}`,
                      toFile: localFile,
                    };
                    RNFS.downloadFile(options, {
                      begin: (s) => console.log(s),
                      progress: (s) => {
                        console.log(s);
                      },
                    })
                      .promise.then(() => {
                        setDocumentExists(true);
                        FileViewer.open(localFile);
                      })
                      .then(() => {
                        // success
                      })
                      .catch((error) => {
                        // error
                      });
                  }
                }}
              >
                {documentExists ? (
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
                    Download and open
                  </Text>
                )}
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
          <Divider />
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          top: dimension.height - 130,
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
            {t("delpost")}
          </Text>
        </TouchableOpacity>
        {data?.closed ? (
          <></>
        ) : (
          <TouchableOpacity
            onPress={() => {
              closeMutuation.mutate();
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
              {t("close")}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("employer/editpost", {
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
          <Text style={{ textAlign: "center", color: "#fff" }}>
            {t("editpost")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobDetailScreen;
