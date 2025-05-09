import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IntroButtonComponent from "../../Components/IntroButtonComponent";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import styles from "../../Styles/CommonStyle";
import CitizenHomeScreen from "../Citizen/CitizenHomeScreen";
import BookAppointmentScreen from "../Citizen/BookAppointmentScreen";
import CitizenAccountScreen from "../Citizen/CitizenAccountScreen";
import Colors from "../../Constants/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IconButtonComponent from "../../Components/IconButtonComponent";

const Tab = createBottomTabNavigator();

const DashboardScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: styles.appbarStyle,
        headerBackTitleStyle: styles.appbarTitleStyle,
        headerTitleAlign: "center",
        headerTintColor: styles.appbarTintColor,
        // headerRight:
        tabBarIcon: ({ selected, color, size }) => {
          let iconName;
          if (route.name === "CitizenHomeScreen") {
            iconName = "home";
          } else if (route.name === "BookAppointmentScreen") {
            iconName = "hospital";
          } else if (route.name === "EmployeeAttendance") {
            iconName = "check-circle";
          } else if (route.name === "EmployeePayroll") {
            iconName = "wallet";
          } else if (route.name === "CitizenAccountScreen") {
            iconName = "account-circle";
          } else {
            iconName = "home";
          }
          return (
            <MaterialCommunityIcons name={iconName} color={color} size={size} />
          );
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.commonblack,
      })}
    >
      <Tab.Screen
        name="CitizenHomeScreen"
        component={CitizenHomeScreen}
        options={{ tabBarLabel: "Home", headerTitle: "Dashboard" }}
      />
      <Tab.Screen
        name="BookAppointmentScreen"
        component={BookAppointmentScreen}
        options={{ tabBarLabel: "Hospital", headerTitle: "Hospital" }}
      />
      <Tab.Screen
        name="CitizenAccountScreen"
        component={CitizenAccountScreen}
        options={({ navigation, route }) => ({
          tabBarLabel: "Profile",
          headerTitle: "Personal Info",
          unmountOnBlur: true,
          headerRight: () => (
            <IconButtonComponent
              iconName={"logout"}
              onIconPress={() => {
                route.params?.openLogoutDialog?.();
              }}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default DashboardScreen;
