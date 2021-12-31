import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabNavigator from "./navigation/BottomTapNavigator";
import { AuthStackNavigator } from "./navigation/NativeStackNavigator";
import Splash from "./screens/Splash";
import { getUser } from "./assets/getUser";

export default function App() {
  const [toRender, setRender] = useState(false);
  const [user, setUser] = useState(false);

  setTimeout(() => {
    getUser()
      .then((user) => {
        if (user) setUser(true);
        setRender(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, 1000);

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(false);
      setRender(true);
    } catch (e) {
      console.log(e);
    }
  };

  if (!toRender && !user) {
    return <Splash />;
  } else if (toRender && user) {
    return (
      <NavigationContainer>
        <BottomTabNavigator signOut={signOut} />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <AuthStackNavigator setUser={(user) => setUser(user)} />
      </NavigationContainer>
    );
  }
}
