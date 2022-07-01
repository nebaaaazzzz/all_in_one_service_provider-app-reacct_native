import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  Pressable,
  Keyboard,
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
import { PostJobContext } from "./PostJobScreen";
const ReviewScreen = ({ route, navigation }) => {
  const { dispatch, jobPost } = useContext(PostJobContext);
  console.log(jobPost);
  const dimension = useWindowDimensions();
  const [active, setActive] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [headline, setHeadline] = useState(jobPost.title || "");
  const handlePress = () => setExpanded(!expanded);
  const [file, setFile] = useState("");
  const [description, setDescription] = useState(false);
  const [checkEnglish, setCheckEnglish] = useState("");
  const [questions, setQuestions] = useState([]);

  const [checkHour, setHour] = useState("");
  const fileSelector = async () => {
    const doc = await DocumentPicker.getDocumentAsync({
      multiple: true,
      type: [
        "application/pdf",
        "image/*",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    });
    setFile(doc);
    {
      /*file lastmodified mimeType name  output size type uri */
    }
  };
  console.log(jobPost);
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
        }}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: 60,
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
          <Divider
            style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.2)" }}
          />
          <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Headline</Text>
            <TextInput
              style={{ marginTop: 10 }}
              multiline
              numberOfLines={3}
              onChangeText={(txt) => {
                setHeadline(txt);
              }}
              value={headline}
            />
          </View>
          <Divider
            style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.2)" }}
          />
          <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Describe your job
            </Text>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 16 }}>
                This is how talent figures out what you need and why you’re
                great to work with!
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
          <Divider
            style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.2)" }}
          />
          <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
            <View>
              <Text
                style={{ fontWeight: "bold", fontSize: 17, marginVertical: 10 }}
              >
                Category
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>{jobPost.category}</Text>
                <Pressable
                  style={{ marginHorizontal: 10 }}
                  onPress={() => {
                    navigation.push("employer/postjob/category", {
                      specificCategory: jobPost.specificCategory,
                      category: jobPost.category,
                    });
                  }}
                >
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
              <View style={{}}>
                {jobPost.skills.map((item, index) => {
                  return (
                    <View style={{ flexDirection: "row" }}>
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
                        {item}
                      </Text>

                      <Pressable
                        onPress={() => {
                          navigation.navigate("employer/postjob/skills");
                        }}
                        style={{ marginHorizontal: 10 }}
                      >
                        <Icon size={20} name="circle-edit-outline" />
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            </View>
            <View>
              {jobPost.budget ? (
                <>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      marginVertical: 10,
                    }}
                  >
                    Budget
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 16 }}>
                      {jobPost.budget.from} birr- {jobPost.budget.to} birr /hr
                    </Text>
                    <Pressable
                      onPress={() => {
                        navigation.push("employer/postjob/payment");
                      }}
                    >
                      <Icon size={20} name="circle-edit-outline" />
                    </Pressable>
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
          <Divider
            style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.2)" }}
          />
          <List.Section>
            <ScreeningQuestion
              expanded={expanded}
              questions={questions}
              setQuestions={setQuestions}
              handlePress={handlePress}
            />
            <AdvancedPred
              expanded={expanded}
              handlePress={handlePress}
              setHour={setHour}
              checkHour={checkHour}
              checkEnglish={checkEnglish}
              setCheckEnglish={setCheckEnglish}
            />
          </List.Section>
        </ScrollView>
      </Pressable>

      <View
        style={{
          position: "absolute",
          top: dimension.height - 60,
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
          disabled={headline.length < 5 && description.length < 50}
          onPress={() => {
            dispatch({
              type: "add",
              payload: {
                title: headline,
                description,
                file,
                checkEnglish,
                checkHour,
                questions,
              },
            });
            navigation.navigate("");
          }}
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
function ScreeningQuestion({ expanded, handlePress, questions, setQuestions }) {
  const [isTextInput, setIsTextInput] = useState(false);
  const [question, setQuestion] = useState("");
  const [deleteIndex, setDeleteIndex] = useState("");
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
      {!isTextInput ? (
        <>
          <Pressable
            onPress={() => setIsTextInput(true)}
            style={{
              flexDirection: "row",
              borderRadius: 20,
              width: "90%",
              alignSelf: "center",
              alignItems: "center",
              borderColor: "rgba(0,0,0,0.7))",
              paddingVertical: 10,
              elevation: 5,
              marginVertical: 10,
              justifyContent: "center",
              backgroundColor: "blue",
            }}
          >
            <Icon size={18} color="#fff" name="plus" />
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                marginLeft: 10,
                textAlign: "center",
              }}
            >
              Write your own question
            </Text>
          </Pressable>
        </>
      ) : (
        <></>
      )}

      {isTextInput ? (
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <TextInput
              style={{ width: "80%" }}
              numberOfLines={10}
              multiline={true}
              defaultValue={question}
              maxLength={255}
              onChangeText={setQuestion}
            />
            <Pressable
              style={{ alignSelf: "center" }}
              onPress={() => {
                if (deleteIndex) {
                  const newArr = questions.filter((i, j) => {
                    return j + 1 != deleteIndex;
                  });
                  setQuestions(newArr);
                  setQuestion("");
                  setDeleteIndex("");
                }
                setIsTextInput(false);
              }}
            >
              <Icon color="red" name="delete" size={24} />
            </Pressable>
          </View>
          <Text style={{ marginLeft: "70%", marginVertical: 10 }}>
            {question.length}/255
          </Text>
          <Pressable
            disabled={!(question.length > 5)}
            onPress={() => {
              if (deleteIndex) {
                setQuestions(
                  questions.map((item, index) => {
                    return index === deleteIndex ? item : question;
                  })
                );
                setDeleteIndex("");
              } else {
                setQuestions([...questions, question]);
              }
              setIsTextInput(false);
              setQuestion("");
            }}
            style={{
              borderRadius: 20,
              width: "80%",
              paddingVertical: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                question.length > 5 ? "#0244d0" : "rgba(0,0,0,0.6)",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>Save question</Text>
          </Pressable>
        </View>
      ) : (
        <></>
      )}
      {questions.length > 0 && !isTextInput ? (
        <View>
          <Text
            style={{ fontWeight: "bold", fontSize: 20, marginVertical: 10 }}
          >
            Your questions
          </Text>
          <View>
            {questions.map((item, index) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: "2%",
                  }}
                >
                  <Text style={{ fontSize: 18, marginHorizontal: 10 }}>
                    {item}
                  </Text>
                  <Pressable
                    onPress={() => {
                      setIsTextInput(true);
                      setQuestion(item);
                      setDeleteIndex(index + 1);
                    }}
                  >
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

      {/* uncomment this and show suggested question for the user */}
      {/* <Text style={{ fontWeight: "bold", marginVertical: 15 }}>Suggested</Text>
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
      })} */}
    </List.Accordion>
  );
}
function AdvancedPred({
  expanded,
  handlePress,
  checkEnglish,
  setCheckEnglish,
  checkHour,
  setHour,
}) {
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
