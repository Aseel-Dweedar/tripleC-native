import React from "react";
import { StyleSheet, View } from "react-native";
import Icons from "../components/Icons";

const SocialMedia = (props) => {
  return (
    <View style={styles.iconContainer}>
      <Icons
        name="facebook"
        iconBackground={{ backgroundColor: props.backgroundColor }}
        icon={{ color: props.color }}
      />
      <Icons name="phone" iconBackground={{ backgroundColor: props.backgroundColor }} icon={{ color: props.color }} />
      <Icons name="twitter" iconBackground={{ backgroundColor: props.backgroundColor }} icon={{ color: props.color }} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
  },
});

export default SocialMedia;
