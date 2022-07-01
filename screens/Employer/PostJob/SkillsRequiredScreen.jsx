import {
  View,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
  StatusBar,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Searchbar, ProgressBar, MD3Colors } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { PostJobContext } from "./PostJobScreen";
const SkillsRequiredScreen = ({ navigation }) => {
  const { dispatch } = useContext(PostJobContext);
  const dimension = useWindowDimensions();
  const [selected, setSelected] = useState([]);
  const [focus, setFocus] = useState(false);
  const [skills, setSkills] = useState([
    "WordPress",
    "ECommerce",
    "Web Development",
    "PHP",
    "CSS",
    "Web",
    "Desing",
    "JavaScript",
    "HTML",
    "HMTL5",
    "Wordpressp PlugIn",
  ]);

  if (focus) {
    return (
      <View style={{ marginTop: StatusBar.currentHeight }}>
        <Pressable
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "5%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "rgba(0,0,0,0.8)",
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                Search skills or add your Own
              </Text>
              <Pressable
                onPress={() => setFocus(false)}
                style={{ marginRight: 10 }}
              >
                <Icon name="close" size={22} />
              </Pressable>
            </View>
            <Searchbar
              style={{
                marginVertical: "10%",
                alignSelf: "center",
              }}
              placeholder="Search skills or add"
            />
          </ScrollView>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={{ marginTop: StatusBar.currentHeight }}>
      <ScrollView>
        <ProgressBar progress={0.5} />
        <Text
          style={{
            marginTop: 10,
            fontSize: 22,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          What are the main skills required for your work?
        </Text>
        <Searchbar
          onFocus={() => setFocus(true)}
          style={{
            marginVertical: "10%",
            width: "90%",
            alignSelf: "center",
          }}
          placeholder="Search skills or add"
        />
        {selected.length > 0 ? (
          <View>
            <Text style={{ color: "rgba(0,0,0,0.5)" }}> Selected skills</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {selected.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      setSelected(
                        selected.filter((i) => {
                          return item != i;
                        })
                      );
                      setSkills([...skills, item]);
                    }}
                    style={{
                      backgroundColor: "rgba(0,0,0,0.2)",
                      margin: 5,
                      paddingHorizontal: 8,
                      paddingVertical: 5,
                      borderRadius: 20,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text>{item}</Text>
                      <Icon name="close" size={20} />
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : (
          <></>
        )}
        <></>
        <View>
          {skills.length > 0 ? (
            <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 20 }}>
              Popular skills for web Design
            </Text>
          ) : (
            <></>
          )}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {skills.map((item, index) => {
              return (
                <Pressable
                  onPress={() => {
                    setSkills(
                      skills.filter((i, j) => {
                        return j != index;
                      })
                    );
                    setSelected([...selected, item]);
                  }}
                  style={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                    margin: 5,
                    paddingHorizontal: 8,
                    paddingVertical: 5,
                    borderRadius: 20,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text>{item}</Text>
                    <Icon name="plus" size={20} />
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          top: dimension.height - 80,
          alignItems: "center",
          justifyContent: "center",
          height: 60,
          backgroundColor: "#fff",
          width: "100%",
          borderTopWidth: 1,
          borderColor: "#000",
        }}
      >
        <Pressable
          disabled={selected.length <= 0}
          onPress={() => {
            dispatch({ type: "add", payload: { skills: selected } });
            navigation.navigate("employer/postjob/scope");
          }}
          style={{
            width: "80%",
            borderRadius: 20,
            backgroundColor: selected.length ? "#0244d0" : "rgba(0,0,0,0.3)",
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: selected.length ? "#fff" : "rgba(0,0,0,0.5)" }}>
            Next: Skills
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SkillsRequiredScreen;
