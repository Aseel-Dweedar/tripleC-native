import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import logo from "../assets/img/finalLogo.png";
import colors from "../assets/colors/colors";
import { getUser } from "../assets/getUser";
import BottomTabNavigator from "../navigation/BottomTapNavigator";

function Splash({ navigation }) {
  const [user, setUser] = useState(null);

  setTimeout(() => {
    getUser()
      .then((user) => {
        setUser(() => user);
        if (!user) {
          navigation.navigate("SignIn");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, 1000);

  if (user) {
    return <BottomTabNavigator />;
  } else {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.img} />
        <Text style={styles.text}>TRIPLE-C</Text>
        <Text style={styles.secondText}>Car Caring Center</Text>
      </View>
    );
  }
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
