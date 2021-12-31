import React, { useState } from "react";
import colors from "../assets/colors/colors";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import AuthScreens from "../components/AuthScreens";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import SocialMedia from "../components/SocialMedia";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = process.env.API_URL;

const SignIn = ({ navigation, route }) => {
  const { setUser } = route.params;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  const onChangeUsername = (value) => {
    setUsername(value.replace(/[^a-z||^1-9||_]/g, ""));
  };
  const onChangePassword = (value) => {
    setPassword(value);
  };

  const moveToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const signInBtnEvent = () => {
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
            } catch (err) {
              Alert.alert("Error", "An error happens!! please try again later!", [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]);
              // alert("An error happens!! please try again later");
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
            Alert.alert("⛔", axiosResponse.data, [{ text: "OK", onPress: () => console.log("OK Pressed") }]);
            // alert(`⛔ ${axiosResponse.data}`);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          Alert.alert("Error", "An error happens!! please try again later!", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
          // alert("An error happens!! please try again later");
        });
    } else {
      Alert.alert("⚠️", "Please Enter Username & Password!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      // alert("Please Enter Username & Password!");
    }
  };

  let inputDiv;
  if (isLoading) {
    inputDiv = (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={colors.secondary} size="large" />
      </View>
    );
  } else {
    inputDiv = (
      <View style={styles.InputContainer}>
        <InputField placeholder="User name" name="user" onChangeText={onChangeUsername} value={username} />
        <InputField placeholder="Password" name="lock" onChangeText={onChangePassword} value={password} />
      </View>
    );
  }

  return (
    <AuthScreens>
      <View style={styles.container}>
        {inputDiv}
        <CustomButton title="Sign-in" btn={styles.btn} btnText={styles.btnText} onPress={signInBtnEvent} />
        <View style={styles.textContainer}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={moveToSignUp}>
            <Text style={styles.signUp}>Sign-Up!</Text>
          </TouchableOpacity>
        </View>
        <SocialMedia backgroundColor={colors.primary} color={colors.lightGray} />
      </View>
    </AuthScreens>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  InputContainer: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    backgroundColor: colors.secondary,
    width: "50%",
    marginVertical: 40,
  },
  btnText: {
    color: colors.primary,
  },
  textContainer: {
    flexDirection: "row",
  },
  signUp: {
    color: colors.primary,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
});

export default SignIn;
