import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { TextInput, ProgressBar, MD3Colors } from "react-native-paper";
import Icon from "@expo/vector-icons/Entypo";
import { PostJobContext } from "./PostJobScreen";
const HeadlineScreen = ({ navigation }) => {
  const { dispatch } = useContext(PostJobContext);
  const [headline, setHeadline] = useState("");
  const dimension = useWindowDimensions();
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (headline.length > 3) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [headline]);
  return (
    <View style={{ marginTop: StatusBar.currentHeight }}>
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <ProgressBar progress={0} />
        <Text style={{ fontSize: 22, textAlign: "center", fontWeight: "bold" }}>
          Let's start with a strong headline
        </Text>
        <TextInput
          style={{
            marginVertical: "10%",
            width: "90%",
            alignSelf: "center",
          }}
          placeholder="Write a headline for your job post"
          onChangeText={setHeadline}
        />
        <View>
          <Text style={{ fontSize: 18, margin: 10, fontWeight: "bold" }}>
            Example titles
          </Text>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Icon name="dot-single" size={20} />
            <Text>
              Build responsive WordPress site with booking/ payment
              functionality
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Icon name="dot-single" size={20} />
            <Text>
              Graphic designer needed to design ad creative for multiple
              campaigns
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Icon name="dot-single" size={20} />
            <Text>Facebook ad specialist needed for product launch </Text>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            top: dimension.height - 80,
            alignItems: "center",
            justifyContent: "center",
            height: 60,
            width: "100%",
            borderTopWidth: 1,
            borderColor: "rgba(0,0,0,0.7)",
          }}
        >
          <TouchableOpacity
            disabled={!active}
            onPress={() => {
              dispatch({ type: "add", payload: { title: headline } });
              navigation.navigate("employer/postjob/category");
            }}
            style={{
              width: "80%",
              borderRadius: 20,
              backgroundColor: active ? "#0244d0" : "rgba(0,0,0,0.3)",
              height: "70%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: active ? "#fff" : "rgba(0,0,0,0.5)" }}>
              Next: Category
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </View>
  );
};

export default HeadlineScreen;
