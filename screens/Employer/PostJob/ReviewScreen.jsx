import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  TouchableOpacity,
  Keyboard,
  ToastAndroid,
  Pressable,
  ActivityIndicator,
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
import { PostJobContext } from "./PostJobScreen";
import DatePicker from "@react-native-community/datetimepicker";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { BASEURI, BASETOKEN } from "../../../urls";
import { useTranslation } from "react-i18next";
const ReviewScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [date, setDate] = useState();
  const [datetime, setDatetime] = useState();
  const [cvRequired, setCvRequired] = useState(false);
  const { dispatch, jobPost } = useContext(PostJobContext);
  const dimension = useWindowDimensions();
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [englishLevel, setEnglishLevel] = useState();
  const [checkHour, setHour] = useState();
  const [gender, setGender] = useState();
  const [permanent, setPermanet] = useState(false);
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
    ToastAndroid.show(error.message, ToastAndroid.SHORT);
  }
  if (isLoading) {
    return (
      <View
        style={{ flex1: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size={"large"} color="#0244d0" />
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
            marginBottom: 80,
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
            {t("finish")}
          </Text>
          <Divider
            style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.2)" }}
          />
          <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {t("head")}
            </Text>
            <Text>{jobPost.title}</Text>
          </View>
          <Divider
            style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.2)" }}
          />
          <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {t("describe")}
            </Text>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 16 }}>{t("discription")}</Text>
              <Text style={{ fontSize: 16, marginVertical: 10 }}>
                {t("dis")}
              </Text>
            </View>
            <TextInput
              multiline
              numberOfLines={5}
              value={description}
              placeholder={t("already")}
              onChangeText={(text) => setDescription(text)}
            />
            <Text style={{ textAlign: "right" }}>{description.length}</Text>
            <TouchableOpacity
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
              <Text style={{ marginHorizontal: 5 }}> {t("attach")}</Text>
            </TouchableOpacity>
            <Text
              style={{
                marginHorizontal: 20,
                color: "rgba(0,0,0,0.6)",
              }}
            >
              {t("max")}
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
                {t("cat")}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>{jobPost?.category}</Text>
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 17, marginVertical: 10 }}
              >
                {t("skill")}
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
                        borderRadius: 15,
                        // backgroundColor: "#0244d0",
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
                    {t("salary")}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 16, marginLeft: "5%" }}>
                      {jobPost.budget.from} birr- {jobPost.budget.to} {t("bir")}
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      marginVertical: 10,
                    }}
                  >
                    {t("salary")}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 16, marginLeft: "5%" }}>
                      {jobPost.paymentStyle}
                    </Text>
                  </View>
                </View>
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
                    {t("work")}
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
                    {t("experience")}
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
            <Text>{t("deadline")}</Text>
            <TouchableOpacity
              // style={{ alignItems: "center" }}
              onPress={() => setOpen(true)}
            >
              {open ? (
                <DatePicker
                  value={date ? new Date(date) : new Date()} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  display="calendar"
                  maxDate="01-01-2019"
                  textColor="red"
                  minimumDate={new Date(1950, 0, 1)}
                  maximumDate={new Date(2000, 10, 20)}
                  onChange={({ nativeEvent: { timestamp } }) => {
                    if (timestamp) {
                      setDate(new Date(timestamp));
                    }
                    setOpen(false);
                  }}
                />
              ) : (
                <Text style={{ color: "#666", marginLeft: 5 }}>
                  {date
                    ? date.getDate() +
                      "/" +
                      (date.getMonth() + 1) +
                      "/" +
                      date.getFullYear()
                    : t("deaddate")}
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: "10%" }}
              onPress={() => setOpen1(true)}
            >
              {open1 ? (
                <DatePicker
                  value={datetime ? new Date(datetime) : new Date()} //initial date from state
                  mode="time" //The enum of date, datetime and time
                  display="clock"
                  maxDate="01-01-2019"
                  textColor="red"
                  minimumDate={new Date(1950, 0, 1)}
                  maximumDate={new Date(2000, 10, 20)}
                  onChange={({ nativeEvent: { timestamp } }) => {
                    if (timestamp) {
                      setDatetime(new Date(timestamp));
                    }
                    setOpen1(false);
                  }}
                />
              ) : (
                <Text style={{ color: "#666", marginLeft: 5 }}>
                  {datetime
                    ? datetime.getHours() + " : " + datetime.getMinutes()
                    : t("deadtime")}
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
            <Text>{t("permanent1")}</Text>
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
            <Text>{t("cv1")}</Text>
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
            {/* <ScreeningQuestion
              expanded={expanded}
              questions={questions}
              setQuestions={setQuestions}
              handlePress={handlePress}
            /> */}
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
          top: dimension.height - dimension.height / 7.5,
          alignItems: "center",
          justifyContent: "center",
          height: 60,
          backgroundColor: "#fff",
          width: "100%",
          borderTopWidth: 1,
          borderColor: "rgba(0,0,0,0.7)",
        }}
      >
        <TouchableOpacity
          disabled={description.length < 50}
          onPress={() => {
            if (date && datetime) {
              date.setHours(datetime.getHours() + 3);
              date.setMinutes(datetime.getMinutes());
            }
            dispatch({
              type: "add",
              payload: {
                description,
                file,
                deadline: date,
                datetime: datetime ? true : false,
                gender,
                permanent,
                englishLevel,
                cvRequired,
                hourPerWeek: checkHour,
              },
            });
            submitHandler();
          }}
          style={{
            width: "80%",
            borderRadius: 20,
            backgroundColor:
              description.length > 49 ? "blue" : "rgba(0,0,0,0.6)",
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Post Job</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// function ScreeningQuestion({ expanded, handlePress, questions, setQuestions }) {
//   const [isTextInput, setIsTextInput] = useState(false);
//   const [question, setQuestion] = useState("");
//   const [deleteIndex, setDeleteIndex] = useState("");
//   return (
//     <List.Accordion
//       left={(props) => (
//         <View {...props}>
//           <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//             Screening questions(optional)
//           </Text>
//           <Text style={{ color: "rgba(0,0,0,0.6)" }}>
//             Narrow down your candidated
//           </Text>
//         </View>
//       )}
//     >
//       {/* question must be more than 3 char */}
//       {!isTextInput ? (
//         <>
//           <TouchableOpacity
//             onPress={() => setIsTextInput(true)}
//             style={{
//               flexDirection: "row",
//               borderRadius: 20,
//               width: "90%",
//               alignSelf: "center",
//               alignItems: "center",
//               borderColor: "rgba(0,0,0,0.7))",
//               paddingVertical: 10,
//               elevation: 5,
//               marginVertical: 10,
//               justifyContent: "center",
//               backgroundColor: "#0244d0",
//             }}
//           >
//             <Icon size={18} color="#fff" name="plus" />
//             <Text
//               style={{
//                 fontSize: 16,
//                 color: "#fff",
//                 marginLeft: 10,
//                 textAlign: "center",
//               }}
//             >
//               Write your own question
//             </Text>
//           </TouchableOpacity>
//         </>
//       ) : (
//         <></>
//       )}

//       {isTextInput ? (
//         <View style={{ flex: 1 }}>
//           <View style={{ flexDirection: "row", flex: 1 }}>
//             <TextInput
//               style={{ width: "80%" }}
//               numberOfLines={10}
//               multiline={true}
//               defaultValue={question}
//               maxLength={255}
//               onChangeText={setQuestion}
//             />
//             <TouchableOpacity
//               style={{ alignSelf: "center" }}
//               onPress={() => {
//                 if (deleteIndex) {
//                   const newArr = questions.filter((i, j) => {
//                     return j + 1 != deleteIndex;
//                   });
//                   setQuestions(newArr);
//                   setQuestion("");
//                   setDeleteIndex("");
//                 }
//                 setIsTextInput(false);
//               }}
//             >
//               <Icon color="red" name="delete" size={24} />
//             </TouchableOpacity>
//           </View>
//           <Text style={{ marginLeft: "70%", marginVertical: 10 }}>
//             {question.length}/255
//           </Text>
//           <TouchableOpacity
//             disabled={!(question.length > 5)}
//             onPress={() => {
//               if (deleteIndex) {
//                 setQuestions(
//                   questions.map((item, index) => {
//                     return index === deleteIndex ? item : question;
//                   })
//                 );
//                 setDeleteIndex("");
//               } else {
//                 setQuestions([...questions, question]);
//               }
//               setIsTextInput(false);
//               setQuestion("");
//             }}
//             style={{
//               borderRadius: 20,
//               width: "80%",
//               paddingVertical: 10,
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor:
//                 question.length > 5 ? "#0244d0" : "rgba(0,0,0,0.6)",
//             }}
//           >
//             <Text style={{ color: "#fff", fontSize: 16 }}>Save question</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <></>
//       )}
//       {questions.length > 0 && !isTextInput ? (
//         <View>
//           <Text
//             style={{ fontWeight: "bold", fontSize: 20, marginVertical: 10 }}
//           >
//             Your questions
//           </Text>
//           <View>
//             {questions.map((item, index) => {
//               return (
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     marginVertical: "2%",
//                   }}
//                 >
//                   <Text style={{ fontSize: 18, marginHorizontal: 10 }}>
//                     {item}
//                   </Text>
//                   <TouchableOpacity
//                     onPress={() => {
//                       setIsTextInput(true);
//                       setQuestion(item);
//                       setDeleteIndex(index + 1);
//                     }}
//                   >
//                     <Icon size={20} name="circle-edit-outline" />
//                   </TouchableOpacity>
//                 </View>
//               );
//             })}
//           </View>
//         </View>
//       ) : (
//         <></>
//       )}

//       {/* uncomment this and show suggested question for the user */}
//       {/* <Text style={{ fontWeight: "bold", marginVertical: 15 }}>Suggested</Text>
//       {suggested.map((item, index) => {
//         return (
//           <TouchableOpacity
//             style={{ flexDirection: "row", width: "90%" }}
//             onPress={() => {
//               const newArr = checked.map((item, i) => {
//                 return i == index ? !checked[index] : item;
//               });
//               setChecked(newArr);
//             }}
//           >
//             <Checkbox status={checked[index] ? "checked" : "unchecked"} />
//             <Text>{item}</Text>
//           </TouchableOpacity>
//         );
//       })} */}
//     </List.Accordion>
//   );
// }
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
  const { t } = useTranslation();
  const englishLevels = [
    t("anylevel"),
    t("conversational"),
    t("fluent"),
    t("natie"),
  ];
  const hourPerWeeks = [t("more"), t("lessthan"), t("notsure")];
  return (
    <List.Accordion
      left={(props) => (
        <View {...props}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {t("advanced")}
          </Text>
          <Text style={{ color: "rgba(0,0,0,0.6)" }}>{t("hour")}</Text>
        </View>
      )}
      expanded={expanded}
      onPress={handlePress}
    >
      <View>
        <Text style={{ fontWeight: "bold" }}>{t("engl")}</Text>
        <View>
          {englishLevels.map((item, index) => {
            return (
              <TouchableOpacity
                key={index + 1}
                onPress={() => setEnglishLevel(item)}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <RadioButton
                  color="#0244d0"
                  value={item}
                  onPress={() => setEnglishLevel(item)}
                  status={englishLevel === item ? "checked" : "unchecked"}
                />
                <Text>{englishLevels[index]}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{t("hours")}</Text>
        {hourPerWeeks.map((item, index) => {
          return (
            <TouchableOpacity
              key={index + 1}
              onPress={() => setHour(item)}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <RadioButton
                color="#0244d0"
                onPress={() => setHour(item)}
                value={item}
                status={checkHour === item ? "checked" : "unchecked"}
              />
              <Text>{hourPerWeeks[index]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{t("genderr")}</Text>
        {["male", "female", "both"].map((item, index) => {
          return (
            <TouchableOpacity
              key={index + 1}
              onPress={() => setGender(item)}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <RadioButton
                onPress={() => setGender(item)}
                color="#0244d0"
                value={item}
                status={gender === item ? "checked" : "unchecked"}
              />
              <Text>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </List.Accordion>
  );
}
export default ReviewScreen;
