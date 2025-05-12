import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import DashboardCard from "../../Components/DashboardCard";
import Colors from "../../Constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { getLocalUser } from "../../Controller/global";
import {
  getTOdaysAppointmentCount,
  getTotalMedicalStaff,
} from "../../Controller/Hospital/HomeScreenCOntroller";
import LoaderComponent from "../../Components/LoaderComponent";
import { getPatients } from "../../Controller/Hospital/PatientsController";

const HospitalHomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [medicalStaffCount, setMedicalStaffCount] = useState(0);
  const [user, setUser] = useState(null);
  const [appoinemtnCount, sertAppointmentCount] = useState(0);
  const [patientCount, setPatientCOunt] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const u = await getLocalUser();
      if (u.hospitalID) {
        const staff = await getTotalMedicalStaff({
          hospitalID: u.hospitalID,
        });
        setMedicalStaffCount(staff);
        const todayAppointment = await getTOdaysAppointmentCount({
          hospitalID: u.hospitalID,
        });
        sertAppointmentCount(todayAppointment);
        const patientsC = await getPatients({ hospitalId: u.hospitalID });
        setPatientCOunt(patientsC.length);
        console.log(
          "StaffCount-------------------",
          medicalStaffCount,
          todayAppointment,
          patientsC.length
        );
      }
      // const avg = await calCulateAvgAttendance();
      // const a = await getAlertCount();
      // const calRev = await calculateRevenue();
      // setAlertCount(a);
      // setEmpAttendanceAvg(avg);
      // setEmployeeCount(empC);
      // setTotalRevenue(calRev);
    } catch (e) {
      console.log("Error in HospitalHOmeScreen.js fetchData:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log("callback--------------");
      fetchData();
      return () => {};
    }, [medicalStaffCount])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Overview</Text>

      <View style={styles.grid}>
        <DashboardCard
          iconName={"local-hospital"}
          label={"Medical Staff"}
          value={medicalStaffCount}
        />
        <DashboardCard
          iconName={"person"}
          label={"Patients"}
          value={patientCount}
        />

        <DashboardCard
          iconName={"event"}
          label={"Today Appointment"}
          value={appoinemtnCount}
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
    color: Colors.primary,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default HospitalHomeScreen;
