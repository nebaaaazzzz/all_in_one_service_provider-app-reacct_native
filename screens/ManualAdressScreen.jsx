import {
  ScrollView,
  View,
  Text,
  StatusBar,
  useWindowDimensions,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import countryList from "../utils/countrylist";
import { Picker, onOpen } from "react-native-actions-sheet-picker";
import MapView from "react-native-maps";

const STextInput = styled(TextInput)`
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.4);
  padding: 10px 10px;
  color: rgba(0, 0, 0, 0.2);
  font-size: 18px;
`;
const ManualAdressScreen = () => {
  const { height, width } = useWindowDimensions();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [apt, setApt] = useState("");
  const [location, setLocation] = useState([82.07, 44, 89]);
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  useEffect(() => {
    setData(countryList);
  }, []);
  const filteredData = useMemo(() => {
    if (data && data.length > 0) {
      return data.filter((item) => {
        return item.name
          .toLocaleLowerCase("en")
          .includes(query.toLocaleLowerCase("en"));
      });
    }
  }, [data, query]);
  const onSearch = (text) => {
    setQuery(text);
  };
  useEffect(() => {
    setTimeout(() => {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
          street + " " + apt + " " + city + " " + state + " " + zipCode
        )}.json?access_token=pk.eyJ1IjoibmViYWFhYXp6enoiLCJhIjoiY2w0bHB0bWVkMHJibDNmbzFpenA5dmRkbyJ9.jSio18EC3_YJ0EcxYsFx-w&country=${country}`
      )
        .then(async (res) => {
          const j = await res.json();
          if (j?.features[0]?.center) {
            setLocation(j.features[0].center);
          }
        })
        .catch((err) => {
          throw err;
        });
    }, 1000);
  }, [country, apt, state, street, zipCode, city]);
  return (
    <View style={{ alignItems: "center", marginTop: StatusBar.currentHeight }}>
      <View
        style={{
          borderRadius: 10,
          borderColor: "rgba(0, 0, 0, 0.2)",
          borderWidth: 1,
          overflow: "hidden",
          width: "90%",
        }}
      >
        <STextInput
          placeholder="Street"
          onChangeText={(text) => setStreet(text)}
        />
        <STextInput
          placeholder="Apt, suite, etc. (Optional)"
          onChangeText={(text) => setApt(text)}
        />
        <STextInput placeholder="City" onChangeText={(text) => setCity(text)} />
        <STextInput
          placeholder="State (Optional)"
          onChangeText={(text) => setState(text)}
        />
        <STextInput
          placeholder="zip code(Optional)"
          onChangeText={(text) => setZipCode(text)}
        />
        <View>
          <Pressable style={{ padding: 10 }} onPress={() => onOpen("country")}>
            <Text style={{ fontSize: 18 }}>
              {selected?.name || "select country"}
            </Text>
          </Pressable>
        </View>
        <Picker
          id="country"
          data={filteredData}
          style={{ color: "red" }}
          inputValue={query}
          searchable
          label="Select Country"
          setSelected={(item) => {
            setCountry(item.code);
            setSelected(item);
          }}
          onSearch={onSearch}
        />
      </View>
      <View
        style={{
          marginTop: 5,
          marginHorizontal: 10,
          backgroundColor: "rgba(0,0,0,0.4)",
          width: width / 1.1,
          borderRadius: 10,
          overflow: "hidden",
          height: height / 2.2,
        }}
      >
        <MapView
          style={{
            flex: 1,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
          cacheEnabled
          initialRegion={{
            latitude: 11.316670026,
            longitude: 31.483329944,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: location[1],
            longitude: location[0],
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0221,
          }}
        />
      </View>
    </View>
  );
};

export default ManualAdressScreen;
