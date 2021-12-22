import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Services from "../screens/Services";
import Profile from "../screens/Profile";
import Contact from "../screens/Contact";
import Main from "../screens/Main";
import Splash from "../screens/Splash";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import AddService from "../screens/AddService";
import AddCar from "../screens/AddCar";
import Details from "../screens/Details";

const Stack = createNativeStackNavigator();

const StartingStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="AddCar" component={AddCar} />
      <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator, StartingStackNavigator };
