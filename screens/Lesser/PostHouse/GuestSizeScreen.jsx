import { ScrollView, View, Text, Pressable, StatusBar } from "react-native";
import React, { useState, useContext } from "react";
import IncrementDecrement from "../../../components/IncrementDecrement";
import { PostHouseContext } from "./PostHouseScreen";
const GuestSizeScreen = ({ navigation, route }) => {
  let k, be, ba;
  if (route.params.data) {
    k = route.params.data.guestSize.kitchens;
    be = route.params.data.guestSize.bedrooms;
    ba = route.params.data.guestSize.bathrooms;
  }
  const { dispatch } = useContext(PostHouseContext);
  const size = ["kitchens", "Bedrooms", "Bathrooms"];
  const [kitchens, setKitchens] = useState(k || 0);
  const [bedrooms, setBedrooms] = useState(be || 0);
  const [bathrooms, setBathrooms] = useState(ba || 0);
  const setters = [setKitchens, setBedrooms, setBathrooms];
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
          How many lesser can You support
        </Text>
        {size.map((item, index) => {
          return (
            <View
              key={index + 1}
              style={{
                marginVertical: 10,

                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 17 }}>{item}</Text>
              <IncrementDecrement
                value={0}
                minValue={0}
                setState={setters[index]}
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
            dispatch({
              type: "add",
              payload: {
                guestSize: {
                  kitchens,
                  bedrooms,
                  bathrooms,
                },
              },
            });
            if (route.params.data) {
              return navigation.navigate("lesser/posthouse/location", {
                data: route.params.data,
              });
            }
            navigation.navigate("lesser/posthouse/placeoffer");
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
        </Pressable>
      </View>
    </View>
  );
};

export default GuestSizeScreen;
