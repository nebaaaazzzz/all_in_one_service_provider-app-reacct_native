import { View, Text, Pressable, Linking, StyleSheet } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Zocial from "@expo/vector-icons/Zocial";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { List } from "react-native-paper";
import { useTranslation } from "react-i18next";
const ContactusScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={{ paddingHorizontal: "5%" }}>
      <Text
        style={{
          fontSize: 25,
          marginVertical: "5%",
          color: "rgba(0,0,0,0.7)",

          textAlign: "center",
          //   color: "#0244d0",
        }}
      >
        {t("contactw")}
      </Text>
      <View>
        <List.Accordion
          titleStyle={{ color: "#0244d0" }}
          title={t("Email")}
          left={() => {
            return (
              <MaterialCommunityIcons name="email" size={25} color="#0244d0" />
            );
          }}
        >
          <Text style={styles.txt}>kalkidanhabte86@gmail.com</Text>
          <Text style={styles.txt}>khalidhamid993@gmail.com</Text>
          <Text style={styles.txt}>nebaaaazzzz@gmial.com</Text>
          <Text style={styles.txt}>tigistnigus7@gmail.com</Text>
        </List.Accordion>
      </View>
      <View>
        <List.Accordion
          titleStyle={{ color: "#0244d0" }}
          title={t("Phone")}
          left={() => {
            return (
              <MaterialCommunityIcons name="phone" size={25} color="#0244d0" />
            );
          }}
        >
          <Text style={styles.txt}>+251937406175</Text>
          <Text style={styles.txt}>+251973839582</Text>
          <Text style={styles.txt}>+251923989471</Text>
          <Text style={styles.txt}>+251922784507</Text>
        </List.Accordion>
      </View>
      <View style={{ marginVertical: "5%" }}>
        <Text
          style={{
            fontSize: 22,
            textAlign: "center",
            color: "rgba(0,0,0,0.7)",
          }}
        >
          {t("socialn")}
        </Text>
        <View
          style={{
            marginVertical: "5%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Pressable
            onPress={() => {
              Linking.openURL("https://twitter.com/nebaaaazzzz");
            }}
          >
            <Zocial name="twitter" color="#0244d0" size={35} />
          </Pressable>
          <Pressable
            onPress={() => {
              Linking.openURL(
                "https://www.facebook.com/profile.php?id=100006370661244"
              );
            }}
          >
            <Entypo name="facebook" color="#0244d0" size={35} />
          </Pressable>
          <Pressable
            onPress={() => {
              Linking.openURL("https://t.me/Tigistnigus");
            }}
          >
            <FontAwesome5 color="#0244d0" name="telegram" size={35} />
          </Pressable>
        </View>

        {/* twitter facebook telegram weechat snapchat discord*/}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  txt: {
    fontSize: 16,
    marginVertical: 4,
  },
});
export default ContactusScreen;
