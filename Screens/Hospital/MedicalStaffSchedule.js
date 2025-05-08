import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import CalenderComponent from "../../Components/CalenderComponent";
import {
  fetchStaffShcedule,
  fetchStaffShceduleByDate,
} from "../../Controller/Hospital/MedicalStaffController";
import Colors from "../../Constants/Colors";
import LoaderComponent from "../../Components/LoaderComponent";
import { formatDate, formatTime } from "../../Controller/global";

const MedicalStaffSchedule = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const [schedule, setSchedule] = useState(null);
  const docData = useState(route.params);
  const [staffId, setStaffID] = useState(null);
  const [isLoadinDialog, setIsLoadingDialog] = useState(false);

  useEffect(() => {
    const fetchMarkedDates = async () => {
      try {
        // setIsLoadingDialog(true);
        if (docData[0].staffData.staffID) {
          setStaffID(docData[0].staffData.staffID);
          const shiftdata = await fetchStaffShcedule({
            staffId: docData[0].staffData.staffID,
          });
          const markedDates = {};

          // Loop through the data
          shiftdata.forEach((item) => {
            const shiftDate = item.shiftDate.seconds;
            const date = new Date(shiftDate * 1000);
            const dateString = date.toISOString().split("T")[0];
            markedDates[dateString] = {
              marked: true,
              dotColor: Colors.commonRed,
            };
          });
          console.log("fetchMarkedDates-------------", markedDates);
          setMarkedDates(markedDates);
        }
      } catch (e) {
        console.log("Error in MedicalStaffSchedule.js fetchMarkedDates", e);
      } finally {
        // setIsLoadingDialog(false);
      }
    };

    if (docData) {
      fetchMarkedDates();
    }
  }, []);

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
  return (
    <View>
      <CalenderComponent
        markedDates={markedDates}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />
      {selectedDate && (
        <Text style={{ marginTop: 10, fontWeight: "bold", padding: 8 }}>
          Schedule on {formatDate(selectedDate)}:
        </Text>
      )}
      {schedule ? (
        <Text style={{ padding: 8 }}>
          {formatTime(schedule.shiftStart?.toDate())} -{" "}
          {formatTime(schedule.shiftEnd?.toDate())}
        </Text>
      ) : (
        selectedDate && <Text>No schedule found.</Text>
      )}
      <LoaderComponent show={isLoadinDialog} />
    </View>
  );
};

export default MedicalStaffSchedule;
