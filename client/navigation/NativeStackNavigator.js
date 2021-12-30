import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Profile from "../screens/Profile";
import Contact from "../screens/Contact";
import Services from "../screens/Services";
import AddService from "../screens/AddService";
import AddCar from "../screens/AddCar";
import Details from "../screens/Details";
import Main from "../screens/Main";

const Stack = createNativeStackNavigator();

const AuthStackNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} initialParams={props} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};


const MainStackNavigator = ({ route }) => {

  const signOut = route.params.signOut;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Main} />
      <Stack.Screen name="AddCar" component={AddCar} />
      <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="Profile" component={Profile} initialParams={{ signOut }} />
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator, AuthStackNavigator };