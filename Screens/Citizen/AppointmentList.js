import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import styles from "../../Styles/CommonStyle";
import Colors from "../../Constants/Colors";
import DividerComponent from "../../Components/DividerComponent";
import SmallBUttonComponent from "../../Components/SmallButtonComponent";
import Constants from "../../Constants/Strings";

const appointmentsMock = [
  {
    id: "1",
    doctorName: "Dr. Priya Sharma",
    date: "12 May 2025",
    time: "14:00",
    status: "Booked",
  },
  {
    id: "2",
    doctorName: "Dr. Ramesh Mehta",
    date: "05 May 2025",
    time: "09:30",
    status: "Completed",
  },
  {
    id: "3",
    doctorName: "Dr. Asha Jain",
    date: "20 May 2025",
    time: "17:30",
    status: "Cancelled",
  },
];

const UserAppointmentScreen = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Replace with Firebase fetch
    setAppointments(appointmentsMock);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Booked":
        return Colors.commonGreen;
      case "Completed":
        return Colors.commonblue;
      case "Cancelled":
        return Colors.commonRed;
      default:
        return "#000";
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.infoValue1}>Doctor: {item.doctorName}</Text>
      <Text style={styles.label}>Date: {item.date}</Text>
      <Text style={styles.label}>Time: {item.time}</Text>
      <Text
        style={[
          styles.label,
          { color: getStatusColor(item.status), fontWeight: "bold" },
        ]}
      >
        Status: {item.status}
      </Text>
      <DividerComponent />
      {item.status == Constants.appointmentStatus.booked ? (
        <SmallBUttonComponent
          onPress={() => console.log("cliked")}
          label="Cancel"
          bgColor={Colors.commonRed}
        />
      ) : null}
    </View>
  );

  return (
    <View>
      <Text style={styles.title}>My Appointments</Text>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default UserAppointmentScreen;
