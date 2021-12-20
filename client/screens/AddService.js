import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../assets/colors/colors";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import SelectCarRequest from "../components/SelectCarRequest";
import AddLocation from "../components/AddLocation";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { getUser } from "../assets/getUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.API_URL;

const AddService = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [currentCar, setCurrentCar] = useState(null);
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [textLocation, setTextLocation] = useState("");
  const [carsList, setCarsList] = useState(null);
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
        console.log(err);
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
        .then(async (axiosRes) => {
          try {
            await AsyncStorage.setItem("req", JSON.stringify(axiosRes.data));
            navigation.navigate("Details");
          } catch (e) {
            console.log(e);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please Fill All Fields!");
    }
  };

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
    marginVertical: 40,
  },
  btnText: {
    color: colors.primary,
  },
});

export default AddService;
