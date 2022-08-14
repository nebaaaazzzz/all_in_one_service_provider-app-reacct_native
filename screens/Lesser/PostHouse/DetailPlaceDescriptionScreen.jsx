import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native-paper";
import { PostHouseContext } from "./PostHouseScreen";
const DetailPlaceDescriptionScreen = ({ navigation, route }) => {
  const { dispatch } = useContext(PostHouseContext);
  let desc;
  if (route.params?.data) {
    desc = route.params.data.detailDescription;
  }
  const [text, setText] = useState(desc || "");
  return (
    <View
      horizontal={false}
      style={{
        flex: 1,
        // backgroundColor: "#0099ff",
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#fff",
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            marginVertical: 20,
            textAlign: "center",
            color: "#000",
            fontSize: 20,
          }}
        >
          Now, let's describe your place
        </Text>
        <TextInput
          onChangeText={setText}
          maxLength={500}
          value={text}
          multiline
          numberOfLines={10}
          placeholder="You'll have a great time at this comfortable place to stay"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>min 50 characters</Text>
          <Text>{text.length}/500</Text>
        </View>
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
        <TouchableOpacity
          disabled={text.length < 50}
          onPress={() => {
            dispatch({
              type: "add",
              payload: {
                detailDescription: text,
              },
            });
            if (route.params?.data) {
              return navigation.navigate("lesser/posthouse/describeplace", {
                data: route.params.data,
              });
            }
            navigation.navigate("lesser/posthouse/describeplace");
          }}
          style={{
            backgroundColor: text.length > 49 ? "#0244d0" : "rgba(0,0,0,0.7)",
            width: 100,
            right: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailPlaceDescriptionScreen;
