import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useTransition } from "react";
import { Divider } from "react-native-paper";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { BASEURI, BASETOKEN, MAPBOXURI, MAPBOXTOKEN } from "../../urls";

import fromNow from "../../utils/time";
import * as FileSystem from "expo-file-system";
import { useIsFocused } from "@react-navigation/native";
import { UserContext } from "../../App.Navigator";
import RNFS from "react-native-fs";
import { useTranslation } from "react-i18next";

const fetchJob = async ({ queryKey }) => {
  const response = await fetch(`${BASEURI}/employee/job/${queryKey[1]}`, {
    headers: {
      Authorization: `Bearer ${BASETOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return (await response.json()).data;
};

const JobDetailScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const user = useContext(UserContext);
  const { isLoading, isError, error, data, isFetching, isSuccess } = useQuery(
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
  const clientQuery = useQueryClient();

  const applyMutuation = useMutation(async () => {
    if (data.cvRequired) {
      ToastAndroid.show(
        "Please Compelte your profile first",
        ToastAndroid.LONG
      );
    }
    const response = await fetch(`${BASEURI}/employee/apply/${data._id}`, {
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
  const isFocused = useIsFocused();
  if (!isFocused) {
    clientQuery.invalidateQueries("job");
  }
  if (isLoading || isFetching || applyMutuation.isLoading) {
    return (
      <View style={{ marginTop: "50%" }}>
        <ActivityIndicator color={"#0244d0"}></ActivityIndicator>
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
      clientQuery.invalidateQueries(["appliedjobs"]);

      clientQuery.invalidateQueries(["jobs"]);

      ToastAndroid.show("successfully removed", ToastAndroid.LONG);
    } else {
      navigation.navigate("employee/");

      clientQuery.invalidateQueries(["jobs"]);

      ToastAndroid.show("successfully applied", ToastAndroid.LONG);
    }
    clientQuery.invalidateQueries("jobs");
    navigation.navigate("employee/home");
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={"#0244d0"}></ActivityIndicator>
      </View>
    );
  }
  if (isSuccess) {
    clientQuery.invalidateQueries("appliedjobs");
  }
  if (isError) {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{ textAlign: "center", fontSize: 25, marginVertical: "5%" }}
        >
          {data.title}
        </Text>
        {data?.deleted ? <Text>Job deleted</Text> : <></>}
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
                {t("experience")} : {data?.experience?.title}
              </Text>
            </View>
            {data.cvRequired ? (
              <View>
                <Text>{t("cv1")}</Text>
              </View>
            ) : (
              <></>
            )}
            {data.permanent ? (
              <View>
                <Text>{t("permanent1")}</Text>
              </View>
            ) : (
              <></>
            )}
            {data.deadline ? (
              <View>
                <Text>
                  {t("deaddate")} {new Date(data.deadline).toDateString()}
                </Text>
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
                  {t("salary")} : {t("")}
                </Text>
              </View>
            )}
            {data.englishLevel ? (
              <View>
                <Text>
                  {t("engl")}: {data.englishLevel}
                </Text>
              </View>
            ) : (
              <></>
            )}
            {data.hourPerWeek ? (
              <View>
                <Text>
                  {t("hours")} : {data.hourPerWeek}
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
            <View>
              <Text>
                {t("plac")}: {data.placeName}
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
        {data.isUserApproved ? (
          <View style={{ paddingHorizontal: "5%", marginTop: "5%" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18 }}>{t("phoneno")}</Text>
              <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                {data?.user?.phoneNumber}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          height: 60,
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
            <Text style={{ textAlign: "center", color: "#fff" }}>remove</Text>
          </TouchableOpacity>
        ) : data.isUserApproved || data.isUserRejected ? (
          <></>
        ) : user?.left > 0 ? (
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
              {t("apply")}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("employee/payment");
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

export default JobDetailScreen;
