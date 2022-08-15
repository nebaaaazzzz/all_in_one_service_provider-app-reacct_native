import React, { createContext, useReducer, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HeadlineScreen from "./HeadlineScreen";
import CategoryScreen from "./CategoryScreen";
import SkillsRequiredScreen from "./SkillsRequiredScreen";
import ScopeScreen from "./ScopeScreen";
import PaymentScreen from "./PaymentScreen";
import ReviewScreen from "./ReviewScreen";
import LocationScreen from "./LocationScreen";
import PinSpotScreen from "./PinSpotScreen";
import {useTranslation} from "react-i18next";
const PostJobStackNavigation = createStackNavigator();
export const PostJobContext = createContext();
const reducer = (state = {}, action) => {
  switch (action.type) {
    case "add":
      return Object.assign(state, action.payload);
    default:
    // throw new Error();
  }
};
const PostJobScreen = () => {
  const {t}=useTranslation();
  const [jobPost, dispatch] = useReducer(reducer);
  return (
    <PostJobContext.Provider value={{ jobPost, dispatch }}>
      <PostJobStackNavigation.Navigator screenOptions={{ headerShown: false }}>
        <PostJobStackNavigation.Screen
          name="employer/postjob/"
          options={{ headerShown: false }}
          component={HeadlineScreen}
        />
        <PostJobStackNavigation.Screen
          name="employer/postjob/category"
          options={{ title: t("cat") }}
          component={CategoryScreen}
        />
        <PostJobStackNavigation.Screen
          options={{ title: t("skill") }}
          name="employer/postjob/skills"
          component={SkillsRequiredScreen}
        />
        <PostJobStackNavigation.Screen
          options={{ title: t("scop") }}
          name="employer/postjob/scope"
          component={ScopeScreen}
        />
        <PostJobStackNavigation.Screen
          options={{ title: t("scop")}}
          name="employer/postjob/location"
          component={LocationScreen}
        />
        <PostJobStackNavigation.Screen
          options={{ title: t("scop") }}
          name="employer/postjob/pinspot"
          component={PinSpotScreen}
        />
        <PostJobStackNavigation.Screen
          options={{ title: t("pa") }}
          name="employer/postjob/payment"
          component={PaymentScreen}
        />
        <PostJobStackNavigation.Screen
          options={{ title: t("rev") }}
          name="employer/postjob/review"
          component={ReviewScreen}
        />
      </PostJobStackNavigation.Navigator>
    </PostJobContext.Provider>
  );
};

export default PostJobScreen;
