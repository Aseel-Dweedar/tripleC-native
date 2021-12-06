import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Contact = ({ navigation, route }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text>Contact</Text>
    </View>
  );
};

export default Contact;
