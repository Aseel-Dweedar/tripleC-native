import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../assets/colors/colors";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import CarsList from "../components/CarsList";
import carsJSON from "../assets/carsList.json";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";

const AddCar = ({ navigation }) => {
  const deleteCar = (carId) => {
    // axios.delete("")
    console.log(carId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.carsContainer}>
        <CarsList deleteCar={deleteCar} carsJSON={carsJSON} />
      </View>
      <View style={styles.formContainer}>
        <InputField placeholder="User name" name="user-o" value="dddddd" />
        <InputField placeholder="Password" name="lock" value="dddddd" />
        <View>
          <RadioButtonGroup
            containerStyle={{ marginBottom: 10 }}
            // selected={props.currentCar}
            // onSelected={props.setCurrentCar}
            radioBackground={colors.secondary}
          >
            <RadioButtonItem style={{ marginBottom: 5 }} value="{car}" label="test"></RadioButtonItem>
            <RadioButtonItem style={{ marginBottom: 5 }} value="{car}" label="test"></RadioButtonItem>
            <RadioButtonItem style={{ marginBottom: 5 }} value="{car}" label="test"></RadioButtonItem>
          </RadioButtonGroup>
        </View>
        <CustomButton title="Submit" btn={styles.btn} btnText={styles.btnText} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  carsContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  formContainer: {
    backgroundColor: colors.lightGray,
    width: "80%",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: colors.secondary,
    width: "50%",
    marginVertical: 40,
  },
  btnText: {
    color: colors.primary,
  },
});

export default AddCar;
