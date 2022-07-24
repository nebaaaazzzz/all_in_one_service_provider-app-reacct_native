import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  Modal,
  TextInput,
  StyleSheet,
  StatusBar,
  Keyboard,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import * as yup from "yup";
import { Divider, useTheme } from "react-native-paper";
import { UserContext } from "../../App.Navigator";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DatePicker from "@react-native-community/datetimepicker";
import AddEducation from "../../components/AddEducation";
import * as DocumentPicker from "expo-document-picker";

import AddLanguage from "../../components/AddLanguage";
import { useMutation } from "react-query";
import SelectDropdown from "react-native-select-dropdown";
import { useQueryClient } from "react-query";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

import { BASEURI, BASETOKEN } from "../../urls";
import Animated from "react-native-reanimated";
import { RadioButton } from "react-native-paper";
// import ImagePicker from "react-native-image-crop-picker";

const EditProfileScreen = () => {
  const user = useContext(UserContext);
  const { colors } = useTheme();
  const [image, setImage] = useState(null);

  let fall = new Animated.Value(1);

  const [open, setOpen] = useState(false);

  /* user info states */

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [date, setDate] = useState(new Date(user.dateOfBirth));
  const [skills, setSkills] = useState(user.skills || []);
  const [skill, setSkill] = useState("");

  const [education, setEducation] = useState(
    user.education.length ? user.education : []
  );
  const [gender, setGender] = useState(
    user.gender ? (user.gender == "male" ? "male" : "female") : undefiend
  );
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState();
  const [languages, setLanguages] = useState(user.languages || []);
  const [city, setCity] = useState();
  const [region, setRegion] = useState();
  /*user info error state */
  const [firstNameError, setFirstNameError] = useState();
  const [lastNameError, setLastNameError] = useState();
  const [emailError, setEmailError] = useState();
  /* */
  const regionsList = [
    "Addis Ababa",
    "Afar",
    "Amhara",
    "Benishangul-gumuz",
    "Dire Dawa",
    "Gambela",
    "Harari",
    "Oromia",
    "Sidama",
    "Somali",
    "South West Ethiopia Peoples' Region",
    "Tigray",
    "Southern",
  ];
  const [file, setFile] = useState();

  const [isEducation, setIsEducation] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();
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
  const mutation = useMutation(async () => {
    const formData = new FormData();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${BASETOKEN}`);
    if (file) {
      formData.append("cv", {
        uri: file.uri,
        name: file.name,
        type: file.mimeType,
      });
    }
    if (image) {
      formData.append("profile", {
        uri: image.uri,
        name: image.name,
        type: image.mimeType,
      });
    }
    const obj = {
      firstName,
      lastName,
      gender,
      dateOfBirth: date,
      email,
      description,
      city,
      region,
    };
    if (education.length) {
      obj.education = education;
    }
    if (languages.length) {
      obj.languages = languages;
    }
    if (skills.length) {
      obj.skills = skills;
    }
    formData.append("data", JSON.stringify(obj));

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: formData,
    };

    try {
      const response = await fetch(
        `${BASEURI}/user/update-profile`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  });
  if (mutation.isLoading) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color="#0244d0" size={"large"}></ActivityIndicator>
    </View>;
  }
  if (mutation.isError) {
    ToastAndroid.show(mutation.error.message, ToastAndroid.LONG);
    console.log(error.message);
  }
  if (mutation.isSuccess) {
    queryClient.refetchQueries("user");
    navigation.navigate("profile/");
  }

  return (
    <View style={[styles.container]}>
      <Modal
        visible={openModal}
        style={{ marginTop: StatusBar.currentHeight, flex: 1 }}
        collapsable
      >
        <Pressable onPress={() => Keyboard.dismiss()}>
          {isEducation ? (
            <AddEducation
              education={education}
              setOpenModal={setOpenModal}
              addEducation={setEducation}
            />
          ) : (
            <AddLanguage
              setOpenModal={setOpenModal}
              languages={languages}
              addLanguage={setLanguages}
            />
          )}
        </Pressable>
      </Modal>
      <ScrollView
        style={styles.subContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            // margin: 20,
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          }}
        >
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={async () => {
                const permission =
                  await ImagePicker.requestCameraPermissionsAsync();
                if (permission.granted) {
                  let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [2, 2],
                    quality: 1,
                  });
                  /*
                    if you want to discard them image just set imageUri to null
                  
                  
                   */
                  if (!result.cancelled) {
                    setImage(result);
                  }
                }
              }}
            >
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImageBackground
                  source={
                    image
                      ? {
                          uri: image.uri,
                        }
                      : {
                          uri: `${BASEURI}/profile-pic/${user.profilePic}`,
                          headers: {
                            Authorization: `Bearer ${BASETOKEN}`,
                          },
                        }
                  }
                  style={{
                    height: 100,
                    width: 100,
                    backgroundColor: "#0244d0",
                    borderRadius: 100,
                  }}
                  imageStyle={{ borderRadius: 15 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#fff",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <View style={styles.action}>
              <FontAwesome name="user-o" color={colors.text} size={20} />
              <TextInput
                value={firstName}
                selectionColor={"black"}
                onChangeText={async (text) => {
                  const yupSchema = yup
                    .string()
                    .required()
                    .matches(/^[A-Za-z]+$/, "alphabet only");
                  try {
                    await yupSchema.validate(text);
                    setFirstNameError("");
                  } catch (err) {
                    setFirstNameError(err.message);
                  }
                  setFirstName(text);
                }}
                placeholder="First Name"
                placeholderTextColor="#666666"
                autoCorrect={false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>
            {firstNameError ? (
              <Text style={{ color: "red" }}>{firstNameError}</Text>
            ) : (
              <></>
            )}
          </View>
          <View>
            <View style={styles.action}>
              <FontAwesome name="user-o" color={colors.text} size={20} />
              <TextInput
                selectionColor={"black"}
                value={lastName}
                onChangeText={async (text) => {
                  const yupSchema = yup
                    .string()
                    .required()
                    .matches(/^[A-Za-z]+$/, "alphabet only");
                  try {
                    await yupSchema.validate(text);
                    setLastNameError("");
                  } catch (err) {
                    setLastNameError(err.message);
                  }
                  setLastName(text);
                }}
                placeholder="Last Name"
                placeholderTextColor="#666666"
                autoCorrect={false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>
            {lastNameError ? (
              <Text style={{ color: "red" }}>{lastNameError}</Text>
            ) : (
              <></>
            )}
          </View>
          <View>
            <View style={styles.action}>
              <FontAwesome name="envelope-o" color={colors.text} size={20} />

              <TextInput
                selectionColor={"black"}
                value={email}
                keyboardType="email-address"
                autoCorrect={false}
                onChangeText={async (text) => {
                  const yupSchema = yup.string().email().required();

                  try {
                    await yupSchema.validate(text);
                    setEmailError("");
                  } catch (err) {
                    setEmailError(err.message);
                  }
                  setEmail(text);
                }}
                placeholder="Email"
                placeholderTextColor="#666666"
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>
            {emailError ? (
              <Text style={{ color: "red" }}>{emailError}</Text>
            ) : (
              <></>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View style={{ marginRight: "10%" }}>
              <Text style={{ color: "rgba(0,0,0,0.8)" }}>Gender</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "rgba(0,0,0,.6)" }}>Male</Text>
              <RadioButton
                value="male"
                color="#0244d0"
                status={gender === "male" ? "checked" : "unchecked"}
                onPress={() => setGender("male")}
              />
              <Text style={{ color: "rgba(0,0,0,.6)" }}>Female</Text>

              <RadioButton
                value="female"
                color="#0244d0"
                status={gender === "female" ? "checked" : "unchecked"}
                onPress={() => setGender("female")}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{
              flexDirection: "row",
              borderBottomWidth: 0.5,
              paddingBottom: 8,
              marginBottom: 10,
            }}
          >
            <Ionicons
              name="calendar-outline"
              size={20}
              style={{ marginRight: 5 }}
            />
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
          <View style={{ marginVertical: "5%" }}>
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
              data={regionsList}
              onSelect={(selectedItem, index) => {
                setRegion(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              defaultButtonText="Select Region"
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>

          <View style={styles.action}>
            <Icon name="map-marker-outline" color={colors.text} size={20} />
            <TextInput
              value={city}
              onChangeText={(text) => setCity(text)}
              selectionColor={"black"}
              placeholder="City"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>

          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>Skills</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                value={skill}
                selectionColor={"black"}
                onChangeText={setSkill}
                style={styles.textInput}
              />
              <Pressable
                disabled={skill?.length < 3}
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
                    color: skill?.length > 2 ? "#fff" : "rgba(0,0,0,0.5)",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                  }}
                >
                  Add
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={{ alignItems: "flex-start", marginTop: "2%" }}>
            {skills.map((item, index) => (
              <View
                key={index + 1}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#0244d0",
                  margin: 5,
                  padding: "3%",
                  paddingVertical: 5,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    marginHorizontal: "3%",
                  }}
                >
                  {item}
                </Text>
                <Pressable
                  onPress={() => {
                    setSkills(
                      skills.filter((i) => {
                        return item != i;
                      })
                    );
                  }}
                >
                  <Icon name="close" color="red" size={20} />
                </Pressable>
              </View>
            ))}
          </View>

          <View style={{ marginTop: "5%" }}>
            <Text style={{ marginBottom: "5%", fontSize: 16 }}>Languages</Text>
            <Pressable
              onPress={() => {
                setIsEducation(false);
                setOpenModal(true);
              }}
              style={{
                elevation: 5,
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0244d0",
                borderRadius: 5,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    marginHorizontal: "5%",
                    textAlign: "center",
                    color: "#fff",
                    paddingHorizontal: 10,
                  }}
                >
                  Add
                </Text>
                <Icon size={16} color="#fff" name="plus" />
              </View>
            </Pressable>
            <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
              {languages.map((item, index) => {
                return (
                  <View
                    key={index + 1}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <View
                      style={{
                        paddingRight: "10%",
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Text>{item.language}</Text>
                      <Text>{item.level}</Text>
                    </View>
                    <Pressable
                      style={{
                        alignItems: "flex-end",
                      }}
                    >
                      <Icon size={20} color="#0244d0" name="pencil" />
                    </Pressable>
                    <Pressable
                      style={{
                        marginHorizontal: "2%",
                        alignItems: "flex-end",
                      }}
                      onPress={() => {
                        const lang = languages.filter((i, j) => {
                          return i != index;
                        });
                        setLanguages(lang);
                      }}
                    >
                      <Icon color="red" size={20} name="delete" />
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{ marginTop: "5%" }}>
            <Text style={{ marginBottom: "5%", fontSize: 16 }}>Education</Text>
            <Pressable
              onPress={() => {
                setIsEducation(true);
                setOpenModal(true);
              }}
              style={{
                elevation: 5,
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0244d0",
                borderRadius: 5,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    marginHorizontal: "5%",
                    textAlign: "center",
                    color: "#fff",
                    paddingHorizontal: 10,
                  }}
                >
                  Add
                </Text>
                <Icon size={16} color="#fff" name="plus" />
              </View>
            </Pressable>
            <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
              {education.map((item, index) => {
                return (
                  <View key={index + 1}>
                    <Divider style={{ borderWidth: 0.5 }} />
                    <Text>{item.institution}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Text>
                          {item.start.getMonth() +
                            "/" +
                            item.start.getFullYear()}{" "}
                          -
                        </Text>
                        <Text>
                          {item.end.getMonth() + "/" + item.end.getFullYear()}
                        </Text>
                      </View>

                      <Pressable
                        onPress={() => {
                          const edu = education.filter((i, j) => {
                            return i != index;
                          });
                          setEducation(edu);
                        }}
                      >
                        <Icon name="delete" size={20} color="red" />
                      </Pressable>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>
                        {item.major} {"    "}
                      </Text>
                      <Text>{item.degree}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <View style={{ marginVertical: "5%" }}>
              <Text>bio</Text>
              <TextInput
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={{
                  borderWidth: 0.6,
                  borderRadius: 5,
                  padding: 5,
                  borderColor: "#0244d0",
                  selectionColor: "#fff",
                }}
                selectionColor="#000"
                multiline={true}
                numberOfLines={4}
              />
            </View>
          </View>
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
            <Text style={{ marginHorizontal: 5 }}>upload Cv</Text>
          </Pressable>
          <TouchableOpacity
            style={styles.commandButton}
            onPress={() => {
              mutation.mutate();
            }}
          >
            <Text style={styles.panelButtonTitle}>Submit</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    paddingHorizontal: "10%",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#0244d0",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    borderBottomWidth: 0.5,
    paddingVertical: 3,
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
