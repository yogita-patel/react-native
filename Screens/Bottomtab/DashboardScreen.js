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
import HospitalListScreen from "../Citizen/HospitalListScreen";
import BuisnessListScreen from "../Citizen/BuisnessListScreen";
import AppointmenList from "../Hospital/AppointmenList";

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
          } else if (route.name === "HospitalListScreen") {
            iconName = "hospital";
          } else if (route.name === "BuisnessListScreen") {
            iconName = "domain";
          } else if (route.name === "AppointmenList") {
            iconName = "calendar-clock";
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
        name="HospitalListScreen"
        component={HospitalListScreen}
        options={{ tabBarLabel: "Hospital", headerTitle: "Hospital" }}
      />

      <Tab.Screen
        name="AppointmenList"
        component={AppointmenList}
        options={{
          tabBarLabel: "Appointment",
          headerTitle: "Your Appointments",
        }}
      />
      <Tab.Screen
        name="BuisnessListScreen"
        component={BuisnessListScreen}
        options={{ tabBarLabel: "Buisness", headerTitle: "Buisness" }}
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
