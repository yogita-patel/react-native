import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BuisnessAcoountScreen from "../Buisness/BuisnessAcoountScreen";
import BuisnessHomeScreen from "../Buisness/BuisnessHomeScreen";
import Colors from "../../Constants/Colors";
import EmployeeListScreen from "../Buisness/EmployeeListScreen";
import styles from "../../Styles/CommonStyle";
import IconButtonComponent from "../../Components/IconButtonComponent";
import EmployeeAttendance from "../Buisness/EmployeeAttendance";
import EmployeePayroll from "../Buisness/EmployeePayroll";
const Tab = createBottomTabNavigator();
const BuisnessDashboard = () => {
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
          } else if (route.name === "EmployeeListScreen") {
            iconName = "account-tie";
          } else if (route.name === "EmployeeAttendance") {
            iconName = "check-circle";
          } else if (route.name === "EmployeePayroll") {
            iconName = "wallet";
          } else if (route.name === "BuisnessAcoountScreen") {
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
        name="BuisnessHomeScreen"
        component={BuisnessHomeScreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="EmployeeListScreen"
        component={EmployeeListScreen}
        options={({ navigation, route }) => ({
          tabBarLabel: "Employee",
          headerTitle: "Employee List",
          headerRight: () => (
            <IconButtonComponent
              iconName={"add"}
              onIconPress={() => {
                navigation.navigate("CreateEmployee");
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="EmployeeAttendance"
        component={EmployeeAttendance}
        options={{
          tabBarLabel: "Attendance",
          headerTitle: "Employee Attendance",
        }}
      />
      <Tab.Screen
        name="EmployeePayroll"
        component={EmployeePayroll}
        options={{ tabBarLabel: "Payroll" }}
      />
      <Tab.Screen
        name="BuisnessAcoountScreen"
        component={BuisnessAcoountScreen}
        options={({ navigation, route }) => ({
          tabBarLabel: "Account",
          headerTitle: "Buisness Information",
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

export default BuisnessDashboard;
