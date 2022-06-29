import {
  View,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Searchbar, ProgressBar, MD3Colors } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const SkillsRequiredScreen = ({ navigation }) => {
  const [headline, setHeadline] = useState("");
  const dimension = useWindowDimensions();
  const [selected, setSekected] = useState([]);
  const [focus, setFocus] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (headline.length > 0) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [headline]);
  if (focus) {
    return (
      <View style={{ marginTop: StatusBar.currentHeight }}>
        <ScrollView>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
              Search skills or add your Own
            </Text>
            <Pressable
              onPress={() => setFocus(false)}
              style={{ marginRight: 10 }}
            >
              <Icon name="close" size={20} />
            </Pressable>
          </View>
          <Searchbar
            style={{
              marginVertical: "10%",
              alignSelf: "center",
            }}
            placeholder="Search skills or add"
            onChangeText={setHeadline}
          />
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={{ marginTop: StatusBar.currentHeight }}>
      <ScrollView>
        <ProgressBar progress={0.5} />
        <Text style={{ fontSize: 22, textAlign: "center", fontWeight: "bold" }}>
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
          onChangeText={setHeadline}
        />
        {selected.length > 0 ? (
          <View>
            <Text style={{ color: "rgba(0,0,0,0.5)" }}> Selected skills</Text>
            {selected.map((item) => {
              return (
                <Pressable
                  style={{
                    backgroundColor: "rgba(0,0,0,0.4)",
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
        ) : (
          <></>
        )}
        <></>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 20 }}>
            Popular skills for web Design
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {[
              "WordPress",
              "WooCommerce",
              "Web Development",
              "PHP",
              "CSS",
              "Web",
              "Desing",
              "JaavaScript",
              "HTML",
              "HMTL5",
              "Wordpressp Plug",
            ].map((item) => {
              return (
                <Pressable
                  style={{
                    backgroundColor: "rgba(0,0,0,0.4)",
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
          top: dimension.height - 160,
          alignItems: "center",
          zIndex: 99,
          justifyContent: "center",
          height: 60,
          backgroundColor: "#fff",
          width: "100%",
          borderTopWidth: 1,
          borderColor: "#000",
        }}
      >
        <Pressable
          // disabled={active}
          onPress={() => {
            navigation.navigate("employer/postjob/scope");
          }}
          style={{
            width: "80%",
            borderRadius: 20,
            backgroundColor: active ? "blue" : "rgba(0,0,0,0.3)",
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: active ? "#fff" : "rgba(0,0,0,0.5)" }}>
            Next: Skills
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SkillsRequiredScreen;
