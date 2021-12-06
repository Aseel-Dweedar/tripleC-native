import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Cookies from "universal-cookie";
import colors from "../assets/colors/colors";
import carsJSON from "../assets/carsList.json";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import SelectCarRequest from "../components/SelectCarRequest";
import AddLocation from "../components/AddLocation";

const cookies = new Cookies();
// console.log(cookies.get("user"));

const AddService = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [carsList, setCarsList] = useState([]);
  const [currentCar, setCurrentCar] = useState(null);

  const getCarsList = () => {
    // axios.get("").then((data) => {
    //   setCarsList(() => data.data);
    // });
    return new Promise((res) => setTimeout(() => res(carsJSON), 0));
  };

  useEffect(async () => {
    let cars = await getCarsList();
    setCarsList(() => cars);
  }, []);

  const onSubmitRequest = () => {
    navigation.navigate("Main");
  };

  const moveToAddCar = () => {
    navigation.navigate("AddCar");
  };

  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <InputField placeholder={route.params.serviceName} name="user" />
        <InputField placeholder="Description" name="newspaper-o" />
        <InputField placeholder="Phone" name="phone" />
      </View>
      <AddLocation location={location} setLocation={setLocation} />
      <SelectCarRequest
        carsList={carsList}
        setCurrentCar={(value) => setCurrentCar(value)}
        currentCar={currentCar}
        moveToAddCar={moveToAddCar}
      />
      <CustomButton title="Submit" btn={styles.btn} btnText={styles.btnText} onPress={onSubmitRequest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  InputContainer: {
    marginTop: 30,
    alignItems: "center",
    width: "90%",
    justifyContent: "space-between",
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

export default AddService;
