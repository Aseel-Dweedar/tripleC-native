import React from "react";
import colors from "../assets/colors/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AuthScreens from "../components/AuthScreens";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const SignUp = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const onChangeUsername = (value) => {
    setUsername(value.replace(/[^a-z||^1-9||_]/g, ""));
  };
  const onChangeFirstName = (value) => {
    setFirstName(value);
  };
  const onChangeLastName = (value) => {
    setLastName(value);
  };
  const onChangePassword = (value) => {
    setPassword(value);
  };
  const onChangePhone = (value) => {
    setPhone(value);
  };

  const signUpBtnEvent = () => {
    //  axios.post("")
    navigation.navigate("Main");
  };
  const moveToSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <AuthScreens>
      <View style={styles.container}>
        <View style={styles.InputContainer}>
          <InputField placeholder="User name" name="user-o" onChangeText={onChangeUsername} value={username} />
          <InputField placeholder="First Name" name="user-o" onChangeText={onChangeFirstName} value={firstName} />
          <InputField placeholder="Last Name" name="user-o" onChangeText={onChangeLastName} value={lastName} />
          <InputField placeholder="Password" name="lock" onChangeText={onChangePassword} value={password} />
          <InputField placeholder="Phone" name="phone" onChangeText={onChangePhone} value={phone} />
        </View>
        <CustomButton title="Sign-in" btn={styles.btn} btnText={styles.btnText} onPress={signUpBtnEvent} />
        <View style={styles.textContainer}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={moveToSignIn}>
            <Text style={styles.signUp}>Sign-In!</Text>
          </TouchableOpacity>
        </View>
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
  iconContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});

export default SignUp;
