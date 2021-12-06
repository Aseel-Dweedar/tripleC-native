import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import MainCard from "../components/MainCard";
import cartoon from "../assets/img/cartoon.png";
import colors from "../assets/colors/colors";
import ser1 from "../assets/service-icons/ser1.png";
import ser2 from "../assets/service-icons/ser2.png";
import ser3 from "../assets/service-icons/ser3.png";
import ser4 from "../assets/service-icons/ser4.png";
import ser5 from "../assets/service-icons/ser5.png";
import ser6 from "../assets/service-icons/ser6.png";
import ServiceBackground from "../assets/backgrounds/serviceBackground.jpg";

const Services = ({ navigation, route }) => {
  const goToAddService = (serviceName) => {
    navigation.navigate("AddService", { serviceName: serviceName });
  };

  return (
    <ImageBackground source={ServiceBackground} resizeMode="stretch" style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Your Personal Car Mechanic At Your Doorstep</Text>
        </View>
        <Image source={cartoon} style={styles.icon} />
      </View>
      <View style={styles.cardsContainer}>
        <View style={styles.twoCardsContainer}>
          <MainCard onPress={() => goToAddService("Battery Replacement")}>
            <Image source={ser1} style={styles.img} />
          </MainCard>
          <MainCard onPress={() => goToAddService("Car Wash")}>
            <Image source={ser2} style={styles.img} />
          </MainCard>
        </View>
        <View style={styles.twoCardsContainer}>
          <MainCard onPress={() => goToAddService("Oil Changing")}>
            <Image source={ser3} style={styles.img} />
          </MainCard>
          <MainCard onPress={() => goToAddService("Engine Fixing")}>
            <Image source={ser4} style={styles.img} />
          </MainCard>
        </View>
        <View style={styles.twoCardsContainer}>
          <MainCard onPress={() => goToAddService("Fuel Supply")}>
            <Image source={ser5} style={styles.img} />
          </MainCard>
          <MainCard onPress={() => goToAddService("Tier Fixing")}>
            <Image source={ser6} style={styles.img} />
          </MainCard>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
  },
  icon: {
    marginTop: 30,
    flex: 1,
    resizeMode: "contain",
    height: undefined,
    width: undefined,
  },
  textContainer: {
    flex: 1,
    marginTop: 30,
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.secondary,
    fontSize: 20,
    fontFamily: "sans-serif",
  },
  cardsContainer: {
    flex: 3,
    width: "100%",
  },
  twoCardsContainer: {
    flexDirection: "row",
    flex: 2,
  },
  img: {
    flex: 1,
    resizeMode: "contain",
    height: "100%",
    width: "100%",
  },
});

export default Services;
