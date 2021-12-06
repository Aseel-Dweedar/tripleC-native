import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
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
      <View>
        {props.carsList.length ? (
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
                  value={car}
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
          <Text style={{ color: colors.primary }}>lOADING</Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  carsContainer: {
    width: "90%",
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
