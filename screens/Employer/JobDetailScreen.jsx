import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React from "react";
import { Divider, Badge } from "react-native-paper";
import { useMutation, useQuery } from "react-query";
import { useQueryClient } from "react-query";
import fromNow from "../../utils/time";
import * as FileSystem from "expo-file-system";
import { BASEURI, BASETOKEN } from "../../urls";

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

const JobDetailScreen = ({ navigation, route }) => {
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
  const [downloadProgress, setDownloadProgress] = React.useState();
  const downloadPath =
    FileSystem.documentDirectory + (Platform.OS == "android" ? "" : "");
  const delteMutuation = useMutation(async () => {
    const response = await fetch(`${BASEURI}/employer/job/${data._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${BASETOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("error occured");
    }
    return response.json();
  });
  if (isLoading || isFetching || delteMutuation.isLoading) {
    return (
      <View style={{ marginTop: "50%" }}>
        <ActivityIndicator color={"#0244d0"}></ActivityIndicator>
      </View>
    );
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
          <Text style={{ color: "#fff" }}>Applicants</Text>
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
          <Text style={{ color: "#fff" }}>Approved</Text>
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
          <Text style={{ color: "#fff" }}>Rejected</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ marginBottom: 100, backgroundColor: "#fff" }}
        showsVerticalScrollIndicator={false}
      >
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
              <Text>Category : {data.category}</Text>
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

            {data.budget ? (
              <View>
                <Text>
                  Salary : {data.budget.from} - {data.budget.to}
                </Text>
              </View>
            ) : (
              <View>
                <Text>Salary : {data.paymentStyle}</Text>
              </View>
            )}
            {data.englishLevel ? (
              <View>
                <Text>English Level : {data.englishLevel}</Text>
              </View>
            ) : (
              <></>
            )}
            <View>
              <Text>CV : {data?.cvRequired ? "Required" : "Not Required"}</Text>
            </View>
            <View>
              <Text>permanent : {data?.permanent ? "Yes" : "No"}</Text>
            </View>
            {data.hourPerWeek ? (
              <View>
                <Text>Hours Per Week : data.hourPerWeek</Text>
              </View>
            ) : (
              <></>
            )}
            {data.gender ? (
              <View>
                <Text>Gender: {data.gender}</Text>
              </View>
            ) : (
              <></>
            )}
            {data.deadline ? (
              <View>
                <Text>
                  Deadline:{" "}
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
            Delete Post
          </Text>
        </TouchableOpacity>
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
          <Text style={{ textAlign: "center", color: "#fff" }}>Edit Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobDetailScreen;
