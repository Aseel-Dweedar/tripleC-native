import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../assets/colors/colors";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import CarsList from "../components/CarsList";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = process.env.API_URL;

const AddCar = ({ navigation }) => {
  const [gasoline, setGasoline] = useState("");
  const [carType, setCarType] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carsList, setCarsList] = useState([]);

  useEffect(() => {
    getCars();
  }, []);

  const getCars = () => {
    axios
      .get(`${API_URL}/car`, {
        headers: {
          authorization: `Bearer ${cookies.get("user").token}`,
        },
      })
      .then((axiosRes) => {
        setCarsList(axiosRes.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangCarType = (value) => {
    setCarType(value);
  };

  const onChangeCarModel = (value) => {
    setCarModel(value);
  };

  const deleteCar = (carId) => {
    axios
      .delete(`${API_URL}/car/${carId}`, {
        headers: {
          authorization: `Bearer ${cookies.get("user").token}`,
        },
      })
      .then((axiosRes) => {
        setCarsList(axiosRes.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmitAddCar = () => {
    let reqBody = {
      type: carType,
      gasoline: gasoline,
      model: carModel,
    };
    axios
      .post(`${API_URL}/car`, reqBody, {
        headers: {
          authorization: `Bearer ${cookies.get("user").token}`,
        },
      })
      .then((axiosRes) => {
        setGasoline("");
        setCarType("");
        setCarModel("");
        getCars();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.carsContainer}>
        <CarsList deleteCar={deleteCar} carsList={carsList} />
      </View>
      <View style={styles.formContainer}>
        <InputField placeholder="Car Type" name="car" onChangeText={onChangCarType} value={carType} />
        <InputField placeholder="Car Model" name="car" onChangeText={onChangeCarModel} value={carModel} />
        <View>
          <RadioButtonGroup
            containerStyle={{ marginBottom: 10 }}
            selected={gasoline}
            onSelected={setGasoline}
            radioBackground={colors.secondary}
          >
            <RadioButtonItem style={{ marginBottom: 5 }} value="Octan-90" label="Octan-90"></RadioButtonItem>
            <RadioButtonItem style={{ marginBottom: 5 }} value="Octan-95" label="Octan-95"></RadioButtonItem>
            <RadioButtonItem style={{ marginBottom: 5 }} value="Diesel" label="Diesel"></RadioButtonItem>
          </RadioButtonGroup>
        </View>
        <CustomButton title="Submit" btn={styles.btn} btnText={styles.btnText} onPress={onSubmitAddCar} />
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
