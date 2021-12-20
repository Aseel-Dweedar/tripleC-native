import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import colors from "../assets/colors/colors";

const InputField = (props) => {
  return (
    <View style={styles.input}>
      <FontAwesome style={styles.icon} name={props.name} size={22} />
      <TextInput
        value={props.value || ""}
        placeholder={props.placeholder}
        autoCapitalize="none"
        onChangeText={(value) => props.onChangeText(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginVertical: 10,
    backgroundColor: colors.lightGray,
  },
  icon: {
    paddingHorizontal: 10,
    color: colors.primary,
  },
});

export default InputField;
