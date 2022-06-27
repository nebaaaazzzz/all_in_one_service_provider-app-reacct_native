import {
  View,
  Text,
  Pressable,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-native-paper";
import { RadioButton, Divider } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
const ScopeScreen = () => {
  const dimension = useWindowDimensions();
  const [active, setActive] = useState(false);
  const [checked, setChecked] = React.useState("");
  const [select, setSelect] = React.useState("");
  const [experience, setExperience] = React.useState("");
  const a = {
    0: ["More than 6 months", "3 to 6 months", "1 to 3 months"],
    1: ["More than 6 months", "3 to 6 months", "1 to 3 months"],
    2: ["3 to 6 months", "1 to 3 months", "Less than 1 month"],
  };
  const b = [
    {
      title: "Large",
      description:
        "Longer term or complex initiatives(ex. design and build a full website)",
      level: "0",
    },
    {
      title: "Mediun",
      description: "well-defined projects (ex. a landing page)",
      level: "1",
    },
    {
      title: "Small",
      description:
        "Quick and straightforward tasks (ex. update text and images on awebpage)",
      level: "2",
    },
  ];
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
  if (select) {
    return (
      <View style={{ marginTop: StatusBar.currentHeight }}>
        <ProgressBar progress={0.75} />
        <Text style={{ fontSize: 22, textAlign: "center", fontWeight: "bold" }}>
          Next, estimate the scope of your work.
        </Text>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 15,
            marginVertical: 15,
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 17 }}>
              {b[parseInt(checked)].title}
            </Text>
            <Text style={{ marginRight: "10%", color: "rgba(0,0,0,0.7)" }}>
              {b[parseInt(checked)].description}
            </Text>
          </View>
          <Pressable onPress={() => setChecked(false)}>
            <Icon size={20} name="circle-edit-outline" />
          </Pressable>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            marginTop: 20,
          }}
        >
          <View>
            <Text
              style={{
                marginRight: "10%",
                fontSize: 18,
              }}
            >
              {a[parseInt(checked)][select]}
            </Text>
          </View>
          <Pressable onPress={() => setSelect(false)}>
            <Icon size={20} name="circle-edit-outline" />
          </Pressable>
        </View>
        <Divider style={{ marginVertical: "5%" }} />
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 18 }}>
            What level of experience will it need?
          </Text>
          <View style={{ marginVertical: 10 }}>
            {exp.map((item, index) => {
              return (
                <Pressable
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => setExperience(Object.keys(a)[index])}
                >
                  <RadioButton
                    value={checked}
                    status={
                      experience === Object.keys(a)[index]
                        ? "checked"
                        : "unchecked"
                    }
                  />
                  <View>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      {item.title}
                    </Text>
                    <Text style={{ marginRight: "10%" }}>
                      {item.description}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
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
          <Pressable
            disabled={active}
            style={{
              width: "80%",
              borderRadius: 20,
              backgroundColor: experience ? "blue" : "rgba(0,0,0,0.3)",
              height: "70%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: experience ? "#fff" : "rgba(0,0,0,0.5)" }}>
              Next: Skills
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
  if (checked) {
    return (
      <View style={{ marginTop: StatusBar.currentHeight }}>
        <ProgressBar progress={0.75} />
        <Text style={{ fontSize: 22, textAlign: "center", fontWeight: "bold" }}>
          Next, estimate the scope of your work.
        </Text>
        <View style={{ flexDirection: "row", paddingHorizontal: 15 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 17 }}>
              {b[parseInt(checked)].title}
            </Text>
            <Text style={{ marginRight: "10%", color: "rgba(0,0,0,0.7)" }}>
              {b[parseInt(checked)].description}
            </Text>
          </View>
          <Pressable onPress={() => setChecked(false)}>
            <Icon size={20} name="circle-edit-outline" />
          </Pressable>
        </View>
        <Divider style={{ marginVertical: "5%" }} />
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 18 }}>How long will your work take?</Text>
          <View style={{ marginVertical: 10 }}>
            {a[checked].map((item, index) => {
              console.log(select, checked);
              return (
                <Pressable
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => setSelect(Object.keys(a)[index])}
                >
                  <RadioButton
                    value={checked}
                    status={
                      select === Object.keys(a)[index] ? "checked" : "unchecked"
                    }
                  />
                  <View>
                    <Text style={{ marginRight: "10%" }}>{item}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={{ marginTop: StatusBar.currentHeight }}>
      <ProgressBar progress={0.75} />
      <Text style={{ fontSize: 22, textAlign: "center", fontWeight: "bold" }}>
        Next, estimate the scope of your work.
      </Text>

      <View style={{ marginTop: "20%" }}>
        {b.map((item) => {
          return (
            <Pressable
              style={{ flexDirection: "row" }}
              onPress={() => setChecked(item.level)}
            >
              <RadioButton
                value={item.level}
                status={checked === item.level ? "checked" : "unchecked"}
              />
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {item.title}
                </Text>
                <Text style={{ marginRight: "10%" }}>{item.description}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default ScopeScreen;
