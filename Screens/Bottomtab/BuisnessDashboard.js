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
          } else if (route.name === "Calculator") {
            iconName = "calculator-variant";
          } else if (route.name === "GamesScreen") {
            iconName = "microsoft-xbox-controller";
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
        options={{ tabBarLabel: "Employee", headerTitle: "Employee" }}
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
