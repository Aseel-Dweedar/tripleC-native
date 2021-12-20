import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import colors from "../assets/colors/colors";
import axios from "axios";
import RequestsList from "../components/RequestsList";
import CustomButton from "../components/CustomButton";
import { getUser } from "../assets/getUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserProfileData from "../components/UserProfileData";
import { FontAwesome } from "@expo/vector-icons";

const API_URL = process.env.API_URL;

const Profile = ({ navigation }) => {
  const [requestsList, setRequestsList] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser()
      .then((user) => {
        console.log("user ", user);
        setUser(() => user);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (user) {
      getRequests();
    }
  }, [user]);

  const getRequests = () => {
    axios
      .get(`${API_URL}/request`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((axiosRes) => {
        setRequestsList(() => axiosRes.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteRequest = (requestId) => {
    axios
      .delete(`${API_URL}/request/${requestId}`, {
        headers: {
          authorization: `Bearer ${user.token}`,
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

  const goToCars = () => {
    navigation.navigate("AddCar");
  };

  const showRequest = async (request) => {
    try {
      await AsyncStorage.setItem("req", JSON.stringify(request));
      navigation.navigate("Details");
    } catch (e) {
      console.log(e);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("user");
      navigation.navigate("SignIn");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.logOutContainer} onPress={signOut}>
          <FontAwesome name="sign-out" size={22} color={colors.secondary} />
          <Text style={styles.logOutText}>Sign-Out</Text>
        </TouchableOpacity>
        {user && <UserProfileData user={user} />}
      </View>
      <View style={styles.requestsContainer}>
        <RequestsList deleteRequest={deleteRequest} showRequest={showRequest} requestsList={requestsList} />
        <View style={styles.btnContainer}>
          <CustomButton title="My Cars" btn={styles.btn} btnText={styles.btnText} onPress={goToCars} />
          <CustomButton
            title="Add Request"
            btn={{ width: "40%", backgroundColor: colors.primary }}
            btnText={{ color: colors.secondary }}
            onPress={goToRequest}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    paddingTop: 50,
    backgroundColor: colors.lightGray,
  },
  profileContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  logOutContainer: {
    flexDirection: "row",
    padding: 7,
    marginBottom: 10,
    backgroundColor: colors.primary,
    borderRadius: 15,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  logOutText: {
    color: colors.lightGray,
    marginLeft: 10,
  },
  requestsContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.primary,
    padding: 20,
    flex: 2,
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  btn: {
    backgroundColor: colors.secondary,
    width: "40%",
  },
  btnText: {
    color: colors.primary,
  },
});

export default Profile;
