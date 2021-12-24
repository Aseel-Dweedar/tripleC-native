import React from "react";
import { Image, StyleSheet, Platform, View, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Link, Route, useTheme } from "@react-navigation/native";
import { MainStackNavigator } from "./NativeStackNavigator";
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
const BottomTabBarItem = ({ children, style, onPress, to, accessibilityRole, ...rest }) => {
  console.log({ to });
  if (Platform.OS === "web" && to) {
    // React Native Web doesn't forward `onClick` if we use `TouchableWithoutFeedback`.
    // We need to use `onClick` to be able to prevent default browser handling of links.
    console.log("in web ");
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
    console.log("in else ");
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
  console.log(props);
  return <BottomTabBarItem {...props}></BottomTabBarItem>;
  // return <BottomTabBarButton {...props} />;
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarButton: CustomButton,
        // tabBarButton: (...props) => {
        //   console.log({ props });
        //   return <BottomTabBarButton {...props} />;
        // },
        tabBarIcon: () => {
          if (route.name === "Main") {
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
      tabBarOptions={{
        activeBackgroundColor: "#E6E6E6",
        inactiveBackgroundColor: "#E6E6E6",
      }}
    >
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="AddCar" component={AddCar} />
      <Tab.Screen name="AddService" component={AddService} />
      <Tab.Screen name="Details" component={Details} />
      <Tab.Screen name="Services" component={Services} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Contact" component={Contact} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { MainStackNavigator, ContactStackNavigator, ProfileStackNavigator } from "./NativeStackNavigator";
// import colors from "../assets/colors/colors";
// import { AntDesign } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";

// const Tab = createBottomTabNavigator();

// const BottomTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: () => {
//           if (route.name === "Back") {
//             return <AntDesign name="back" size={22} color={colors.secondary} />;
//           } else if (route.name === "Me") {
//             return <FontAwesome name="user" size={22} color={colors.secondary} />;
//           } else if (route.name === "About") {
//             return <AntDesign name="contacts" size={22} color={colors.secondary} />;
//           }
//         },

//         tabBarActiveTintColor: colors.primary,
//         tabBarInactiveTintColor: colors.primary,
//         headerShown: false,
//       })}
//       tabBarOptions={{
//         activeBackgroundColor: "#E6E6E6",
//         inactiveBackgroundColor: "#E6E6E6",
//       }}
//     >
//       <Tab.Screen name="Back" component={MainStackNavigator} />
//       <Tab.Screen name="Me" component={ProfileStackNavigator} />
//       <Tab.Screen name="About" component={ContactStackNavigator} />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabNavigator;
