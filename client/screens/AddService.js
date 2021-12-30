import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Alert } from "react-native";
import colors from "../assets/colors/colors";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import SelectCarRequest from "../components/SelectCarRequest";
import AddLocation from "../components/AddLocation";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { getUser } from "../assets/getUser";

const API_URL = process.env.API_URL;

const AddService = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [currentCar, setCurrentCar] = useState(null);
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [textLocation, setTextLocation] = useState("");
  const [carsList, setCarsList] = useState(null);
  const [carsListErr, setCarsListErr] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        setCarsListErr(() => err.message);
        console.error(err);
      });
  };

  const onChangeDescription = (value) => {
    setDescription(value);
  };

  const onChangePhone = (value) => {
    setPhone(value);
  };

  const onChangeTextLocation = (value) => {
    setTextLocation(value);
  };

  const moveToAddCar = () => {
    navigation.navigate("AddCar");
  };

  const onSubmitRequest = () => {
    if (description && phone && currentCar && (location || textLocation)) {
      setIsLoading(true);
      let reqBody = {
        name: route.params.serviceName,
        phone: phone,
        description: description,
        car: currentCar,
        location: location || { textLocation },
      };
      axios
        .post(`${API_URL}/request`, reqBody, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        })
        .then((axiosRes) => {
          setIsLoading(false);
          navigation.navigate("Details", { requestDetail: axiosRes.data });
        })
        .catch((err) => {
          setIsLoading(false);
          Alert.alert(
            "Error",
            "An error happens!! please try again later!",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
          // alert("An error happens!! please try again later");
        });
    } else {
      Alert.alert(
        "⛔",
        "Please Fill All Fields!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
      // alert("Please Fill All Fields!");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={colors.secondary} size="large" />
      </View>
    );
  }

  let renderCarList = null;
  if (carsList && !carsListErr) {
    renderCarList = (
      <SelectCarRequest
        carsList={carsList}
        setCurrentCar={(value) => setCurrentCar(value)}
        currentCar={currentCar}
        moveToAddCar={moveToAddCar}
      />
    );
  } else if (!carsList && carsListErr) {
    renderCarList = (
      <View>
        <Text>{carsListErr}</Text>
      </View>
    );
  } else if (!carsList && !carsListErr) {
    renderCarList = (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={colors.secondary} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <View style={styles.titleCont}>
          <Ionicons name="settings" size={24} color={colors.secondary} />
          <Text style={styles.text}>{route.params.serviceName}</Text>
        </View>
        <InputField
          placeholder="Description"
          name="newspaper-o"
          onChangeText={onChangeDescription}
          value={description}
        />
        <InputField placeholder="Phone" name="phone" onChangeText={onChangePhone} value={phone} />
      </View>
      <AddLocation
        location={location}
        setLocation={setLocation}
        onChangeText={onChangeTextLocation}
        value={textLocation}
      />
      {renderCarList}
      <CustomButton title="Submit" btn={styles.btn} btnText={styles.btnText} onPress={onSubmitRequest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  titleCont: {
    marginVertical: 20,
    flexDirection: "row",
  },
  text: {
    color: colors.lightGray,
    fontSize: 20,
    marginHorizontal: 10,
  },
  btn: {
    backgroundColor: colors.secondary,
    width: "50%",
    marginVertical: 20,
  },
  btnText: {
    color: colors.primary,
  },
});

export default AddService;
