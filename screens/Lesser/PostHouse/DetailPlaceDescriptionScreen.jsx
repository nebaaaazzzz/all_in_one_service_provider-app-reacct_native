import { ScrollView, View, Text, Pressable, StatusBar } from "react-native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native-paper";
import { PostHouseContext } from "./PostHouseScreen";
const DetailPlaceDescriptionScreen = ({ navigation }) => {
  const { dispatch } = useContext(PostHouseContext);
  const [text, setText] = useState("");
  return (
    <View
      horizontal={false}
      style={{
        flex: 1,
        // backgroundColor: "#0099ff",
        backgroundColor: "rgba(0,0,0,0.3)",
        marginTop: StatusBar.currentHeight,
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
          multiline
          numberOfLines={10}
          placeholder="You'll have a great time at this comfortable place to stay"
        />
        <Text>{text.length}/500</Text>
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
        <Pressable
          disabled={text.length < 50}
          onPress={() => {
            dispatch({
              type: "add",
              payload: {
                detaildescription: text,
              },
            });
            navigation.navigate("lesser/posthouse/describeplace");
          }}
          style={{
            backgroundColor: text.length > 50 ? "#0244d0" : "rgba(0,0,0,0.7)",
            width: 100,
            right: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DetailPlaceDescriptionScreen;
