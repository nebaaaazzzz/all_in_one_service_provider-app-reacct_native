import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
  Keyboard,
  ToastAndroid,
} from "react-native";
import {
  RadioButton,
  Checkbox,
  List,
  Divider,
  TextInput,
} from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as DocumentPicker from "expo-document-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

import DatePicker from "@react-native-community/datetimepicker";
import { useQueryClient } from "react-query";
import SelectDropdown from "react-native-select-dropdown";
import { categoryList } from "../../constants/data";
import { useMutation } from "react-query";
import { BASEURI, BASETOKEN } from "../../urls";

const EditPostScreen = ({ navigation, route }) => {
  const jobPost = route.params.data;
  console.log(jobPost);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date(jobPost.deadline));
  const [cvRequired, setCvRequired] = useState(jobPost.cvRequired);
  const dimension = useWindowDimensions();
  const [category, setCategory] = useState(jobPost.category);
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const [file, setFile] = useState("");
  const [description, setDescription] = useState(jobPost.description);
  const [englishLevel, setEnglishLevel] = useState();
  const [questions, setQuestions] = useState([]);
  const [headLine, setHeadLine] = useState(jobPost.title);
  const [checkHour, setHour] = useState();
  const [gender, setGender] = useState();
  const [permanent, setPermanet] = useState(jobPost.permanent);
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
  const { error, isError, isLoading, isSuccess, mutate } = useMutation(
    async (data) => {
      const response = await fetch(`${BASEURI}/employer/postjob`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BASETOKEN}`,
        },
        body: data,
      });
      return response.json();
    }
  );
  const submitHandler = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("document", {
        uri: file.uri,
        name: file.name,
        type: file.mimeType,
      });
    }
    formData.append("body", JSON.stringify(jobPost));
    mutate(formData);
  };

  if (isSuccess) {
    navigation.navigate("employer/");
    queryClient.invalidateQueries("myhouses");
  }

  if (isError) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
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
            Edit Your Post
          </Text>
          <Divider
            style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.2)" }}
          />
          <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Headline</Text>
            <TextInput
              value={headLine}
              onChangeText={(text) => {
                setHeadLine(text);
              }}
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
                about your project, team, or company.Minumun 50 characters.
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
              <SelectDropdown
                rowStyle={{
                  color: "rgba(0,0,0,0.2)",
                }}
                dropdownOverlayColor="transparent"
                buttonStyle={{
                  borderWidth: 1,
                  marginTop: "5%",
                  borderColor: "#0244d0",
                  width: "90%",
                  borderRadius: 15,
                }}
                data={categoryList}
                onSelect={(selectedItem, index) => {
                  setCategory(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                defaultButtonText={category}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
              <View
                style={{ flexDirection: "row", alignItems: "center" }}
              ></View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 17, marginVertical: 10 }}
              >
                skills
              </Text>
              <View style={{ flexDirection: "row" }}>
                {jobPost?.skills?.map((item, index) => {
                  return (
                    <Text
                      key={index + 1}
                      style={{
                        paddingHorizontal: 13,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        color: "#fff",
                        borderRadius: 15,
                        backgroundColor: "#0244d0",
                      }}
                    >
                      {item}
                    </Text>
                  );
                })}
              </View>
            </View>
            <View>
              {jobPost?.budget ? (
                <View>
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
                    <Text style={{ fontSize: 16, marginLeft: "5%" }}>
                      {jobPost.budget.from} birr- {jobPost.budget.to} birr
                    </Text>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
            <View>
              {jobPost?.placeName ? (
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      marginVertical: 10,
                    }}
                  >
                    Work place
                  </Text>
                  <View style={{ flexDirection: "row", marginLeft: "5%" }}>
                    <Text style={{ fontSize: 16 }}>{jobPost.placeName}</Text>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
            <View>
              {jobPost?.experience ? (
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      marginVertical: 10,
                    }}
                  >
                    Experience
                  </Text>
                  <View style={{ marginLeft: "5%" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {jobPost.experience.title}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                      {jobPost.experience.description}
                    </Text>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
          <Divider
            style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.2)" }}
          />
          <View
            style={{
              flexDirection: "row",
              marginVertical: "5%",
              alignItems: "center",
              marginHorizontal: "5%",
            }}
          >
            <Text>DeadLine</Text>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={{
                flexDirection: "row",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 30,
              }}
            >
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
              {open ? (
                <DatePicker
                  value={date ? new Date(date) : new Date()} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  display="calendar"
                  textColor="red"
                  //   minimumDate={new Date()}
                  onChange={({ nativeEvent: { timestamp } }) => {
                    if (timestamp && timestamp > Date.now()) {
                      setDate(new Date(timestamp));
                    } else {
                      ToastAndroid.show("can't set date befor today");
                    }
                    setOpen(false);
                  }}
                />
              ) : (
                <Text style={{ color: "#666", marginLeft: 5, marginTop: 5 }}>
                  {date
                    ? date.getDay() +
                      "/" +
                      date.getMonth() +
                      "/" +
                      date.getFullYear()
                    : "date of birth"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "5%",
            }}
          >
            <Text>permanent</Text>
            <Checkbox
              color="#0244d0"
              status={permanent ? "checked" : "unchecked"}
              onPress={() => {
                setPermanet(!permanent);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "5%",
            }}
          >
            <Text>Cv Required</Text>
            <Checkbox
              color="#0244d0"
              status={cvRequired ? "checked" : "unchecked"}
              onPress={() => {
                setCvRequired(!cvRequired);
              }}
            />
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
              gender={gender}
              setGender={setGender}
              checkHour={checkHour}
              englishLevel={englishLevel}
              setEnglishLevel={setEnglishLevel}
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
          disabled={description.length < 50}
          onPress={() => {
            dispatch({
              type: "add",
              payload: {
                description,
                file,
                deadline: date,
                gender,
                permanent,
                englishLevel,
                cvRequired,
                hourPerWeek: checkHour,
                questions,
              },
            });
            submitHandler();
          }}
          style={{
            backgroundColor:
              description.length > 50 ? "#0244d0" : "rgba(0,0,0,0.7)",

            width: 100,
            right: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Post Job</Text>
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
              backgroundColor: "#0244d0",
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
                  key={index + 1}
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
  englishLevel,
  setEnglishLevel,
  gender,
  setGender,
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
          {englishLevels.map((item, index) => {
            return (
              <Pressable
                key={index + 1}
                onPress={() => setEnglishLevel(item)}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <RadioButton
                  color="#0244d0"
                  value={item}
                  status={englishLevel === item ? "checked" : "unchecked"}
                />
                <Text>{englishLevels[index]}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Hours per week</Text>
        {hourPerWeeks.map((item, index) => {
          return (
            <Pressable
              key={index + 1}
              onPress={() => setHour(item)}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <RadioButton
                color="#0244d0"
                value={item}
                status={checkHour === item ? "checked" : "unchecked"}
              />
              <Text>{hourPerWeeks[index]}</Text>
            </Pressable>
          );
        })}
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Gender required
        </Text>
        {["male", "female", "both"].map((item, index) => {
          return (
            <Pressable
              key={index + 1}
              onPress={() => setGender(item)}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <RadioButton
                color="#0244d0"
                value={item}
                status={gender === item ? "checked" : "unchecked"}
              />
              <Text>{item}</Text>
            </Pressable>
          );
        })}
      </View>
    </List.Accordion>
  );
}

export default EditPostScreen;
