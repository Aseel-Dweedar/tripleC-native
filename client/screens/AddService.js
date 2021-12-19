import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
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
  const [carsList, setCarsList] = useState([]);
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
      getCars().then((cars) => {
        setCarsList(() => cars);
      });
    }
  }, [user]);

  const getCars = () => {
    return axios
      .get(`${API_URL}/car`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((axiosRes) => {
        return axiosRes.data;
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
    if (currentCar === null && (location === null || textLocation === "")) {
      alert("Please Fill All Fields!");
      return;
    }
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        {/* <View>
          <Ionicons style={styles.icon} name="settings" size={22} color={colors.secondary} />
          <Text>{route.params.serviceName}</Text>
        </View> */}
        <InputField placeholder={route.params.serviceName} name="user" />
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
  icon: {
    paddingHorizontal: 10,
    color: colors.primary,
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
