import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HospitalHomeScreen from "../Hospital/HospitalHomeScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../../Styles/CommonStyle";
import Colors from "../../Constants/Colors";
import HospitalAccountScreen from "../Hospital/HospitalAccountScreen";
import IconButtonComponent from "../../Components/IconButtonComponent";
import MedicalStaffListScreen from "../Hospital/MedicalStaffListScreen";
import AllAppointmenList from "../Hospital/AllAppointmenList";
import PatientsList from "../Hospital/PatientsList";

const Tab = createBottomTabNavigator();
const HospitalDashboard = () => {
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
          if (route.name === "BuisnessHomeScreen") {
            iconName = "home";
          } else if (route.name === "MedicalStaffListScreen") {
            iconName = "doctor";
          } else if (route.name === "AllAppointmenList") {
            iconName = "calendar-clock";
          } else if (route.name === "PatientsList") {
            iconName = "account-heart";
          } else if (route.name === "HospitalAccountScreen") {
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
        name="HospitalHomeScreen"
        component={HospitalHomeScreen}
        options={{ tabBarLabel: "Home", headerTitle: "Dashboard" }}
      />
      <Tab.Screen
        name="MedicalStaffListScreen"
        component={MedicalStaffListScreen}
        options={({ navigation, route }) => ({
          tabBarLabel: "Medical Staff",
          headerTitle: "Medical List",
          unmountOnBlur: true,
          headerRight: () => (
            <IconButtonComponent
              iconName={"add"}
              onIconPress={() => {
                navigation.navigate("CreateMedicalStaff");
                console.log("Add staff");
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="AllAppointmenList"
        component={AllAppointmenList}
        options={{ tabBarLabel: "Appointments", headerTitle: "Appointments" }}
      />
      <Tab.Screen
        name="PatientsList"
        component={PatientsList}
        options={{ tabBarLabel: "Patients", headerTitle: "Patients List" }}
      />
      <Tab.Screen
        name="HospitalAccountScreen"
        component={HospitalAccountScreen}
        options={({ navigation, route }) => ({
          tabBarLabel: "Account",
          headerTitle: "Hospital Information",
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

export default HospitalDashboard;
