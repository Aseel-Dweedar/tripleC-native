import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../assets/colors/colors";

const CustomButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{ ...styles.appButtonContainer, ...props.btn }}>
      <Text style={{ ...styles.appButtonText, ...props.btnText }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 4,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  appButtonText: {
    fontSize: 15,
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

export default CustomButton;
