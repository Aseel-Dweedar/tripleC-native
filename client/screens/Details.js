import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../assets/colors/colors";
import CustomButton from "../components/CustomButton";

const Details = ({ navigation, route }) => {
  const goToRequest = () => {
    navigation.navigate("Profile");
  };

  return (
    <View>
      <View>
        <Text>HI</Text>
      </View>
      <View>
        <Text>{route.params.requestDetail.description}</Text>
      </View>
      <CustomButton title="Profile" btn={styles.btn} btnText={styles.btnText} onPress={goToRequest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
