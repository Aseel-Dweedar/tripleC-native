import React, { useState, useRef } from "react";
import { Image, StyleSheet, Text, View, Animated } from "react-native";
import logo from "../assets/img/finalLogo.png";
import colors from "../assets/colors/colors";

function Splash({ navigation }) {
  setTimeout(() => {
    navigation.navigate("SignIn");
  }, 1000);
  // const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  // React.useEffect(() => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 10000,
  //   }).start();
  // }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.img} />
      <Text style={styles.text}>TRIPLE-C</Text>
      <Text style={styles.secondText}>Car Caring Center</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  img: {
    resizeMode: "contain",
    width: "90%",
  },
  text: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 40,
    fontFamily: "sans-serif",
  },
  secondText: {
    color: "gray",
    fontSize: 22,
    fontFamily: "sans-serif",
  },
});

export default Splash;
