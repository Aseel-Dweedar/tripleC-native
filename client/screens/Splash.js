import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import logo from "../assets/img/finalLogo.png";
import colors from "../assets/colors/colors";

function Splash() {

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
