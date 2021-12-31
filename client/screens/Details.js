import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import colors from "../assets/colors/colors";
import { getUser } from "../assets/getUser";
import axios from "axios";
import MapView from "react-native-maps";
import * as Device from "expo-device";

const API_URL = process.env.API_URL;

const Details = ({ route }) => {
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
        Alert.alert("Error", "An error happens!! please try again later!", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        // alert("An error happens!! please try again later");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.requestTextContainer}>
          <Text style={styles.titleText}>REQUEST DETAILS</Text>
          <Text style={styles.pending}>{isTaken ? "Approved" : "Pending"}</Text>
        </View>
        <Text style={styles.reqText}>Request name : {`${name}`}</Text>
        <Text style={styles.reqText}>Description : {`${description}`}</Text>
        <Text style={styles.reqText}>Phone number : {`${phone}`}</Text>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.carSection}> 🚔 Car Details</Text>
        {reqCar && (
          <View style={styles.carDetailsContainer}>
            <Text style={styles.carText}>Car Type : {`${reqCar.type}`}</Text>
            <Text style={styles.carText}>Car Model : {`${reqCar.model}`}</Text>
            <Text style={styles.carText}>Gasoline Type : {`${reqCar.gasoline}`}</Text>
            {reqCar.deleted && <Text style={styles.deletingNote}>NOTE: you deleted this car</Text>}
          </View>
        )}
        <Text style={styles.titleText}>Location Details</Text>
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
    paddingHorizontal: 15,
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  requestTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    paddingBottom: 10,
  },
  pending: {
    backgroundColor: "grey",
    color: colors.lightGray,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  reqText: {
    fontSize: 15,
    color: colors.primary,
    paddingTop: 5,
  },
  bottomSection: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.primary,
    width: "100%",
    flex: 2.5,
  },
  carSection: {
    fontSize: 20,
    color: colors.lightGray,
    paddingVertical: 10,
    alignSelf: "center",
  },
  carDetailsContainer: {
    paddingHorizontal: 15,
  },
  carText: {
    fontSize: 15,
    color: colors.lightGray,
    paddingTop: 5,
  },
  deletingNote: {
    fontSize: 12,
    color: "tomato",
    paddingTop: 5,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default Details;
