import { View, Text } from "react-native";
import React from "react";
import JobDetailScreen from "./../Employee/JobDetailScreen";
const JobDetailEditScreen = ({ navigation }) => {
  return (
    <>
      <JobDetailScreen show navigation={navigation} />
    </>
  );
};

export default JobDetailEditScreen;
