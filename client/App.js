import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabNavigator from "./navigation/BottomTapNavigator";
import { AuthStackNavigator } from "./navigation/NativeStackNavigator";
import axios from "axios";
import Splash from "./screens/Splash";
import { getUser } from "./assets/getUser";
import { Alert } from "react-native";

const API_URL = process.env.API_URL;

export default function App() {

  const [isLoading, setIsLoading] = useState(false);
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

  const signInBtnEvent = (username, password) => {
    if (username && password) {
      setIsLoading(true);
      axios
        .post(`${API_URL}/user/login`, { username, password })
        .then(async (axiosResponse) => {
          if (axiosResponse.data.token) {
            try {
              await AsyncStorage.setItem("user", JSON.stringify(axiosResponse.data));
              setIsLoading(false);
              setUser(true);
              setRender(true);
            } catch (err) {
              Alert.alert(
                "Error",
                "An error happens!! please try again later!",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
              // alert("An error happens!! please try again later");
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
            Alert.alert(
              "⛔",
              axiosResponse.data,
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
            // alert(`⛔ ${axiosResponse.data}`);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          Alert.alert(
            "Error",
            "An error happens!! please try again later!",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
          // alert("An error happens!! please try again later");
        });
    } else {
      Alert.alert(
        "⚠️",
        "Please Enter Username & Password!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
      // alert("Please Enter Username & Password!");
    }
  };

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
    return <Splash />
  } else if (toRender && user) {
    return (<NavigationContainer>
      <BottomTabNavigator signOut={signOut} />
    </NavigationContainer>)
  } else {
    return (<NavigationContainer>
      <AuthStackNavigator signInBtnEvent={signInBtnEvent} isLoading={isLoading} />
    </NavigationContainer>)

  }

}
