import { ScrollView, Text, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import IonIcons from "@expo/vector-icons/Ionicons";
import React, { useState, useEffect } from "react";

const AboutScreen = () => {
  function onSortOptions(a, b) {
    if (a.label < b.label) {
      return -1;
    }

    if (a.label > b.label) {
      return 1;
    }

    return 0;
  }
  return (
    <ScrollView
      style={{
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        marginBottom: "3%",
      }}
    >
      <Text style={styles.header}>About all in one service provider. </Text>
      <Text style={styles.txt}>
        All in one service provider application is a platform that is
        established to serve as a communication platform for service providers
        and recievers. The application mainly focuses on employment and rental
        sectors of our country Ethiopia. Any user can create an account, login
        and use the application as an employee, employer, lesse or lessor. Users
        can also edit their profiles. It is usable on both android and ios
        operating systems.
      </Text>
      <Text style={styles.header}>About Us</Text>
      <Text style={styles.txt}>
        This application is built by bahir dar university students. we built
        this application in order to solve the proble, of unemployment as well
        as rental system problem
      </Text>
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <MaterialCommunityIcons name="target" size={20} color="#0244d0" />

        <Text style={styles.h2}>Mission</Text>
      </View>
      <Text style={styles.txt}>
        To utilize resource and build a secure and truste way of service
        providing
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IonIcons name="globe-sharp" size={20} color="#0244d0" />
        <Text style={styles.h2}>Vision</Text>
      </View>
      <Text style={styles.txt}>
        Our visions are to eliminate any complication to find jobs and places to
        rent, to avoid brookers who demand unnessary profit and to find
        qualified without going to tireing process by providing a trusted
        communication path
      </Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    textAlign: "center",
    fontStyle: "italic",
    // color: "#0244d0",
    marginVertical: "5%",
  },
  h2: {
    fontSize: 20,
    marginHorizontal: "2%",
    fontStyle: "italic",
    // color: "#0244d0",
    marginVertical: "5%",
  },
  txt: {
    fontSize: 16,
    color: "#0244d0",
  },
});
export default AboutScreen;
