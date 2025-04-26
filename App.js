import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/Auth/LoginScreen";
import DashboardScreen from "./Screens/Bottomtab/DashboardScreen";
import SplashScreen from "./Screens/SplashScreen";
import RegisterScreen from "./Screens/Auth/RegisterScreen";
import InitialScreen from "./Screens/Auth/InitialScreen";
import Toast from "react-native-toast-message";
import { isUserLoggedIn } from "./Controller/Authentication/LoginController";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checklogin = async () => {
      try {
        const isLogin = await isUserLoggedIn();
        console.log("isLogin = ", isLogin);
        setIsLoggedIn(isLogin);
        console.log("isLogin = ", isLoggedIn);
      } catch (e) {
        console.error("Failed to get logindata:", e);
      } finally {
        setIsLoading(false);
      }
      setTimeout(() => {
        setIsLoading(false);
        // setIsLoggedIn(true); // Uncomment to skip login screens
      }, 3000);
    };

    checklogin();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "InitialScreen" : "Login"}
      >
        <Stack.Screen
          name="InitialScreen"
          component={InitialScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

      <Toast />
    </NavigationContainer>
  );
}
