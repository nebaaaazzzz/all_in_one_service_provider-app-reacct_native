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
  Image,
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
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";
import * as SecureStore from "expo-secure-store";

import * as DocumentPicker from "expo-document-picker";
import DatePicker from "@react-native-community/datetimepicker";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import { BASEURI, BASETOKEN } from "./../../urls";
import { useTranslation } from "react-i18next";
import * as Location from "expo-location";
const EditPostScreen = ({ navigation, route }) => {
  const { t: tr } = useTranslation();
  const pay = [tr("fixed"), tr("negotiation"), tr("byorganization")];

  const hourPerWeeks = [tr("more"), tr("lessthan"), tr("notsure")];
  const exp = [
    {
      title: tr("entry"),
      description: tr("look"),
    },
    {
      title: tr("intermediate"),
      description: tr("look1"),
    },
    {
      title: tr("expert"),
      description: tr("look2"),
    },
  ];
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
          setIsGettingLocation(false);
          setCenter(location.coords.longitude, location.coords.latitude);
        } catch (err) {
          ToastAndroid.show(t("check1"), ToastAndroid.LONG);
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
    setCenter([searchResult[index].lon, searchResult[index].lat]);
    setLocationModal(false);
    console.log(center);
    setSearchResut([]);
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
  const [documentExits, setDocumentExits] = useState(false);
  useEffect(() => {
    (async function check() {
      setDocumentExits(
        await RNFS.exists(`${RNFS.DocumentDirectoryPath}/${jobPost.document}`)
      );
    })();
  }, []); /*payment */
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
        // `${BASEURI}/employer/update/${jobPost._id}`,
        `${BASEURI}/employer/update/629ef13df462f9bdfebbde07`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${
              BASETOKEN || (await SecureStore.getItemAsync("token"))
            }`,
          },
          body: data,
        }
      );
      return response.json();
    }
  );

  const submitHandler = () => {
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
        deadline: date,
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
              paymentStyle: pay[paymentStyle],
              budget: {
                from: fromBudget,
                to: toBudget,
              },
            }
          : { paymentStyle: pay[paymentStyle] }),
      })
    );
    mutate(formData);
  };
  const localFile = `${RNFS.DocumentDirectoryPath}/${jobPost.cv}`;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetch(
        `${MAPBOXURI}geocode/search?text=/${locationQuery}&filter=countrycode:et&format=json&apiKey=${MAPBOXTOKEN}`
      )
        .then(async (res) => {
          const s = await res.json();
          if (s.results) {
            setSearchResut(s.results);
          }
        })
        .catch((err) => {
          throw err;
        });
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [locationQuery]);
  if (isSuccess) {
    navigation.goBack();
    ToastAndroid.show("successfuly updated", ToastAndroid.LONG);
  }

  if (isError) {
    ToastAndroid.show(error.message, ToastAndroid.SHORT);
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color="#0244d0" />
      </View>
    );
  }
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
                  <Text style={{ marginTop: "10%" }}>{tr("getting")}</Text>
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
                    {tr("enter")}
                  </Text>
                  <Text></Text>
                </View>
              ) : (
                <Image
                  style={{
                    flex: 1,
                    // borderTopLeftRadius: 15,
                    // borderTopRightRadius: 15,
                  }}
                  source={{
                    uri: `${MAPBOXURI}staticmap?style=osm-carto&width=600&height=400&center=lonlat:${center[0]},${center[1]}&zoom=14&apiKey=${MAPBOXTOKEN}`,
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
                          {place.formatted}
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
                    <FontAwesomeIcon
                      name="location-arrow"
                      color="#0244d0"
                      size={20}
                    />
                    <Text style={{ marginLeft: "5%", fontSize: 18 }}>
                      {tr("current")}
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
        <Pressable
          onPress={() => {
            setSearchResut([]);
            setLocationModal(false);
          }}
          style={{ backgroundColor: "#0244d0", paddingVertical: 10 }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            {tr("close")}
          </Text>
        </Pressable>
      </Modal>
      <Modal
        visible={pinSpotModal}
        onShow={() => {
          console.log("this is fsa");
          (async function () {
            const result =
              await fetch(`${MAPBOXURI}/geocode/reverse?lat=${center[1]}&lon=${center[0]}&format=json&apiKey=${MAPBOXTOKEN}
            `);
            const data = await result.json();
            setRegion(data.results[0].state);
            setPlaceName(data.results[0].formatted);
          })();
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.02)",
          }}
        >
          <View style={{ flex: 1 }}>
            <Image
              onLayout={() => <ActivityIndicator />}
              style={{ flex: 1 }}
              source={{
                uri: `${MAPBOXURI}/staticmap?style=osm-carto&width=${600}&height=${500}&center=lonlat:${
                  center[0]
                },${center[1]}&zoom=14&marker=lonlat:${center[0]},${
                  center[1]
                };color:%23ff0000;size:medium&apiKey=${MAPBOXTOKEN}`,
              }}
            />
          </View>

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
                setPinSpotModal(false);
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
              <Text style={{ textAlign: "center", color: "#fff" }}>
                {tr("close")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
            {tr("edit")}
          </Text>
          <Divider
            style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.2)" }}
          />
          <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {tr("headline")}
            </Text>
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
              {tr("describe")}
            </Text>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 16 }}>{tr("discription")}</Text>
              <Text style={{ fontSize: 16, marginVertical: 10 }}>
                {tr("dis")}
              </Text>
            </View>
            <TextInput
              multiline
              numberOfLines={5}
              value={description}
              placeholder={tr("already")}
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
              <Text style={{ marginHorizontal: 5 }}> {tr("attach")}</Text>
            </TouchableOpacity>
            <Text
              style={{
                marginHorizontal: 20,
                color: "rgba(0,0,0,0.6)",
              }}
            >
              {tr("max")}
            </Text>
            {jobPost.document ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "#0244d0",
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  alignSelf: "flex-end",
                }}
                onPress={async () => {
                  if (documentExits) {
                    FileViewer.open(localFile);
                  } else {
                    const options = {
                      fromUrl: `${BASEURI}/cv/${jobPost.cv}`,
                      toFile: localFile,
                    };
                    RNFS.downloadFile(options, {
                      begin: (s) => console.log(s),
                      progress: (s) => {
                        console.log(s);
                      },
                    })
                      .promise.then(() => FileViewer.open(localFile))
                      .then(() => {
                        // success
                      })
                      .catch((error) => {
                        // error
                      });
                  }
                }}
              >
                {cvExists ? (
                  <Text style={{ color: "#fff" }}>{tr("open")}</Text>
                ) : (
                  <Text style={{ color: "#fff" }}>{tr("down")}</Text>
                )}
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
          <Divider
            style={{ borderWidth: 0.5, borderColor: "rgba(0,0,0,0.2)" }}
          />
          <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
            <View>
              <Text
                style={{ fontWeight: "bold", fontSize: 17, marginVertical: 10 }}
              >
                {tr("cat")}
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
                    {tr("add")}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{ fontWeight: "bold", fontSize: 17, marginVertical: 10 }}
              >
                {tr("skill")}
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
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {tr("salary")}
              </Text>
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
                    {tr("salary")}
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
                    {tr("work")}
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
                      <Text style={{ color: "#fff" }}>{tr("change")}</Text>
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
                {tr("experience")}
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
            <Text>{tr("deadline")}</Text>
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
                    : tr("deaddate")}
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
                    : tr("deadtime")}
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
            <Text>{tr("permanent1")}</Text>
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
            <Text>{tr("cv1")}</Text>
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
              description.length > 49 && bool ? "#0244d0" : "rgba(0,0,0,0.6)",
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>{tr("update")}</Text>
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
  const { t } = useTranslation();
  const englishLevels = [
    t("anylevel"),
    t("conversational"),
    t("fluent"),
    t("natie"),
  ];
  const genderList = [t("male"), t("female"), t("any")];
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
