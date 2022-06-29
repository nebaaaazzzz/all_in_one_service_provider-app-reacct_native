import {
  ScrollView,
  View,
  Text,
  Pressable,
  StatusBar,
  Image,
} from "react-native";
import React from "react";
import IncrementDecrement from "../../../components/IncrementDecrement";
const GuestSizeScreen = ({ navigation }) => {
  const size = ["Guests", "Beds", "Bedrooms", "Bathrooms"];
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
          How many guests would you like to welcome
        </Text>
        {size.map((item) => {
          return (
            <View
              style={{
                marginVertical: 10,

                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>{item}</Text>
              <IncrementDecrement
                value={1}
                minValue={1}
                style={{
                  borderWidth: 0,
                }}
                valueStyle={{
                  fontSize: 18,
                }}
                maxValue={Number.MAX_VALUE}
              />
            </View>
          );
        })}
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
          onPress={() => {
            navigation.navigate("lesser/postjob/placeoffer");
          }}
          style={{
            backgroundColor: "#0099ff",
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

export default GuestSizeScreen;
