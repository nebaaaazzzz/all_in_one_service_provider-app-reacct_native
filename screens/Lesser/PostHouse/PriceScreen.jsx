import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { PostHouseContext } from "./PostHouseScreen";
const PriceScreen = ({ navigation, route }) => {
  let p;
  if (route.params?.data) {
    p = route.params.data.price;
  }
  const { dispatch } = useContext(PostHouseContext);
  const [price, setPrice] = useState(String(p) && "1000");
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
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            marginTop: "20%",

            marginVertical: 20,
            textAlign: "center",
            color: "#000",
            fontSize: 20,
          }}
        >
          Now for the fun part--set Your price
        </Text>
        <View>
          <View
            style={{
              marginTop: "20%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 50,
                backgroundColor: "rgba(0,0,0,0.3)",
                padding: 10,
              }}
              onPress={() => {
                if (price > 0) {
                  setPrice(String(+price - 1));
                } else {
                  setPrice(0);
                }
              }}
            >
              <Icon size={20} name="minus" />
            </TouchableOpacity>
            <TextInput
              value={price}
              onChangeText={(text) => setPrice(text)}
              style={{ fontSize: 20, textAlign: "center", width: "70%" }}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={{
                borderRadius: 50,
                backgroundColor: "rgba(0,0,0,0.3)",
                padding: 10,
              }}
              onPress={() => setPrice(String(+price + 1))}
            >
              <Icon name="plus" size={20} />
            </TouchableOpacity>
          </View>
          <Text style={{ textAlign: "center" }}>ETB per month</Text>
        </View>
      </View>
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
          onPress={() => {
            dispatch({
              type: "add",
              payload: {
                price,
              },
            });
            if (route.params?.data) {
              return navigation.navigate("lesser/posthouse/reviewlisting", {
                data: route.params.data,
              });
            }
            navigation.navigate("lesser/posthouse/reviewlisting");
          }}
          style={{
            backgroundColor: "#0244d0",
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

export default PriceScreen;
