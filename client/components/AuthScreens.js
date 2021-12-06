import React from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import backgroundImg from "../assets/backgrounds/backgroundmain.png";
import colors from "../assets/colors/colors";

const AuthScreens = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.image}>
        <Text style={styles.welcome}>WELCOME !</Text>
      </ImageBackground>
      <View style={styles.mainBody}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3.5,
    backgroundColor: colors.primary,
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  mainBody: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.lightGray,
    width: "100%",
    flex: 2.5,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    color: "white",
    fontSize: 30,
  },
});

export default AuthScreens;
