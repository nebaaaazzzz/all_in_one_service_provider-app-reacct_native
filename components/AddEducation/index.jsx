import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import DatePicker from "@react-native-community/datetimepicker";

const AddEducation = () => {
  const [date1, setDate1] = useState();
  const [date2, setDate2] = useState();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  return (
    <View>
      <TextInput style={styles.textInput} selectionColor={"#000"} />
      <TextInput style={styles.textInput} selectionColor={"#000"} />
      <View style={{ flexDirection: "row" }}>
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
              {date1
                ? date1.getDay() +
                  "/" +
                  date1.getMonth() +
                  "/" +
                  date1.getFullYear()
                : "from"}
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
              {date2
                ? date2.getDay() +
                  "/" +
                  date2.getMonth() +
                  "/" +
                  date2.getFullYear()
                : "to"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
  },
});
export default AddEducation;
