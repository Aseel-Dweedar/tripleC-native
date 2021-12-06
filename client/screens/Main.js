import React from "react";
import { StyleSheet, ImageBackground, Text, View, Image } from "react-native";
import MainCard from "../components/MainCard";
import backgroundImg from "../assets/backgrounds/background2.jpg";
import user from "../assets/img/user.png";
import carService from "../assets/img/carsevices.png";
import call from "../assets/img/call.png";
import colors from "../assets/colors/colors";

export default function Main({ navigation }) {
  const goToPage = (pageName) => {
    navigation.navigate(pageName);
  };

  return (
    <ImageBackground source={backgroundImg} resizeMode="stretch" style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>TRIPLE-C</Text>
      </View>
      <View style={styles.cardsContainer}>
        <MainCard onPress={() => goToPage("Services")}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Our Services</Text>
            <Text>expand all</Text>
          </View>
          <Image source={carService} style={styles.img} />
        </MainCard>
        <MainCard onPress={() => goToPage("Profile")}>
          <Image source={user} style={styles.img} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Profile</Text>
            <Text>review</Text>
          </View>
        </MainCard>
        <MainCard onPress={() => goToPage("Contact")}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Contact Us</Text>
            <Text>stay close</Text>
          </View>
          <Image source={call} style={styles.img} />
        </MainCard>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextContainer: {
    flex: 1,
  },
  headerText: {
    marginTop: 50,
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "sans-serif",
  },
  cardsContainer: {
    flex: 3,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    flex: 1,
    resizeMode: "contain",
    height: undefined,
    width: undefined,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 22,
    fontFamily: "sans-serif",
  },
});
