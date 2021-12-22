import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StartingStackNavigator } from "./navigation/NativeStackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <StartingStackNavigator />
    </NavigationContainer>
  );
}
