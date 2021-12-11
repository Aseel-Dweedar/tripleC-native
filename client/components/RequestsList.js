import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";

const requestsList = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>YOUR REQUESTS</Text>
      <ScrollView style={{ width: "100%" }}>
        {props.requestsList.length &&
          props.requestsList.map((request, index) => {
            return (
              <View key={index} style={styles.oneRequest}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{request.name}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{request.description}</Text>
                </View>
                <TouchableOpacity style={{ width: "20%" }} onPress={() => props.deleteRequest(request._id)}>
                  <MaterialIcons name="delete" size={22} color={colors.secondary} />
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 40,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  mainText: {
    color: colors.lightGray,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  oneRequest: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    marginBottom: 7,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
  },
  textContainer: {
    // width: "40%",
  },
  text: {
    color: colors.lightGray,
  },
});

export default requestsList;
