import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../assets/colors/colors";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Details = ({ navigation, route }) => {
  const [req, setReq] = useState({});

  useEffect(() => {
    getReq();
  }, []);

  const getReq = () => {
    try {
      AsyncStorage.getItem("req").then((storedReq) => {
        setReq(() => JSON.parse(storedReq) || null);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const goToRequest = () => {
    navigation.navigate("Profile");
  };

  return (
    <View>
      <View>
        <Text>HI</Text>
      </View>
      <View>{req && <Text>{req.description}</Text>}</View>
      <CustomButton title="Profile" btn={styles.btn} btnText={styles.btnText} onPress={goToRequest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 3,
    backgroundColor: colors.lightGray,
    justifyContent: "center",
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

export default Details;
