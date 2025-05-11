import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import CalenderComponent from "../../Components/CalenderComponent";
import Colors from "../../Constants/Colors";
import moment from "moment";
import {
  bookAnAppointment,
  getTimeSlotsByDoc,
} from "../../Controller/Citizen/AppointmentController";
import NoDataComponent from "../../Components/NoDataComponent";
import ConfrimationDialog from "../../Components/ConfrimationDialog";
import { getLocalUser } from "../../Controller/global";

const BookAppointmentScreen = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const [docData, setDocData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [isConfrimationDialog, setConfrimDialog] = useState(false);
  const routeData = useState(route.params);
  const [doctorID, setDoctorID] = useState(null);
  const [timeSlotList, setTImeslotLits] = useState([]);
  const [selectedSlot, setselectedSlot] = useState([]);

  useEffect(() => {
    // console.log("routeData=====================", routeData);
    setDocData(routeData[0].docData);
    setDoctorID(routeData[0].docData.staffID);
    const now = new Date(); // or from calendar

    if (doctorID && selectedDate) handleDateSelect(now);
  }, [doctorID]);
  const handleDateSelect = async (dateStr) => {
    try {
      setLoading(true);
      const formattedDate = moment(dateStr).format("YYYY-MM-DD");
      setSelectedDate(formattedDate);
      console.log("selected date=======", dateStr);

      const slotsList = await getTimeSlotsByDoc({
        doctorId: doctorID,
        selectedDate: formattedDate,
      });
      console.log("slotsList====================", slotsList);
      setTImeslotLits(slotsList);
    } catch (e) {
      console.log("Error in MedicalStaffSchedule.js handleDateSelect", e);
    } finally {
      setLoading(false);
    }
  };

  const bookAppointment = async () => {
    try {
      if (selectedSlot) {
        const user = await getLocalUser();
        const userID = user.userID;
        const booked = await bookAnAppointment({
          date: selectedSlot.shiftDate,
          doctorId: selectedSlot.doctorId,
          patientId: userID,
          slotId: selectedSlot.id,
          startTime: selectedSlot.startTime,
          hospitalID: selectedSlot.hospitalId,
        });
        if (booked) {
          navigation.navigate("DashboardScreen", { screen: "AppointmentList" });
        }
      }
    } catch (e) {
      console.log("Error in MedicalStaffSchedule.js bookAppointment", e);
    } finally {
      setLoading(false);
    }
  };

  const onButtonPress = async ({ item }) => {
    try {
      setConfrimDialog(true);
      setselectedSlot(item);
    } catch (e) {
      console.log("Error in MedicalStaffSchedule.js bookAppointment", e);
    } finally {
      setLoading(false);
    }
  };
  const renderSlot = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.slot, { backgroundColor: Colors.primary }]}
        disabled={item.isBooked}
        onPress={() => onButtonPress({ item })}
      >
        <Text style={styles.slotText}>
          {`${item.startTime}-${item.endTime}`}
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
        data={timeSlotList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderSlot}
        numColumns={3}
        ListEmptyComponent={!loading ? <NoDataComponent /> : null}
      />
      <ConfrimationDialog
        visible={isConfrimationDialog}
        title="Confrimation"
        message="Are you sure do you want to Book appointment with the Doctor?"
        onConfirm={() => bookAppointment()}
        onCancel={() => setConfrimDialog(false)}
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
