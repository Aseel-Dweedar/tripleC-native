import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../assets/colors/colors";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Profile from "../screens/Profile";
import Contact from "../screens/Contact";
import { MainStackNavigator } from "./NativeStackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === "Back") {
            return <AntDesign name="back" size={22} color={colors.secondary} />;
          } else if (route.name === "Profile") {
            return <FontAwesome name="user" size={22} color={colors.secondary} />;
          } else if (route.name === "Contact") {
            return <AntDesign name="contacts" size={22} color={colors.secondary} />;
          } else {
            return null;
          }
        },
        tabBarActiveBackgroundColor: "#E6E6E6",
        tabBarInactiveBackgroundColor: "#E6E6E6",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.primary,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Back" component={MainStackNavigator} initialParams={props} />
      <Tab.Screen name="Profile" component={Profile} initialParams={props} />
      <Tab.Screen name="Contact" component={Contact} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
