import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Services from "./screens/Services";
import Profile from "./screens/Profile";
import Contact from "./screens/Contact";
import Main from "./screens/Main";
import Splash from "./screens/Splash";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import AddService from "./screens/AddService";
import AddCar from "./screens/AddCar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="AddCar" component={AddCar} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="AddService" component={AddService} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
