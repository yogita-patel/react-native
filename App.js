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
import CreateAppointment from "./Screens/Appointment/CreateAppointment";
import CreateBuisness from "./Screens/Buisness/CreateBuisness";
import CreateHospital from "./Screens/Hospital/CreateHospital";
import HospitalDashboard from "./Screens/Bottomtab/HospitalDashboard";
import BuisnessDashboard from "./Screens/Bottomtab/BuisnessDashboard";
import styles from "./Styles/CommonStyle";
import { getLocalUser } from "./Controller/global";
import CreateEmployee from "./Screens/Buisness/CreateEmployee";
import MarkEmployeeAttendance from "./Screens/Buisness/MarkEmployeeAttendance";
import CalculatePayrollScreen from "./Screens/Buisness/CalculatePayrollScreen";
import EmployeeSchedule from "./Screens/Buisness/EmployeeSchedule";
import AlertScreen from "./Screens/Alert/AlertScreen";
import ViewEmployeePerformace from "./Screens/Buisness/ViewEmployeePerformace";
import CreateMedicalStaff from "./Screens/Hospital/CreateMedicalStaff";
import ManageMedicalStaffShifts from "./Screens/Hospital/ManageMedicalStaffShifts";
import MedicalStaffSchedule from "./Screens/Hospital/MedicalStaffSchedule";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [initialRouteName, setIninitalRoute] = useState("Login");

  useEffect(() => {
    const checklogin = async () => {
      try {
        const currentUser = await getLocalUser();
        if (!currentUser) {
          setIninitalRoute("Login");
        } else if (currentUser.businessID) {
          setIninitalRoute("BuisnessDashboard");
        } else if (currentUser.hospitalID) {
          setIninitalRoute("HospitalDashboard");
        } else if (currentUser.userID) {
          console.log("userId login route", currentUser.businessID);
          setIninitalRoute("DashboardScreen");
        } else {
          setIninitalRoute("Login");
        }
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
        initialRouteName={initialRouteName}
        screenOptions={{
          headerStyle: styles.appbarStyle,
          headerTintColor: styles.appbarTintColor,
          headerTitleAlign: "center",
        }}
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
        <Stack.Screen
          name="BuisnessDashboard"
          component={BuisnessDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HospitalDashboard"
          component={HospitalDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create Buisness"
          component={CreateBuisness}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateEmployee"
          component={CreateEmployee}
          options={{ title: "Add Employee" }}
        />
        <Stack.Screen
          name="CreateHospital"
          component={CreateHospital}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MarkEmployeeAttendance"
          component={MarkEmployeeAttendance}
          options={{ headerTitle: "Mark Attendance" }}
        />
        <Stack.Screen
          name="CalculatePayrollScreen"
          component={CalculatePayrollScreen}
          options={{ headerTitle: "Calculate Payroll" }}
        />
        <Stack.Screen
          name="EmployeeSchedule"
          component={EmployeeSchedule}
          options={{ headerTitle: "Employee Schedule" }}
        />
        <Stack.Screen
          name="ViewEmployeePerformace"
          component={ViewEmployeePerformace}
          options={{ headerTitle: "Employee Performance" }}
        />
        <Stack.Screen
          name="AlertScreen"
          component={AlertScreen}
          options={{ headerTitle: "Buisness Alert" }}
        />
        <Stack.Screen
          name="CreateMedicalStaff"
          component={CreateMedicalStaff}
          options={({ route }) => ({
            title: route.params?.title || "Create Medical Staff",
          })}
        />
        <Stack.Screen
          name="ManageMedicalStaffShifts"
          component={ManageMedicalStaffShifts}
          options={({ route }) => ({
            title: route.params?.title || "Manage Staff shifts",
          })}
        />
        <Stack.Screen
          name="MedicalStaffSchedule"
          component={MedicalStaffSchedule}
          options={({ route }) => ({
            title: route.params?.title || "Schedule",
          })}
        />
        <Stack.Screen
          name="MakeAppointment"
          component={CreateAppointment}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
