import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import DatePicker from "@react-native-community/datetimepicker";
import SelectDropdown from "react-native-select-dropdown";
const AddEducation = ({ education, addEducation, setOpenModal }) => {
  const [date1, setDate1] = useState();
  const [date2, setDate2] = useState();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [major, setMajor] = useState("");
  const degreeTypes = [
    "Certificate",
    "Deploma",
    "Associate Degree",
    "Bachelor’s Degree",
    "Master’s Degree",
    "Doctoral Degree",
  ];
  return (
    <View>
      <View style={{ paddingHorizontal: "10%" }}>
        <TextInput
          value={institution}
          onChangeText={(text) => setInstitution(text)}
          placeholder="institution"
          style={styles.textInput}
          selectionColor={"#000"}
        />
        <TextInput
          value={major}
          onChangeText={(text) => setMajor(text)}
          placeholder="major"
          style={styles.textInput}
          selectionColor={"#000"}
        />
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
          data={degreeTypes}
          onSelect={(selectedItem, index) => {
            setDegree(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          defaultButtonText="Select Category"
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: "5%",
          }}
        >
          <TouchableOpacity
            onPress={() => setOpen1(true)}
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
            {open1 ? (
              <DatePicker
                value={date1 ? new Date(date1) : new Date()} //initial date from state
                mode="date" //The enum of date, datetime and time
                display="calendar"
                textColor="red"
                maximumDate={new Date()}
                onChange={({ nativeEvent: { timestamp } }) => {
                  if (timestamp) {
                    setDate1(new Date(timestamp));
                  }
                  setOpen1(false);
                }}
              />
            ) : (
              <Text style={{ color: "#666", marginLeft: 5, marginTop: 5 }}>
                {date1 ? date1.getMonth() + "/" + date1.getFullYear() : "Start"}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOpen2(true)}
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
            {open2 ? (
              <DatePicker
                value={date2 ? new Date(date2) : new Date()} //initial date from state
                mode="date" //The enum of date, datetime and time
                display="calendar"
                textColor="red"
                maximumDate={new Date()}
                onChange={({ nativeEvent: { timestamp } }) => {
                  if (timestamp) {
                    setDate2(new Date(timestamp));
                  }
                  setOpen2(false);
                }}
              />
            ) : (
              <Text style={{ color: "#666", marginLeft: 5, marginTop: 5 }}>
                {date2 ? date2.getMonth() + "/" + date2.getFullYear() : "end"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            elevation: 5,
            backgroundColor: "red",
            paddingHorizontal: "15%",
            paddingVertical: "2%",
            borderRadius: 5,
          }}
          onPress={() => {
            setOpenModal(false);
          }}
        >
          <Text style={{ color: "#fff" }}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!(degree && institution && major && date1 && date2)}
          style={{
            alignSelf: "center",
            elevation: 5,
            backgroundColor:
              degree && institution && major && date1 && date2
                ? "#0244d0"
                : "#ccc",
            paddingHorizontal: "15%",
            paddingVertical: "2%",
            borderRadius: 5,
          }}
          onPress={() => {
            addEducation([
              ...education,
              { institution, degree, major, start: date1, end: date2 },
            ]);
            setOpenModal(false);
          }}
        >
          <Text style={{ color: "#fff" }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    marginVertical: "5%",
    padding: 5,
  },
});
export default AddEducation;
