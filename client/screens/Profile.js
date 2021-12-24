import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import colors from "../assets/colors/colors";
import axios from "axios";
import RequestsList from "../components/RequestsList";
import CustomButton from "../components/CustomButton";
import { getUser } from "../assets/getUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserProfileData from "../components/UserProfileData";
import { FontAwesome } from "@expo/vector-icons";
// import { AuthStackNavigator } from "../navigation/NativeStackNavigator";

const API_URL = process.env.API_URL;

const Profile = ({ navigation }) => {
  const [requestsList, setRequestsList] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUser()
      .then((user) => {
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
        setIsLoading(false);
        setRequestsList(() => axiosRes.data);
      })
      .catch((err) => {
        setIsLoading(false);
        alert("An error happens!! please try again later");
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

  const showRequest = async (request) => navigation.navigate("Details", { requestDetail: request });

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("user");
      navigation.navigate("SignIn");
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) {
    return (
      <View style={{ backgroundColor: colors.primary, flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={colors.secondary} size="large" />
      </View>
    );
  }

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
