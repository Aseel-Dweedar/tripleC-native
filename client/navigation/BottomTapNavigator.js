import React from "react";
import { StyleSheet, Platform, View, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Link } from "@react-navigation/native";
import colors from "../assets/colors/colors";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Profile from "../screens/Profile";
import Contact from "../screens/Contact";
import Services from "../screens/Services";
import AddService from "../screens/AddService";
import AddCar from "../screens/AddCar";
import Details from "../screens/Details";
import Main from "../screens/Main";

const Tab = createBottomTabNavigator();
const HiddenView = () => <View style={{ display: "none" }} />;

const BottomTabBarItem = ({ children, style, onPress, to, accessibilityRole, ...rest }) => {
  if (Platform.OS === "web" && to) {
    // React Native Web doesn't forward `onClick` if we use `TouchableWithoutFeedback`.
    // We need to use `onClick` to be able to prevent default browser handling of links.
    return (
      <Link
        {...rest}
        to={to}
        style={[styles.button, style]}
        onPress={(e) => {
          if (
            !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && // ignore clicks with modifier keys
            (e.button == null || e.button === 0) // ignore everything but left clicks
          ) {
            e.preventDefault();
            onPress?.(e);
          }
        }}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <Pressable {...rest} accessibilityRole={accessibilityRole} onPress={onPress} style={style}>
        {children}
      </Pressable>
    );
  }
};

const CustomButton = (props) => {
  if (props.to.includes("AddCar")) return <HiddenView />;
  if (props.to.includes("AddService")) return <HiddenView />;
  if (props.to.includes("Details")) return <HiddenView />;
  if (props.to.includes("Services")) return <HiddenView />;
  return <BottomTabBarItem {...props}></BottomTabBarItem>;
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarButton: CustomButton,
        tabBarIcon: () => {
          if (route.name === "Home") {
            return <AntDesign name="home" size={22} color={colors.secondary} />;
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
      tabBarOptions={{
        activeBackgroundColor: "#E6E6E6",
        inactiveBackgroundColor: "#E6E6E6",
      }}
    >
      <Tab.Screen name="Home" component={Main} />
      <Tab.Screen name="AddCar" component={AddCar} />
      <Tab.Screen name="AddService" component={AddService} />
      <Tab.Screen name="Details" component={Details} />
      <Tab.Screen name="Services" component={Services} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Contact" component={Contact} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
  },
  tabPortrait: {
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  tabLandscape: {
    justifyContent: "center",
    flexDirection: "row",
  },
  label: {
    textAlign: "center",
    backgroundColor: "transparent",
  },
  labelBeneath: {
    fontSize: 10,
  },
  labelBeside: {
    fontSize: 13,
    marginLeft: 20,
    marginTop: 3,
  },
  button: {
    display: "flex",
  },
});

export default BottomTabNavigator;
