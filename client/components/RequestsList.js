import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";

const requestsList = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>MY REQUESTS</Text>
      <ScrollView style={{ width: "100%" }}>
        {props.requestsList && props.requestsList.length ? (
          props.requestsList.map((request, index) => {
            return (
              <TouchableOpacity key={index} style={styles.oneRequest} onPress={() => props.showRequest(request)}>
                <View style={styles.textContainer}>
                  <Text style={styles.requestName}>{request.name}</Text>
                  <Text style={styles.text}>{request.description}</Text>
                </View>
                <TouchableOpacity onPress={() => props.deleteRequest(request._id)}>
                  <MaterialIcons name="delete" size={22} color={colors.secondary} />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={{ color: colors.lightGray, textAlign: "center" }}>YOUR REQUESTS LIST IS EMPTY !!</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 25,
  },
  mainText: {
    color: colors.lightGray,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  oneRequest: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 7,
    backgroundColor: colors.lightGray,
    padding: 7,
    borderRadius: 5,
  },
  textContainer: {
    maxWidth: "90%",
  },
  requestName: {
    fontWeight: "bold",
    fontSize: 15,
    color: colors.primary,
    marginBottom: 4,
  },
  text: {
    color: colors.primary,
    marginBottom: 10,
  },
});

export default requestsList;
