import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Main from "./Main";

const Profile = ({ navigation, route }) => {
  return (
    <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
      <Button title="Go to Contact" onPress={() => navigation.navigate("Contact")} />
    </View>
  );
};

export default Profile;
