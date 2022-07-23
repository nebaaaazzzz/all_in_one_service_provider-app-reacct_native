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
  Button,
  StatusBar,
} from "react-native";
import * as yup from "yup";
import { Divider, useTheme } from "react-native-paper";
import { UserContext } from "../../App.Navigator";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DatePicker from "@react-native-community/datetimepicker";
import AddEducation from "../../components/AddEducation";
import AddLanguage from "../../components/AddLanguage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BASEURI, BASETOKEN } from "../../urls";
import Animated from "react-native-reanimated";
import { RadioButton } from "react-native-paper";
// import ImagePicker from "react-native-image-crop-picker";

const EditProfileScreen = () => {
  const user = useContext(UserContext);
  const { colors } = useTheme();
  const takePhotoFromCamera = () => {
    // ImagePicker.openCamera({
    //   compressImageMaxWidth: 300,
    //   compressImageMaxHeight: 300,
    //   cropping: true,
    //   compressImageQuality: 0.7,
    // }).then((image) => {
    //   console.log(image);
    //   setImage(image.path);
    //   this.bs.current.snapTo(1);
    // });
  };

  const choosePhotoFromLibrary = () => {
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 300,
    //   cropping: true,
    //   compressImageQuality: 0.7,
    // }).then((image) => {
    //   console.log(image);
    //   setImage(image.path);
    //   this.bs.current.snapTo(1);
    // });
  };
  const bs = React.createRef();
  let fall = new Animated.Value(1);

  const languageLevel = ["beginner", "conversational", " fluent"];
  const [open, setOpen] = useState(false);

  /* user info states */

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [date, setDate] = useState(new Date(user.dateOfBirth));
  const [skills, setSkills] = useState(user.skills || []);
  const [skill, setSkill] = useState("");
  const [education, setEducation] = useState(
    user.education.length
      ? user.education
      : [
          {
            place: "Bahir Dar university",
            from: "Jan/2016",
            to: "Sep/2022",
            degree: "Bachelor",
            major: "Computer Science",
          },
        ]
  );
  const [gender, setGender] = useState(
    user.gender ? (user.gender == "male" ? "male" : "female") : undefiend
  );
  const [email, setEmail] = useState(user.email);
  const [description, setDescriptio] = useState();
  const [languages, setLanguages] = useState(
    user.languages || [{ name: "English", level: "fluen" }]
  );

  /*user info error state */
  const [firstNameError, setFirstNameError] = useState();
  const [lastNameError, setLastNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [descriptionError, setDescriptionError] = useState();
  /* */
  const [openModal, setOpenModal] = useState(false);
  return (
    <View style={[styles.container]}>
      <Modal
        visible={openModal}
        style={{ marginTop: StatusBar.currentHeight, flex: 1 }}
        collapsable
      >
        <AddEducation />
        <AddLanguage />
        <Button
          title="close"
          onPress={() => {
            setOpenModal(false);
          }}
        />
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
            <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
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
                  source={{
                    uri: `${BASEURI}/profile-pic/${user.profilePic}`,
                    headers: {
                      Authorization: `Bearer ${BASETOKEN}`,
                    },
                  }}
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
          <View style={styles.action}>
            <FontAwesome name="globe" color={colors.text} size={20} />
            <TextInput
              selectionColor={"black"}
              placeholder="Country"
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
          <View style={styles.action}>
            <Icon name="map-marker-outline" color={colors.text} size={20} />
            <TextInput
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
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Text>{item.name}</Text>
                      <Text>{item.level}</Text>
                    </View>
                    <Pressable
                      style={{
                        flex: 1,
                        alignItems: "flex-end",
                      }}
                    >
                      <Icon size={20} color="#0244d0" name="pencil" />
                    </Pressable>
                    <Pressable
                      style={{
                        flex: 1,
                        alignItems: "flex-end",
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
                    <Text>{item.place}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Text>{item.from} - </Text>
                        <Text>{item.to}</Text>
                      </View>

                      <Pressable>
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
          </View>

          <TouchableOpacity style={styles.commandButton} onPress={() => {}}>
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
    marginTop: "15%",
    marginBottom: "15%",
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
