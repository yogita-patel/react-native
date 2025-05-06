import { View, Text, StyleSheet } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import MaterialIconComponent from "../../Components/MaterialIconComponent";
import DashboardCard from "../../Components/DashboardCard";
import LoaderComponent from "../../Components/LoaderComponent";
import {
  calCulateAvgAttendance,
  calculateRevenue,
  getAlertCount,
  getTotalEmployee,
} from "../../Controller/Buisness/DashboardController";
import { getLocalUser } from "../../Controller/global";
import Constants from "../../Constants/Strings";

const BuisnessHomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [user, setUser] = useState(null);
  const [empAttendanceAvg, setEmpAttendanceAvg] = useState(0);
  const [alertCount, setAlertCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const u = await getLocalUser();
      const empC = await getTotalEmployee();
      const avg = await calCulateAvgAttendance();
      const a = await getAlertCount();
      const calRev = await calculateRevenue();
      setAlertCount(a);
      setEmpAttendanceAvg(avg);
      setEmployeeCount(empC);
      setTotalRevenue(calRev);
    } catch (e) {
      console.log("Error in BuisnessHomeScreen.js fetchData:", e);
    } finally {
      setIsLoading(false);
    }
  };
  useLayoutEffect(() => {
    fetchData();
  }, [navigation, employeeCount, alertCount]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Overview</Text>
      <View style={styles.grid}>
        <DashboardCard
          iconName={"person"}
          label={"Employee"}
          value={employeeCount}
        />
        <DashboardCard
          iconName={"attach-money"}
          label={"Revenue"}
          value={totalRevenue}
        />
        <DashboardCard
          iconName={"event-available"}
          label={"Attendance"}
          value={empAttendanceAvg + "%"}
        />
        <DashboardCard
          iconName={"warning"}
          label={"Alert"}
          value={alertCount}
          onCardPress={() => {
            navigation.navigate("AlertScreen", {
              type: Constants.alertType.buisnessAlert,
            });
          }}
        />
      </View>
      <LoaderComponent show={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default BuisnessHomeScreen;
