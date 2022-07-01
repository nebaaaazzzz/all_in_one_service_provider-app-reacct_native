import SpacekindScreen from "./SpacekindScreen";

import React, { useReducer } from "react";
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
export const PostJobContext = React.createContext();
const reducer = (state = {}, action) => {
  // console.log(state);
  switch (action.type) {
    case "add":
      return Object.assign(state, action.payload);
    default:
    // throw new Error();
  }
};
const PostHouseScreen = () => {
  const [housePost, dispatch] = useReducer(reducer);
  return (
    <PostJobContext.Provider value={{ housePost, dispatch }}>
      <PostHouseStackNavigator.Navigator screenOptions={{ headerShown: false }}>
        <PostHouseStackNavigator.Screen
          name="lesser/postjob/placedescription"
          component={PlaceDescriptionScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/postjob/spacekind"
          component={SpacekindScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/postjob/location"
          component={LocationScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/postjob/pinspot"
          component={PinSpotScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/postjob/guestsize"
          component={GuestSizeScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/postjob/placeoffer"
          component={PlaceOfferScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/postjob/propertytype"
          component={PropertyTypeScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/postjob/houseimages"
          component={HouseImagesScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/postjob/placename"
          component={PlaceNameScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/postjob/detailplacedescription"
          component={DetailPlaceDescriptionScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/postjob/describeplace"
          component={DescribePlaceScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/postjob/price"
          component={PriceScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/postjob/lastcheckout"
          component={LastCheckoutScreen}
        />
        <PostHouseStackNavigator.Screen
          name="lesser/postjob/reviewlisting"
          component={ReviewListingScreen}
        />
      </PostHouseStackNavigator.Navigator>
    </PostJobContext.Provider>
  );
};

export default PostHouseScreen;
DescribePlaceScreen;
