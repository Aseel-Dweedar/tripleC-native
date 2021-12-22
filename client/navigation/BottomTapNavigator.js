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
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Back") {
            return <AntDesign name="back" size={22} color={colors.secondary} />;
          } else if (route.name === "Profile") {
            return <FontAwesome name="user" size={22} color={colors.secondary} />;
          } else if (route.name === "Contact") {
            return <AntDesign name="contacts" size={22} color={colors.secondary} />;
          }
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Back" component={MainStackNavigator} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Contact" component={Contact} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
