import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import backgroundImg from "../assets/backgrounds/Contact_us.jpg";

const Contact = () => {
  return <ImageBackground source={backgroundImg} resizeMode="stretch" style={styles.image}></ImageBackground>;
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default Contact;
