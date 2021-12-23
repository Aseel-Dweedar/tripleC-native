import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator } from "./NativeStackNavigator";
import Profile from "../screens/Profile";
import Contact from "../screens/Contact";
import colors from "../assets/colors/colors";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
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
          }
        },

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.primary,
        headerShown: false,
      })}
      tabBarOptions={{
        activeBackgroundColor: "#E6E6E6",
        inactiveBackgroundColor: "#E6E6E6",
      }}
    >
      <Tab.Screen name="Back" component={MainStackNavigator} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Contact" component={Contact} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
