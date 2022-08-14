import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useContext } from "react";
import { Divider } from "react-native-paper";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { BASEURI, BASETOKEN, MAPBOXURI, MAPBOXTOKEN } from "../../urls";

import fromNow from "../../utils/time";
import * as FileSystem from "expo-file-system";
import { useIsFocused } from "@react-navigation/native";
import { UserContext } from "../../App.Navigator";

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
  const user = useContext(UserContext);
  const dimension = useWindowDimensions();
  const { isLoading, isError, error, data, isFetching, isSuccess } = useQuery(
    ["job", route.params.id],
    fetchJob
  );
  const clientQuery = useQueryClient();
  const [downloadProgress, setDownloadProgress] = React.useState();
  const downloadPath =
    FileSystem.documentDirectory + (Platform.OS == "android" ? "" : "");
  const applyMutuation = useMutation(async () => {
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
            Skills Required
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
            Others
          </Text>
          <View
            style={{
              marginBottom: "5%",
              paddingHorizontal: "5%",
            }}
          >
            <View>
              <Text>Category : {data.Category}</Text>
            </View>
            <View>
              <Text>Experience : {data?.experience?.title}</Text>
            </View>
            {data.cvRequired ? (
              <View>
                <Text>Cv required</Text>
              </View>
            ) : (
              <></>
            )}
            {data.permanent ? (
              <View>
                <Text>Permanent Job</Text>
              </View>
            ) : (
              <></>
            )}
            {data.deadline ? (
              <View>
                <Text>deadline {new Date(data.deadline).toDateString()}</Text>
              </View>
            ) : (
              <></>
            )}
            {data.budget ? (
              <View>
                <Text>
                  Salary : {data.budget.from} - {data.budget.to}
                </Text>
              </View>
            ) : (
              <View>
                <Text>Salary : Negotiable</Text>
              </View>
            )}
            {data.englishLevel ? (
              <View>
                <Text>English Level : data.englishLevel</Text>
              </View>
            ) : (
              <></>
            )}
            {data.hourPerWeek ? (
              <View>
                <Text>Hours Per Week : data.hourPerWeek</Text>
              </View>
            ) : (
              <></>
            )}
            {data.gender ? (
              <View>
                <Text>Gender: data.gender</Text>
              </View>
            ) : (
              <></>
            )}
            <View>
              <Text>Place Name : {data.placeName}</Text>
            </View>

            {data.document ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "#0244d0",
                  borderRadius: 5,
                  marginTop: "10%",
                  elevation: 5,
                }}
                onPress={async () => {
                  const { StorageAccessFramework } = FileSystem;
                  const ensureDirAsync = async (dir, intermediates = true) => {
                    const props = await FileSystem.getInfoAsync(dir);
                    if (props.exist && props.isDirectory) {
                      return props;
                    }
                    let _ = await FileSystem.makeDirectoryAsync(dir, {
                      intermediates,
                    });
                    return await ensureDirAsync(dir, intermediates);
                  };
                  const downloadCallback = (downloadProgress) => {
                    const progress =
                      downloadProgress.totalBytesWritten /
                      downloadProgress.totalBytesExpectedToWrite;
                    setDownloadProgress(progress);
                  };
                  const saveAndroidFile = async (
                    fileUri,
                    fileName = "File"
                  ) => {
                    try {
                      const fileString = await FileSystem.readAsStringAsync(
                        fileUri,
                        { encoding: FileSystem.EncodingType.Base64 }
                      );

                      const permissions =
                        await StorageAccessFramework.requestDirectoryPermissionsAsync();
                      if (!permissions.granted) {
                        return;
                      }

                      try {
                        await StorageAccessFramework.createFileAsync(
                          permissions.directoryUri,
                          fileName,
                          "application/pdf"
                        )
                          .then(async (uri) => {
                            await FileSystem.writeAsStringAsync(
                              uri,
                              fileString,
                              { encoding: FileSystem.EncodingType.Base64 }
                            );
                            alert("Report Downloaded Successfully");
                          })
                          .catch((e) => {});
                      } catch (e) {
                        throw new Error(e);
                      }
                    } catch (err) {}
                  };
                  const downloadFile = async (fileUrl) => {
                    if (Platform.OS == "android") {
                      const dir = ensureDirAsync(downloadPath);
                    }

                    let fileName = fileUrl.split("Reports/")[1];
                    //alert(fileName)
                    const downloadResumable =
                      FileSystem.createDownloadResumable(
                        fileUrl,
                        downloadPath + fileName,
                        {},
                        downloadCallback
                      );

                    try {
                      const { uri } = await downloadResumable.downloadAsync();
                      if (Platform.OS == "android")
                        saveAndroidFile(uri, fileName);
                      else saveIosFile(uri);
                    } catch (e) {
                      console.error("download error:", e);
                    }
                  };
                  downloadFile(
                    "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3560/software/release/12-2_25_see/configuration/guide/scg.pdf"
                  );
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    paddingVertical: "3%",
                    color: "#fff",
                  }}
                >
                  Download Full Description
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
          <Divider />
        </View>
        {data.approved || (
          <View style={{ paddingHorizontal: "5%", marginTop: "5%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18 }}>phone Number</Text>
              <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                {data?.user?.phoneNumber}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContext: "center",
              }}
            >
              <Image
                style={{ flex: 1 }}
                source={{
                  uri: `${MAPBOXURI}/staticmap?style=osm-carto&width=${200}&height=${200}&center=lonlat:${
                    data.location.coordinates[0]
                  },${data.location.coordinates[1]}&zoom=14&marker=lonlat:${
                    data.location.coordinates[0]
                  },${
                    data.location.coordinates[1]
                  };color:%23ff0000;size:medium&apiKey=${MAPBOXTOKEN}`,
                }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18 }}>Email</Text>
              <Text style={{ color: "rgba(0,0,0,0.6)" }}>
                {data?.user?.email}
              </Text>
            </View>
          </View>
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
            <Text style={{ textAlign: "center", color: "#fff" }}>Apply</Text>
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
            <Text style={{ textAlign: "center", color: "#fff" }}>Pay</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default JobDetailScreen;
