import SpacekindScreen from "./SpacekindScreen";

import React, { useEffect, useReducer } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PlaceDescriptionScreen from "./PlaceDescriptionScreen";
import LocationScreen from "./LocationScreen";
import PinSpotScreen from "./PinSpotScreen";
import GuestSizeScreen from "./GuestSizeScreen";
import PlaceOfferScreen from "./PlaceOfferScreen";
import HouseImagesScreen from "./HouseImagesScreen";
import PlaceNameScreen from "./PlaceNameScreen";
import DescribePlaceScreen from "./DescribePlaceScreen";
import PriceScreen from "./PriceScreen";
import DetailPlaceDescriptionScreen from "./DetailPlaceDescriptionScreen";
import PropertyTypeScreen from "./PropertyTypeScreen";
import LastCheckoutScreen from "./LastCheckoutScreen";
import ReviewListingScreen from "./ReviewListingScreen";
const PostHouseStackNavigator = createStackNavigator();
export const PostHouseContext = React.createContext();
const reducer = (state = {}, action) => {
  switch (action.type) {
    case "add":
      return Object.assign(state, action.payload);
    default:
    // throw new Error();
  }
};
const PostHouseScreen = () => {
  const [housePost, dispatch] = useReducer(reducer);
  useEffect(() => {
    dispatch({
      type: "add",
    });
  });
  return (
    <PostHouseContext.Provider value={{ housePost, dispatch }}>
      <PostHouseStackNavigator.Navigator screenOptions={{ headerShown: false }}>
        <PostHouseStackNavigator.Screen
          name="lesser/posthouse/placedescription"
          component={PlaceDescriptionScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/posthouse/spacekind"
          component={SpacekindScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/posthouse/location"
          component={LocationScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/posthouse/pinspot"
          component={PinSpotScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/posthouse/guestsize"
          component={GuestSizeScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/posthouse/placeoffer"
          component={PlaceOfferScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/posthouse/propertytype"
          component={PropertyTypeScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/posthouse/houseimages"
          component={HouseImagesScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/posthouse/placename"
          component={PlaceNameScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/posthouse/detailplacedescription"
          component={DetailPlaceDescriptionScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/posthouse/describeplace"
          component={DescribePlaceScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/posthouse/price"
          component={PriceScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/posthouse/lastcheckout"
          component={LastCheckoutScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/posthouse/reviewlisting"
          component={ReviewListingScreen}
        />
      </PostHouseStackNavigator.Navigator>
    </PostHouseContext.Provider>
  );
};

export default PostHouseScreen;
DescribePlaceScreen;
