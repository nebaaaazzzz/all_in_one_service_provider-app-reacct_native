import { ScrollView, Text, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import IonIcons from "@expo/vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
const AboutScreen = () => {
  const { t } = useTranslation();
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
        marginBottom: "3%",
      }}
    >
      <Text style={styles.header}>{t("aboutt")}</Text>
      <Text style={styles.txt}>{t("detaill")}</Text>
      <Text style={styles.header}>{t("abus")}</Text>
      <Text style={styles.txt}>{t("aboutus")}</Text>
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <MaterialCommunityIcons name="target" size={20} color="#0244d0" />

        <Text style={styles.h2}>{t("mis")}</Text>
      </View>
      <Text style={styles.txt}>{t("miss")}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IonIcons name="globe-sharp" size={20} color="#0244d0" />
        <Text style={styles.h2}>{t("vis")}</Text>
      </View>
      <Text style={styles.txt}>{t("viss")}</Text>
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
