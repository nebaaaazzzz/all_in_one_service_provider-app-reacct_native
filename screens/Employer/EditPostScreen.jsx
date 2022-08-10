import SelectDropdown from "react-native-select-dropdown";
import { categoryList } from "../../constants/data";
import React, { useState, useEffect, useRef } from "react";
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
  Modal,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  RadioButton,
  Checkbox,
  List,
  Divider,
  TextInput,
  Searchbar,
} from "react-native-paper";
import { MAPBOXTOKEN, MAPBOXURI } from "../../urls";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as DocumentPicker from "expo-document-picker";
import DatePicker from "@react-native-community/datetimepicker";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { BASEURI, BASETOKEN } from "./../../urls";
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
const pay = ["Fixed", "By Negotiation", "By The Organization Scale"];

const genderList = ["Male", "Female", "Both"];
const EditPostScreen = ({ navigation, route }) => {
  /*LOCATION SCREEN STATES */
  const [isFull, setIsFull] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [searchResult, setSearchResut] = useState([]);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const inputRef = useRef();
  const pressHandler = async () => {
    await Location.enableNetworkProviderAsync();
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      ToastAndroid.show(
        "Permission to access location was denied",
        ToastAndroid.LONG
      );
      return;
    }
    try {
      const getLocation = async (location) => {
        try {
          const response = await fetch(
            `${MAPBOXURI}/mapbox.places/${location.coords.longitude},${location.coords.latitude}.json?access_token=${MAPBOXTOKEN}`
          );
          const r = await response.json();
          if (r.features[0].place_name && r.features[0].center) {
            setIsGettingLocation(false);
            setCenter(r.features[0].center);
            setLocationModal(false);
            setPinSpotModal(true);
          }
        } catch (err) {
          ToastAndroid.show(
            "check your internet connection",
            ToastAndroid.LONG
          );
          setIsGettingLocation(false);
          throw err;
        }
      };

      setIsGettingLocation(true);
      const t = setTimeout(async () => {
        try {
          const location = await Location.getLastKnownPositionAsync();
          getLocation(location);
        } catch (err) {
          throw err;
        }
      }, 10000);
      try {
        const location = await Location.getCurrentPositionAsync();
        clearTimeout(t);
        getLocation(location);

        // navigation.navigate("employer/postjob/pinspot", {
        //   center,
        //   placeName,
        // });
      } catch (err) {
        throw err;
      }
    } catch (err) {
      throw err;
    }
  };
  const searchListPressHandler = (index) => {
    setCenter(searchResult[index].center);
    setLocationModal(false);
    setPinSpotModal(true);
  };

  /* */
  const queryClient = useQueryClient();
  const jobPost = route.params.data;
  const dimension = useWindowDimensions();

  /*for data and time to open */
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  /* */

  /*for place modal controller */
  const [locationModal, setLocationModal] = useState(false);
  const [pinSpotModal, setPinSpotModal] = useState(false);

  const handlePress = () => setExpanded(!expanded);
  const [expanded, setExpanded] = useState(false); //for advanced accordion
  const [bool, setBool] = useState(false); //for payment to make button active
  const [skill, setSkill] = useState("");

  /* post data*/
  const [date, setDate] = useState(
    jobPost?.deadline ? new Date(jobPost?.deadline) : undefined
  );
  const [datetime, setDatetime] = useState(
    jobPost?.deadtime ? new Date(jobPost?.deadline) : undefined
  );
  const [experience, setExperience] = useState(
    exp.findIndex((item) => item.title === jobPost?.experience?.title)
  );
  const [center, setCenter] = useState(jobPost?.location?.coordinates);
  const [cvRequired, setCvRequired] = useState(jobPost.cvRequired);
  const [category, setCategory] = useState(jobPost.category);
  const [skills, setSkills] = useState(jobPost?.skills || []);
  const [placeName, setPlaceName] = useState(jobPost.placeName);
  const [region, setRegion] = useState(jobPost.region);
  const [file, setFile] = useState("");
  const [description, setDescription] = useState(jobPost.description);
  const [englishLevel, setEnglishLevel] = useState(jobPost?.englishLevel);
  const [checkHour, setHour] = useState(jobPost?.hourPerWeek);
  const [gender, setGender] = useState(jobPost?.gender);
  const [permanent, setPermanet] = useState(jobPost?.permanent);
  const [headline, setHeadline] = useState(jobPost.title);
  /*payment */
  const [fromBudget, setFromBudget] = useState(
    jobPost?.budget?.from ? String(jobPost?.budget?.from) : undefined
  );
  const [toBudget, setToBudget] = useState(
    jobPost?.budget?.to ? String(jobPost?.budget?.to) : undefined
  );
  const [paymentStyle, setPaymentStyle] = React.useState(
    pay.findIndex((item) => jobPost?.paymentStyle === item)
  );
  /* */

  useEffect(() => {
    if (paymentStyle !== undefined) {
      if (paymentStyle > 0) {
        setBool(true);
      } else {
        setBool(
          parseFloat(fromBudget) &&
            parseFloat(toBudget) &&
            parseFloat(fromBudget) < parseFloat(toBudget)
        );
      }
    } else {
      setBool(false);
    }
  }, [paymentStyle, fromBudget, toBudget]);
  /* */
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
      const response = await fetch(
        `${BASEURI}/employer/update/${jobPost._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${BASETOKEN}`,
          },
          body: data,
        }
      );
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
    //experience placeName file
    formData.append(
      "body",
      JSON.stringify({
        title: headline,
        description,
        datetime: datetime ? true : false,
        deadline,
        experience: exp[experience],
        category,
        skills,
        permanent,
        placeName,
        cvRequired,
        englishLevel,
        hourPerWeeks,
        gender,
        ...(region ? { region } : {}),
        ...(paymentStyle == 0
          ? {
              paymentStyle: exp[paymentStyle],
              budget: {
                from: fromBudget,
                to: toBudget,
              },
            }
          : { paymentStyle: exp[paymentStyle] }),
      })
    );
    mutate(formData);
  };

  if (isSuccess) {
    navigation.goBack();
    ToastAndroid.show("successfuly updated");
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
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetch(
        `${MAPBOXURI}/mapbox.places/${locationQuery}.json?access_token=${MAPBOXTOKEN}`
      )
        .then(async (res) => {
          const s = await res.json();
          if (s.features) {
            setSearchResut(s.features);
          }
        })
        .catch((err) => {
          throw err;
        });
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [locationQuery]);
  return (
    <View style={{ flex: 1 }}>
      <Modal visible={locationModal}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View
            style={{
              flex: 1,
              // backgroundColor: "#0099ff",
              backgroundColor: "rgba(0,0,0,0.3)",
              marginTop: StatusBar.currentHeight,
            }}
          >
            <Modal visible={isGettingLocation} animationType="fade">
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View>
                  <ActivityIndicator color={"#0244d0"} size="large" />
                  <Text style={{ marginTop: "10%" }}>
                    Getting Current Location
                  </Text>
                </View>
              </View>
            </Modal>

            <View
              style={{
                backgroundColor: "#fff",
                flex: 1,
              }}
            >
              {isFull ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setIsFull(false);
                      setLocationQuery("");
                      inputRef.current.clear();
                    }}
                  >
                    <Icon size={20} name="arrow-left" />
                  </TouchableOpacity>
                  <Text style={{ fontWeight: "600", fontSize: 20 }}>
                    Enter your address
                  </Text>
                  <Text></Text>
                </View>
              ) : (
                <></>
              )}

              {isFull ? (
                <></>
              ) : (
                <MapView
                  style={{
                    flex: 1,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  }}
                  cacheEnabled
                  initialRegion={{
                    latitude: 11.5968568,
                    longitude: 37.3981523,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />
              )}

              <Searchbar
                onChangeText={setLocationQuery}
                icon={"location-enter"}
                iconColor={"#0244d0"}
                ref={inputRef}
                onFocus={() => {
                  if (isFull) {
                    setSearch(true);
                  } else {
                    inputRef.current.blur();
                    setIsFull(true);
                  }
                }}
                onBlur={() => {
                  setSearch(false);
                }}
                style={{
                  borderRadius: 10,
                  marginTop: "10%",
                  width: "90%",
                  position: isFull ? "relative" : "absolute",
                  // top: "10%",
                  transform: [{ translateX: 10 }],
                }}
              />
              {isFull && (search || locationQuery) ? (
                <ScrollView
                  style={{ marginVertical: 10, paddingHorizontal: 20 }}
                  showsVerticalScrollIndicator={false}
                >
                  {searchResult.map((place, index) => {
                    return (
                      <TouchableOpacity
                        key={index + 1}
                        onPress={() => {
                          searchListPressHandler(index);
                        }}
                        style={{ borderBottomWidth: 0.2, marginVertical: 5 }}
                      >
                        <Text style={{ marginVertical: "2%" }}>
                          {place.place_name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              ) : (
                <></>
              )}
              {isFull && !search && !locationQuery ? (
                <>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      transform: [{ translateX: 25 }],

                      marginTop: "5%",
                    }}
                    onPress={pressHandler}
                  >
                    <FIcon name="location-arrow" color="#0244d0" size={20} />
                    <Text style={{ marginLeft: "5%", fontSize: 18 }}>
                      Use my current location
                    </Text>
                  </TouchableOpacity>
                  {/* add this feature to add address manually */}
                  {/* <TouchableOpacity
                style={{
                  marginVertical: 10,

                  transform: [{ translateX: 25 }],
                }}
              >
                <Text
                  style={{
                    fontWeight: "900",
                    textDecorationLine: "underline",
                    fontSize: 18,
                  }}
                >
                  Enter address manually
                </Text>
              </TouchableOpacity> */}
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
        </Pressable>
        <Pressable onPress={() => setLocationModal(false)}>
          <Text>Close</Text>
        </Pressable>
      </Modal>
      <Modal visible={pinSpotModal}>
        <View
          style={{
            marginTop: StatusBar.currentHeight,
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.02)",
          }}
        >
          <Text
            style={{
              color: "rgba(0,0,0,0.6)",
              fontSize: 18,
              textAlign: "center",
              margin: "5%",
            }}
          >
            Is this the correct location, in the red marker? you can press and
            drag and change locations!
          </Text>
          <MapView
            style={{
              flex: 1,
            }}
            region={{
              latitude: center[1],
              longitude: center[0],
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0021,
            }}
            initialRegion={{
              latitude: center[1],
              longitude: center[0],
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0021,
            }}
          >
            <Marker
              onDragEnd={({ nativeEvent: { coordinate } }) => {
                setCenter([coordinate.longitude, coordinate.latitude]);
              }}
              flat
              draggable
              coordinate={{ latitude: center[1], longitude: center[0] }}
            />
          </MapView>
          <View
            style={{
              backgroundColor: "#fff",
              borderTopWidth: 2,
              alignItems: "flex-end",
              height: 60,
              justifyContent: "center",
              borderColor: "rgba(0,0,0,0.3)",
            }}
          >
            <TouchableOpacity
              onPress={async () => {
                const response = await fetch(
                  `${MAPBOXURI}/mapbox.places/${center[0]},${center[1]}.json?access_token=${MAPBOXTOKEN}`
                );
                const r = await response.json();
                if (r?.features[0]?.place_name && r.features[0].center) {
                  if (r.features[0].place_type[0] === "locality") {
                    const region = r.features[0].context.filter((i, j) => {
                      return i.id.startsWith("region");
                    });
                    setCenter(r.features[0].center);
                    setRegion(region[0]?.text);
                    setPlaceName(r.features[0].place_name);
                  } else {
                    dispatch({
                      type: "add",
                      payload: {
                        center: r.features[0].center,
                        placeName: r?.features[0]?.place_name,
                      },
                    });
                  }
                  navigation.navigate("employer/postjob/payment");
                }
              }}
              style={{
                backgroundColor: "#0244d0",
                width: 100,
                right: 20,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
              }}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Pressable onPress={() => setPinSpotModal(false)}>
          <Text>Close</Text>
        </Pressable>
      </Modal>
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
            Edit Your Post and Update
          </Text>
          <Divider
            style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.2)" }}
          />
          <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Headline</Text>
            <TextInput
              value={headline}
              onChangeText={setHeadline}
              multiline={true}
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
                This is how employees figures out what you need and why you’re
                great to work with!
              </Text>
              <Text style={{ fontSize: 16, marginVertical: 10 }}>
                Include your expectations about the task or deliverable, what
                you’re looking for in a work environment, and anything unique
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
              <Text style={{ marginHorizontal: 5 }}>Attach file</Text>
            </TouchableOpacity>
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
                    height: 40,
                    borderRadius: 5,
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
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
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
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{ fontWeight: "bold", fontSize: 17, marginVertical: 10 }}
              >
                skills
              </Text>
              <View style={{ flexDirection: "row" }}>
                {skills?.map((item, index) => {
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

            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Salary</Text>
              <View style={{ marginVertical: 14 }}>
                {pay.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index + 1}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 5,
                      }}
                      onPress={() => setPaymentStyle(index)}
                    >
                      <RadioButton
                        value={index}
                        color="#0244d0"
                        onPress={() => setPaymentStyle(index)}
                        status={
                          paymentStyle === index ? "checked" : "unchecked"
                        }
                      />

                      <View>
                        <Text style={{ fontSize: 16 }}>{item}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {paymentStyle === 0 ? (
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      marginVertical: 10,
                    }}
                  >
                    Start and End Price
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <TextInput
                      style={{ flex: 1, marginHorizontal: 5 }}
                      value={fromBudget}
                      keyboardType="number-pad"
                      onChangeText={setFromBudget}
                    />

                    <TextInput
                      style={{ flex: 1, marginHorizontal: 5 }}
                      value={toBudget}
                      keyboardType="number-pad"
                      onChangeText={setToBudget}
                    />
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
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: "5%",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{placeName}</Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#0244d0",
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                        borderRadius: 10,
                        elevation: 10,
                        marginLeft: "5%",
                      }}
                      onPress={() => {
                        setLocationModal(true);
                      }}
                    >
                      <Text style={{ color: "#fff" }}>Change Place</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
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
              <View style={{ marginVertical: 14 }}>
                {exp.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index + 1}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 5,
                      }}
                      onPress={() => setExperience(index)}
                    >
                      <RadioButton
                        value={index}
                        color="#0244d0"
                        onPress={() => setExperience(index)}
                        status={experience === index ? "checked" : "unchecked"}
                      />
                      <View>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                          {item.title}
                        </Text>
                        <Text style={{ marginRight: "10%" }}>
                          {item.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
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
                    : "set deadline date"}
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
                    : "set date linetime"}
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
          top: dimension.height - 80,
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
          disabled={description.length < 50 || !bool}
          onPress={() => {
            if (date && datetime) {
              date.setHours(datetime.getHours() + 3);
              date.setMinutes(datetime.getMinutes());
            }
            // dispatch({
            //   type: "add",
            //   payload: {
            //     description,
            //     file,
            //     deadline: date,
            //     datetime: datetime ? true : false,
            //     gender,
            //     permanent,
            //     englishLevel,
            //     cvRequired,
            //     hourPerWeek: checkHour,
            //   },
            // });
            submitHandler();
          }}
          style={{
            width: "80%",
            borderRadius: 20,
            backgroundColor:
              description.length > 49 && bool ? "blue" : "rgba(0,0,0,0.6)",
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Update Job</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Hours per week</Text>
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
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Gender required
        </Text>
        {genderList.map((item, index) => {
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
export default EditPostScreen;
