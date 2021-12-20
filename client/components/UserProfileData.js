import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../assets/colors/colors";
import userImg from "../assets/img/user.png";

const UserProfileData = (props) => {
  return (
    <View style={styles.container}>
      <Image source={userImg} style={styles.img} />
      <View style={styles.textContainer}>
        <Text style={styles.fullName}>{`${props.user.firstName} ${props.user.lastName}`}</Text>
        <Text style={styles.text}>{props.user.username}</Text>
        <Text style={styles.text}>{props.user.phone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 4,
    paddingBottom: 30,
  },
  img: {
    flex: 1.5,
    resizeMode: "contain",
    height: "100%",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  textContainer: {
    flex: 2.5,
    marginLeft: 20,
  },
  fullName: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.primary,
    marginBottom: 4,
  },
  text: {
    color: colors.primary,
    marginBottom: 10,
  },
});

export default UserProfileData;
