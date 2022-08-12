import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { ProgressBar } from "react-native-paper";
import { RadioButton, Divider } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { PostJobContext } from "./PostJobScreen";
const ScopeScreen = ({ navigation }) => {
  const { dispatch } = useContext(PostJobContext);
  const dimension = useWindowDimensions();
  const [experience, setExperience] = React.useState();

  const exp = [
    {
      title: "Entry",
      description: "Looking for someone relatively new to this field",
    },
    {
      title: "Intermediate",
      description: "Looking for substantial experience in this field",
    },
    {
      title: "Expert",
      description: "Looking for comprehensive and deep expertise in this filed",
    },
  ];
  return (
    <View style={{ marginTop: StatusBar.currentHeight }}>
      <ProgressBar progress={0.75} />
      <Text style={{ fontSize: 22, textAlign: "center", fontWeight: "bold" }}>
        Next, Tell us What experience Needed.
      </Text>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 15,
          marginVertical: 15,
        }}
      ></View>

      <Divider style={{ marginVertical: "5%" }} />
      <View style={{ paddingHorizontal: 15 }}>
        <Text style={{ fontSize: 18 }}>
          What level of experience will it need?
        </Text>
        <View style={{ marginVertical: 14 }}>
          {exp.map((item, index) => {
            return (
              <TouchableOpacity
                key={index + 1}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
                onPress={() => setExperience(index)}
              >
                <RadioButton
                  value={index}
                  color="#0244d0"
                  onPress={() => setExperience(index)}
                  status={experience === index ? "checked" : "unchecked"}
                />
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {item.title}
                  </Text>
                  <Text style={{ marginRight: "10%" }}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          top: dimension.height - 100,
          alignItems: "center",
          justifyContent: "center",
          height: 60,
          width: "100%",
          borderTopWidth: 1,
          borderColor: "rgba(0,0,0,0.7)",
        }}
      >
        <TouchableOpacity
          disabled={experience === undefined}
          onPress={() => {
            dispatch({
              type: "add",
              payload: {
                experience: exp[experience],
              },
            });
            navigation.navigate("employer/postjob/location");
          }}
          style={{
            width: "80%",
            borderRadius: 20,
            backgroundColor:
              experience !== undefined ? "#0244d0" : "rgba(0,0,0,0.3)",
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: experience !== undefined ? "#fff" : "rgba(0,0,0,0.5)",
            }}
          >
            Next: Location
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScopeScreen;
