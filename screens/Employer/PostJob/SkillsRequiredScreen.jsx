import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
  Keyboard,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import { ProgressBar } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native-paper";
import { PostJobContext } from "./PostJobScreen";
import { useTranslation } from "react-i18next";
const SkillsRequiredScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { dispatch } = useContext(PostJobContext);
  const dimension = useWindowDimensions();
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  return (
    <Pressable
      onPress={() => Keyboard.dismiss()}
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <ProgressBar progress={0.5} />
      <TouchableOpacity style={{ marginHorizontal: "5%" }}>
        <ScrollView>
          <Text
            style={{
              marginTop: 10,
              fontSize: 22,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {t("what")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "15%",
            }}
          >
            <TextInput
              value={skill}
              onChangeText={setSkill}
              style={{ flex: 1 }}
            />
            <TouchableOpacity
              disabled={skill.length < 3}
              onPress={() => {
                setSkills([...skills, skill]);
                setSkill("");
              }}
            >
              <Text
                style={{
                  backgroundColor:
                    skill.length > 2 ? "#0244d0" : "rgba(0,0,0,0.3)",
                  marginHorizontal: "5%",
                  textAlign: "center",
                  color: skill.length > 2 ? "#fff" : "rgba(0,0,0,0.5)",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                }}
              >
                {t("add")}
              </Text>
            </TouchableOpacity>
          </View>
          {skills.length > 0 ? (
            <View style={{ marginTop: "5%" }}>
              <Text style={{ color: "rgba(0,0,0,0.5)" }}> {t("add1")}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {skills.map((item, index) => {
                  return (
                    <View
                      key={index + 1}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.2)",
                        margin: 5,
                        padding: "3%",
                        paddingVertical: 5,
                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>{item}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setSkills(
                            skills.filter((i) => {
                              return item != i;
                            })
                          );
                        }}
                      >
                        <Icon name="close" color="red" size={20} />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
          ) : (
            <></>
          )}
        </ScrollView>
      </TouchableOpacity>

      <View
        style={{
          position: "absolute",
          top: dimension.height - dimension.height / 5.5,
          alignItems: "center",
          justifyContent: "center",
          height: 60,
          backgroundColor: "#fff",
          width: "100%",
          borderTopWidth: 1,
          borderColor: "#000",
        }}
      >
        <TouchableOpacity
          disabled={skills.length <= 0}
          onPress={() => {
            dispatch({ type: "add", payload: { skills } });
            navigation.navigate("employer/postjob/scope");
          }}
          style={{
            width: "80%",
            borderRadius: 20,
            backgroundColor: skills.length ? "#0244d0" : "rgba(0,0,0,0.3)",
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: skills.length ? "#fff" : "rgba(0,0,0,0.5)" }}>
            {t("next2")}
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default SkillsRequiredScreen;
