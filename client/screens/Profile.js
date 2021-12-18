import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import colors from "../assets/colors/colors";
import Cookies from "universal-cookie";
import axios from "axios";
import RequestsList from "../components/RequestsList";
import CustomButton from "../components/CustomButton";

const cookies = new Cookies();
const API_URL = process.env.API_URL;

const Profile = ({ navigation, route }) => {
  const [requestsList, setRequestsList] = useState([]);

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = () => {
    axios
      .get(`${API_URL}/request`, {
        headers: {
          authorization: `Bearer ${cookies.get("user").token}`,
        },
      })
      .then((axiosRes) => {
        setRequestsList(axiosRes.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteRequest = (requestId) => {
    axios
      .delete(`${API_URL}/request/${requestId}`, {
        headers: {
          authorization: `Bearer ${cookies.get("user").token}`,
        },
      })
      .then((axiosRes) => {
        setRequestsList(axiosRes.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goToRequest = () => {
    navigation.navigate("Services");
  };

  const showRequest = (request) => {
    localStorage.setItem("req", JSON.stringify(request));
    navigation.navigate("Details");
  };

  const signOut = () => {
    cookies.remove("user", { path: "/" });
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <Button title="Sign-Out" onPress={signOut} />
      <RequestsList deleteRequest={deleteRequest} showRequest={showRequest} requestsList={requestsList} />
      <CustomButton title="Request" btn={styles.btn} btnText={styles.btnText} onPress={goToRequest} />
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

export default Profile;
