import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Linking,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Divider } from "react-native-paper";
import { useQuery } from "react-query";
import * as Sharing from "expo-sharing";

import fromNow from "../../utils/time";
import * as FileSystem from "expo-file-system";
import { BASEURI, BASETOKEN } from "../../urls";
import * as MediaLibrary from "expo-media-library";

// Requests permissions for external directory

const fetchJob = async ({ queryKey }) => {
  const response = await fetch(`${BASEURI}/employer/job/${queryKey[1]}`, {
    headers: {
      Authorization: `Bearer ${BASETOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return (await response.json()).data;
};

const JobDetailEditScreen = ({ navigation, route }) => {
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["job", route.params.id],
    fetchJob
  );
  const [downloadProgress, setDownloadProgress] = React.useState();
  const downloadPath =
    FileSystem.documentDirectory + (Platform.OS == "android" ? "" : "");
  if (isLoading || isFetching) {
    return (
      <View style={{ marginTop: "50%" }}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }
  if (isError) {
    navigation.reset({
      index: 1,
      routes: [{ name: "error", params: { error } }],
    });
    return <View></View>;
  }
  return (
    <View>
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
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
                    backgroundColor: "#0244d0",
                    color: "#fff",
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
              <Text>Experience : {data.experience.title}</Text>
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

            {!data.document ? (
              <Pressable
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
                    console.log(fileUri);
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
              </Pressable>
            ) : (
              <></>
            )}
          </View>
          <Divider />
        </View>
      </ScrollView>
    </View>
  );
};

export default JobDetailEditScreen;
