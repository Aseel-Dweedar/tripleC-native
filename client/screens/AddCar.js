import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../assets/colors/colors";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import CarsList from "../components/CarsList";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import { getUser } from "../assets/getUser";

const API_URL = process.env.API_URL;

const AddCar = ({ navigation }) => {
  const [gasoline, setGasoline] = useState("");
  const [carType, setCarType] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carsList, setCarsList] = useState(null);
  const [carsListErr, setCarsListErr] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser()
      .then((user) => {
        setUser(() => user);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (user) {
      getCars();
    }
  }, [user]);

  const getCars = () => {
    axios
      .get(`${API_URL}/car`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((axiosRes) => {
        setCarsList(() => axiosRes.data);
      })
      .catch((err) => {
        setCarsListErr(() => err);
        alert("An error happens!! please try again later");
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
          authorization: `Bearer ${user.token}`,
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
    if (gasoline && carType && carModel) {
      let reqBody = {
        type: carType,
        gasoline: gasoline,
        model: carModel,
      };
      axios
        .post(`${API_URL}/car`, reqBody, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        })
        .then((axiosRes) => {
          setGasoline("");
          setCarType("");
          setCarModel("");
          getCars();
        })
        .catch((err) => {
          alert("An error happens!! please try again later");
        });
    } else {
      alert("Please Fill All Fields!");
    }
  };

  const goToRequest = () => {
    navigation.navigate("Services");
  };

  return (
    <View style={styles.container}>
      <View style={styles.carsContainer}>
        <CarsList deleteCar={deleteCar} carsList={carsList} carsListErr={carsListErr} />
      </View>
      <View style={styles.addCarContainer}>
        <View style={styles.inputContainer}>
          <InputField placeholder="Car Type" name="car" onChangeText={onChangCarType} value={carType} />
          <InputField placeholder="Car Model" name="car" onChangeText={onChangeCarModel} value={carModel} />
          <View>
            <Text style={{ margin: 10, fontWeight: "bold" }}>Choose gasoline type :</Text>
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
        </View>
        <View style={styles.btnContainer}>
          <CustomButton title="Submit" btn={styles.btn} btnText={styles.btnText} onPress={onSubmitAddCar} />
          <CustomButton
            title="Request"
            btn={{ ...styles.btn, backgroundColor: colors.lightGray }}
            btnText={styles.btnText}
            onPress={goToRequest}
          />
        </View>
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
  addCarContainer: {
    backgroundColor: colors.lightGray,
    width: "80%",
    flex: 2,
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  inputContainer: {
    width: "100%",
  },
  btnContainer: {
    width: "100%",
  },
  btn: {
    backgroundColor: colors.secondary,
    margin: 10,
  },
  btnText: {
    color: colors.primary,
  },
});

export default AddCar;
