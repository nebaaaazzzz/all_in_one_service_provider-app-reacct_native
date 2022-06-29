import SpacekindScreen from "./SpacekindScreen";

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PlaceDescriptionScreen from "./PlaceDescriptionScreen";
const PostHouseStackNavigator = createStackNavigator();
const PostHouseScreen = () => {
  return (
    <PostHouseStackNavigator.Navigator>
      <PostHouseStackNavigator.Screen
        name="lesser/postjob/placedescription"
        component={PlaceDescriptionScreen}
        options={{ headerShown: false }}
      />
      <PostHouseStackNavigator.Screen
        name="lesser/postjob/spacekind"
        component={SpacekindScreen}
        options={{ headerShown: false }}
      />
    </PostHouseStackNavigator.Navigator>
  );
};

export default PostHouseScreen;
