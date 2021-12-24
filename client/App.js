import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import Splash from "./screens/Splash";
// import { getUser } from "./assets/getUser";
// import BottomTabNavigator from "./navigation/BottomTapNavigator";
// import { AuthStackNavigator } from "./navigation/NativeStackNavigator";
import { MainStackNavigator } from "./navigation/NativeStackNavigator";

export default function App() {
  // const [user, setUser] = useState(null);
  // const [flag, setFlag] = useState(true);

  // setTimeout(() => {
  //   getUser()
  //     .then((user) => {
  //       setUser(() => user);
  //       if (!user) setFlag(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, 1000);

  // let tryThis ;
  // if (user) {
  //   {}
  // }

  // if (user) {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
  // } else if (flag) {
  //   return <Splash />;
  // }   else {
  //   return (
  //     <NavigationContainer>
  //       <AuthStackNavigator />
  //     </NavigationContainer>
  //   );

  // return <AuthStackNavigator />;
  // }
}
