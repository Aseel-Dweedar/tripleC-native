import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Icons = (props) => {
  return (
    <TouchableOpacity style={{ ...styles.iconBackground, ...props.iconBackground }}>
      <FontAwesome style={{ ...styles.icon, ...props.icon }} name={props.name} size={25} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconBackground: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    borderRadius: 50,
    padding: 13,
  },
});

export default Icons;
