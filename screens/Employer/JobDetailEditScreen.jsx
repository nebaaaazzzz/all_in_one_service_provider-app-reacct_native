import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { BASETOKEN, BASEURI } from "../../urls";
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
    ["job", "629ef13df462f9bdfebbde07"],
    fetchJob
  );
  if (isLoading || isFetching) {
    return (
      <View style={{ marginTop: "50%" }}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }
  if (isError) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }
  return (
    <>
      <JobDetailScreen data={data} show navigation={navigation} />
    </>
  );
};

export default JobDetailEditScreen;
