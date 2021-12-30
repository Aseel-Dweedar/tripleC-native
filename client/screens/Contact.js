import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import colors from "../assets/colors/colors";
import logo from "../assets/img/finalLogo.png";
import SocialMedia from "../components/SocialMedia";
import ContactIcons from "../components/ContactIcons";

const Contact = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.img} />
        <Text style={styles.logoText} >Triple-C</Text>
      </View>
      <View style={styles.contactContainer}>
        <Text style={styles.needHelp} >Need Help ?</Text>
        <Text style={styles.contactUs} >Its Our Pleasure To Help.. </Text>
        <ContactIcons name="phone" />
        <SocialMedia backgroundColor={colors.lightGray} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    paddingTop: 40,
    backgroundColor: colors.lightGray,
  },
  logoContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    resizeMode: "contain",
    height: "50%",
    width: "50%",
  },
  logoText: {
    marginTop: 10,
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold"
  },
  contactContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.primary,
    padding: 20,
    flex: 2,
  },
  needHelp: {
    color: colors.lightGray,
    fontSize: 20,
    fontWeight: "bold"
  },
  contactUs: {
    color: colors.lightGray,
    fontSize: 15,
    fontWeight: "bold"
  }
});


export default Contact;
