import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../assets/colors/colors";
import { getUser } from "../assets/getUser";
import axios from "axios";
import MapView from "react-native-maps";
import * as Device from "expo-device";

const API_URL = process.env.API_URL;

const Details = ({ navigation, route }) => {
  const [isDevice, setIsDevice] = useState(Device.brand);
  const [user, setUser] = useState(null);
  const [reqCar, setReqCar] = useState(null);

  let { description, isTaken, location, name, phone, car } = route.params.requestDetail;

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
      getCar();
    }
  }, [user]);

  const getCar = () => {
    axios
      .get(`${API_URL}/car/${car}`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((axiosRes) => {
        console.log(axiosRes.data);
        setReqCar(() => axiosRes.data);
      })
      .catch((err) => {
        alert("An error happens!! please try again later");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.requestTextContainer}>
          <Text style={styles.welcome}>REQUEST DETAILS</Text>
          <Text>{isTaken ? "Approved" : "Pending"}</Text>
        </View>
        <View style={styles.requestTextContainer}>
          <Text>Request name : </Text>
          <Text>{name}</Text>
        </View>
        <View style={styles.requestTextContainer}>
          <Text>Description : </Text>
          <Text>{description}</Text>
        </View>
        <View style={styles.requestTextContainer}>
          <Text>Phone number : </Text>
          <Text>{phone}</Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.welcome}>Car Details</Text>
        {reqCar && (
          <View>
            <View style={styles.requestTextContainer}>
              <Text>Car Type : </Text>
              <Text>{reqCar.type}</Text>
            </View>
            <View style={styles.requestTextContainer}>
              <Text>Car Model : </Text>
              <Text>{reqCar.model}</Text>
            </View>
            <View style={styles.requestTextContainer}>
              <Text>Gasoline Type : </Text>
              <Text>{reqCar.gasoline}</Text>
            </View>
            {reqCar.deleted && <Text>NOTE: you deleted this car</Text>}
          </View>
        )}
        <Text style={styles.welcome}>Location Details</Text>
        {location.latitude && isDevice ? (
          <MapView
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            style={styles.map}
          >
            <MapView.Marker coordinate={location} title="My Marker" description="Your Location" />
          </MapView>
        ) : (
          <Text>{location.textLocation}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3.5,
    backgroundColor: colors.lightGray,
  },
  topSection: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.primary,
    width: "100%",
    flex: 2.5,
    justifyContent: "center",
    alignItems: "center",
  },
  requestTextContainer: {
    flexDirection: "row",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default Details;
