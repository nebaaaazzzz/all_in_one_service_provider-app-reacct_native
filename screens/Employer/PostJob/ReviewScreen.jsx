import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  Pressable,
} from "react-native";
import {
  Checkbox,
  RadioButton,
  List,
  Divider,
  TextInput,
} from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as DocumentPicker from "expo-document-picker";

const ReviewScreen = ({ route, edit }) => {
  const dimension = useWindowDimensions();
  const [active, setActive] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [description, setDescription] = useState(false);
  const fileSelector = async () => {
    const docs = await DocumentPicker.getDocumentAsync({
      multiple: true,
      type: [
        "application/pdf",
        "image/*",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    });
    {
      /*file lastmodified mimeType name  output size type uri */
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          marginBottom: 90,
          marginTop: StatusBar.currentHeight,
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            textAlign: "center",
            marginVertical: 15,
            fontWeight: "bold",
          }}
        >
          Now finish and review your job post
        </Text>
        <Divider style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.2)" }} />
        <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Headline</Text>
          <TextInput
            style={{ marginTop: 10 }}
            multiline
            numberOfLines={3}
            value="Build responsive WordPress site with booking/payment functionality"
          />
        </View>
        <Divider style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.2)" }} />
        <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Describe your job
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 16 }}>
              This is how talent figures out what you need and why you’re great
              to work with!
            </Text>
            <Text style={{ fontSize: 16, marginVertical: 10 }}>
              Include your expectations about the task or deliverable, what
              you’re looking for in a work relationship, and anything unique
              about your project, team, or company.
            </Text>
          </View>
          <TextInput
            multiline
            numberOfLines={5}
            value={description}
            placeholder="Already have a job description?Paste it here!"
            onChangeText={(text) => setDescription(text)}
          />
          <Pressable
            onPress={fileSelector}
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 15,
              marginHorizontal: 20,
              marginTop: 20,
              paddingVertical: 5,
              paddingHorizontal: 5,
              borderWidth: 1,
              alignSelf: "flex-start",
            }}
          >
            <Icon size={16} name="attachment" />
            <Text style={{ marginHorizontal: 5 }}>Attach file</Text>
          </Pressable>
          <Text
            style={{
              marginHorizontal: 20,
              color: "rgba(0,0,0,0.6)",
            }}
          >
            Max file size: 100MB
          </Text>
        </View>
        <Divider style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.2)" }} />
        <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
          <View>
            <Text
              style={{ fontWeight: "bold", fontSize: 17, marginVertical: 10 }}
            >
              Category
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Web Design</Text>
              <Pressable style={{ marginHorizontal: 10 }}>
                <Icon size={20} name="circle-edit-outline" />
              </Pressable>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 17, marginVertical: 10 }}
            >
              skills
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  color: "#fff",
                  borderRadius: 15,
                  backgroundColor: "blue",
                }}
              >
                Word press
              </Text>

              <Pressable style={{ marginHorizontal: 10 }}>
                <Icon size={20} name="circle-edit-outline" />
              </Pressable>
            </View>
          </View>
          <View>
            <Text
              style={{ fontWeight: "bold", fontSize: 17, marginVertical: 10 }}
            >
              Budget
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text>$10.00 - $20.00 /hr</Text>
              <Pressable>
                <Icon size={20} name="circle-edit-outline" />
              </Pressable>
            </View>
          </View>
        </View>
        <Divider style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.2)" }} />
        <List.Section>
          <ScreeningQuestion expanded={expanded} handlePress={handlePress} />
          <AdvancedPred expanded={expanded} handlePress={handlePress} />
        </List.Section>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          top: dimension.height - 140,
          alignItems: "center",
          justifyContent: "center",
          height: 60,
          backgroundColor: "#fff",
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
            backgroundColor:
              description.length > 50 ? "blue" : "rgba(0,0,0,0.6)",
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>
            {route?.params?.edit ? "Save" : "Post Job"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
function ScreeningQuestion({ expanded, handlePress }) {
  const suggested = [
    "Describe your recent experience with similar projects",
    "Please list any cerificatios related to this project",
    "Include a link to your GitHub profile and/or website",
    "What frameworks have you worked with?",
    "Describe your approach to testing and improving QA",
  ];
  const [questions, setQuestions] = useState([]);
  const [checked, setChecked] = useState(Array(suggested.length).fill(false));
  const [isTextInput, setIsTextInput] = useState(false);
  const [question, setQuestion] = useState("");
  console.log(question);
  console.log(questions);
  return (
    <List.Accordion
      left={(props) => (
        <View {...props}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Screening questions(optional)
          </Text>
          <Text style={{ color: "rgba(0,0,0,0.6)" }}>
            Narrow down your candidated
          </Text>
        </View>
      )}
    >
      {/* question must be more than 3 char */}

      <Text>Select or add up to 5 questions</Text>

      <Pressable
        onPress={() => setIsTextInput(true)}
        style={{
          flexDirection: "row",
          borderRadius: 20,
          width: "90%",
          alignSelf: "center",
          borderColor: "rgba(0,0,0,0.7))",
          paddingVertical: 10,
          elevation: 5,
          marginVertical: 10,
          backgroundColor: "blue",
        }}
      >
        <Text style={{ fontSize: 16, color: "#fff" }}>
          <Icon size={18} color="#fff" name="plus" /> Write your own question
        </Text>
      </Pressable>
      {isTextInput ? (
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <TextInput
              style={{ width: "80%" }}
              numberOfLines={10}
              multiline={true}
              maxLength={255}
              onChangeText={(txt) => setQuestion(txt)}
            />
            <Pressable
              style={{ alignSelf: "center" }}
              onPress={() => setIsTextInput(false)}
            >
              <Icon color="red" name="delete" size={24} />
            </Pressable>
          </View>
          <Text style={{ marginLeft: "70%" }}>{question.length}/255</Text>
          <Pressable
            onPress={() => {
              setIsTextInput(false);
              setQuestion("");
              setQuestions([...questions, question]);
            }}
            style={{
              borderRadius: 20,
              borderWidth: 1,
              width: "80%",
              paddingVertical: 5,
              alignItems: "center",
              color: question.length > 2 ? "#fff" : "",
              justifyContent: "center",
              backgroundColor: question.length > 2 ? "blue" : "",
            }}
          >
            <Text>Save question</Text>
          </Pressable>
        </View>
      ) : (
        <></>
      )}
      {questions.length > 0 ? (
        <View>
          <Text
            style={{ fontWeight: "bold", fontSize: 20, marginVertical: 10 }}
          >
            Your questions
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {questions.map((item) => {
              return (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 18, marginHorizontal: 10 }}>
                    {item}
                  </Text>
                  <Pressable>
                    <Icon size={20} name="circle-edit-outline" />
                  </Pressable>
                </View>
              );
            })}
          </View>
        </View>
      ) : (
        <></>
      )}
      <Text style={{ fontWeight: "bold", marginVertical: 15 }}>Suggested</Text>
      {suggested.map((item, index) => {
        return (
          <Pressable
            style={{ flexDirection: "row", width: "90%" }}
            onPress={() => {
              const newArr = checked.map((item, i) => {
                return i == index ? !checked[index] : item;
              });
              setChecked(newArr);
            }}
          >
            <Checkbox status={checked[index] ? "checked" : "unchecked"} />
            <Text>{item}</Text>
          </Pressable>
        );
      })}
    </List.Accordion>
  );
}
function AdvancedPred({ expanded, handlePress }) {
  const [checkEnglish, setCheckEnglish] = React.useState("");
  const [checkHour, setHour] = React.useState("");
  const englishLevels = [
    "Any level",
    "Conversational or better",
    "Fluent or better",
    "Native or bilingual only",
  ];
  const hourPerWeeks = [
    "More than 30 hrs.week",
    "Less than 30hrs/week",
    "I'm not sure",
  ];
  return (
    <List.Accordion
      left={(props) => (
        <View {...props}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Advanced preferences(optional)
          </Text>
          <Text style={{ color: "rgba(0,0,0,0.6)" }}>
            Hours per week ,and more
          </Text>
        </View>
      )}
      expanded={expanded}
      onPress={handlePress}
    >
      <View>
        <Text style={{ fontWeight: "bold" }}>English level</Text>
        <View>
          {["first", "second", "third", "fourth"].map((item, index) => {
            return (
              <Pressable
                onPress={() => setCheckEnglish(item)}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <RadioButton
                  value={item}
                  status={checkEnglish === item ? "checked" : "unchecked"}
                />
                <Text>{englishLevels[index]}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Hours per week</Text>
        {["first", "second", "third"].map((item, index) => {
          return (
            <Pressable
              onPress={() => setHour(item)}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <RadioButton
                value={item}
                status={checkHour === item ? "checked" : "unchecked"}
              />
              <Text>{hourPerWeeks[index]}</Text>
            </Pressable>
          );
        })}
      </View>
    </List.Accordion>
  );
}
export default ReviewScreen;
