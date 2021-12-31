import React from "react";
import colors from "../assets/colors/colors";
import { StyleSheet, View, Text } from "react-native";
import Icons from "../components/Icons";

const ContactIcons = (props) => {
  return (
    <View style={styles.iconContainer}>
      <Icons name={props.name} iconBackground={{ backgroundColor: colors.secondary }} icon={{ color: "black" }} />
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    marginLeft: 10,
    color: colors.lightGray,
    fontSize: 20,
  },
});

export default ContactIcons;
