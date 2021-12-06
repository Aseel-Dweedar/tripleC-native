import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../assets/colors/colors";

const MainCard = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View style={styles.card}>{props.children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 2,
    borderRadius: 10,
    width: "100%",
    marginBottom: 15,
    marginHorizontal: 10,
    backgroundColor: colors.lightGray,
    elevation: 10,
  },
  card: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 10,
  },
});

export default MainCard;
