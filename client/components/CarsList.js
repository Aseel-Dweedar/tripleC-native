import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";

const CarsList = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>YOUR CARS</Text>
      <ScrollView style={{ width: "100%" }}>
        {props.carsList.length ? (
          props.carsList.map((car, index) => {
            return (
              <View key={index} style={styles.oneCar}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{car.type}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{car.model}</Text>
                </View>
                <TouchableOpacity style={{ width: "20%" }} onPress={() => props.deleteCar(car._id)}>
                  <MaterialIcons name="delete" size={22} color={colors.secondary} />
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text style={{ color: colors.lightGray, textAlign: "center" }}>YOUR CARS LIST IS EMPTY !!</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  mainText: {
    color: colors.lightGray,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  oneCar: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    marginBottom: 7,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
  },
  textContainer: {
    width: "40%",
  },
  text: {
    color: colors.lightGray,
  },
});

export default CarsList;
