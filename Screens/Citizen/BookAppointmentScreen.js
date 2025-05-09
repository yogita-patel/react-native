import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CalenderComponent from "../../Components/CalenderComponent";
import Colors from "../../Constants/Colors";

const BookAppointmentScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const slots = [
    { time: "09:00", status: "available" },
    { time: "09:30", status: "available" },
    { time: "10:30", status: "booked" },
    { time: "11:00", status: "available" },
    { time: "11:30", status: "available" },
    { time: "13:00", status: "break" },
    { time: "14:00", status: "available" },
    { time: "15:30", status: "available" },
  ];
  const handleDateSelect = async (dateStr) => {
    try {
      setIsLoadingDialog(true);
      setSelectedDate(dateStr);
      console.log("selected date=======", dateStr);
      const shiftdateData = await fetchStaffShceduleByDate({
        selDate: dateStr,
        staffId: staffId,
      });
      console.log("shiftdateData====================", shiftdateData);
      setSchedule(shiftdateData);
    } catch (e) {
      console.log("Error in MedicalStaffSchedule.js handleDateSelect", e);
    } finally {
      setIsLoadingDialog(false);
    }
  };
  const renderSlot = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.slot, { backgroundColor: Colors.primary }]}
        disabled={item.status !== "available"}
      >
        <Text style={styles.slotText}>
          {item.status === "break" ? "Break" : item.time}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <CalenderComponent
        markedDates={markedDates}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />
      <FlatList
        data={slots}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderSlot}
        numColumns={3}
      />
    </View>
  );
};

export default BookAppointmentScreen;
const styles = StyleSheet.create({
  slotContainer: {
    marginTop: 10,
  },
  slot: {
    padding: 12,
    borderRadius: 10,
    margin: 5,
    flex: 1,
    alignItems: "center",
  },
  slotText: {
    color: "white",
    fontWeight: "600",
  },
});
