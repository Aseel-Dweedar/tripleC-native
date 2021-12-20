import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import colors from "../assets/colors/colors";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

const SelectCarRequest = (props) => {
  return (
    <View style={styles.carsContainer}>
      <View style={styles.textView}>
        <Text style={styles.textLightGray}>Select Car :</Text>
        <TouchableOpacity style={styles.addCar} onPress={props.moveToAddCar}>
          <Text style={{ color: colors.secondary }}>+ Add Car</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {props.carsList && props.carsList.length ? (
          <RadioButtonGroup
            containerStyle={{ marginBottom: 10 }}
            selected={props.currentCar}
            onSelected={props.setCurrentCar}
            radioBackground={colors.secondary}
          >
            {props.carsList.map((car, idx) => {
              return (
                <RadioButtonItem
                  style={{ marginBottom: 5 }}
                  value={car._id}
                  label={
                    <Text style={{ color: colors.lightGray }}>
                      {car.type} - {car.year}
                    </Text>
                  }
                  key={idx}
                >
                  {car.type}
                </RadioButtonItem>
              );
            })}
          </RadioButtonGroup>
        ) : (
          <Text style={{ color: colors.lightGray }}>List Empty, Please add a car</Text>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  carsContainer: {
    width: "90%",
    flex: 1,
  },
  textLightGray: {
    color: colors.lightGray,
    fontSize: 15,
    marginBottom: 5,
  },
  textView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addCar: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
  },
});

export default SelectCarRequest;
