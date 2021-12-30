import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import * as Device from "expo-device";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import colors from "../assets/colors/colors";
import Checkbox from "expo-checkbox";

const AddLocation = (props) => {
  const [isDevice, setIsDevice] = useState(Device.brand);
  const [isChecked, setChecked] = useState(false);

  useEffect(async () => {
    if (isChecked) {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setChecked(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({}).catch((err) => {
        Alert.alert(
          "⛔",
          "Can't access your location, please check you location enabled ar your internet connection!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
        // alert("Can't access your location, please check you location enabled ar your internet connection!");
        setChecked(false);
        return;
      });
      props.setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  }, [isChecked]);

  let locationRender = (
    <TextInput
      style={{ ...styles.map, backgroundColor: colors.lightGray }}
      value={props.value}
      onChangeText={(value) => props.onChangeText(value)}
    />
  );
  if (isChecked && !!props.location && isDevice) {
    locationRender = (
      <MapView
        initialRegion={{
          latitude: props.location.latitude,
          longitude: props.location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={styles.map}
      >
        <MapView.Marker coordinate={props.location} title="My Marker" description="Your Location" />
      </MapView>
    );
  }

  return (
    <View style={styles.locationContainer}>
      <Text style={styles.textLightGray}>Your Location</Text>
      {locationRender}
      <View style={styles.checkboxSection}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#4630EB" : undefined}
        />
        <Text style={styles.checkboxParagraph}>Use my location</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    flex: 1,
    marginVertical: 20,
    width: "90%",
  },
  map: {
    width: "100%",
    height: 100,
  },
  textLightGray: {
    color: colors.lightGray,
    fontSize: 15,
    marginBottom: 5,
  },
  checkboxSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxParagraph: {
    fontSize: 15,
    color: colors.lightGray,
  },
  checkbox: {
    margin: 8,
    backgroundColor: colors.lightGray,
  },
});

export default AddLocation;
