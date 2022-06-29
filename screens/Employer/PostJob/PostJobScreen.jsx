import React, { createContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HeadlineScreen from "./HeadlineScreen";
import CategoryScreen from "./CategoryScreen";
import SkillsRequiredScreen from "./SkillsRequiredScreen";
import ScopeScreen from "./ScopeScreen";
import PaymentScreen from "./PaymentScreen";
import ReviewScreen from "./ReviewScreen";
const PostJobStackNavigation = createStackNavigator();
const PostJobScreen = () => {
  return (
    <PostJobStackNavigation.Navigator>
      <PostJobStackNavigation.Screen
        name="employer/postjob/"
        options={{ headerShown: false }}
        component={HeadlineScreen}
      />
      <PostJobStackNavigation.Screen
        name="employer/postjob/category"
        options={{ title: "Category" }}
        component={CategoryScreen}
      />
      <PostJobStackNavigation.Screen
        options={{ title: "Skills" }}
        name="employer/postjob/skills"
        component={SkillsRequiredScreen}
      />
      <PostJobStackNavigation.Screen
        options={{ title: "Scope" }}
        name="employer/postjob/scope"
        component={ScopeScreen}
      />
      <PostJobStackNavigation.Screen
        options={{ title: "Payment" }}
        name="employer/postjob/payment"
        component={PaymentScreen}
      />
      <PostJobStackNavigation.Screen
        options={{ title: "Review" }}
        name="employer/postjob/review"
        component={ReviewScreen}
      />
    </PostJobStackNavigation.Navigator>
  );
};

export default PostJobScreen;
