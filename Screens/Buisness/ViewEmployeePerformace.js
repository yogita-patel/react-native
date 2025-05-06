import { View, Text } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import styles from "../../Styles/CommonStyle";
import MonthYearPickerModal from "../../Components/MonthYearPicker";
import ButtonComponent from "../../Components/ButtonComponent";
import AttendanceChartComponent from "../../Components/AttendanceChartComponent";
import { getMonth } from "../../Controller/global";
import {
  calculateAttendancePerformance,
  getAttendanceData,
  getWorkingDaysInRange,
} from "../../Controller/Employees/PerformanceController";
import LoaderComponent from "../../Components/LoaderComponent";

const ViewEmployeePerformace = ({ navigation, route }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ month: 1, year: 2025 });
  const employeeData = useState(route.params);
  const [loading, setLoading] = useState(false);
  const [performancePercent, setPErformancepecent] = useState(null);

  useLayoutEffect(() => {
    try {
    } catch (e) {
      console.log("Error in VIewEmploeePerformance.js useLayoutEffect");
    } finally {
    }
  }, []);

  const getEmployeePerformance = async ({ month, year }) => {
    try {
      //   console.log("get EMploee performnace");
      setLoading(true);

      const startOfMonth = new Date(year, month - 1, 1);

      const today = new Date();
      const endOfRange =
        year === today.getFullYear() && month - 1 === today.getMonth()
          ? today
          : new Date(
              year,
              month, // No -1 here because we already did that above
              0,
              23,
              59,
              59,
              999
            );
      //   console.log("get EMploee performnace");
      const dates = getWorkingDaysInRange({
        startDate: startOfMonth,
        endDate: endOfRange,
        workingDays: employeeData[0].employeeData.workingDays,
      });
      console.log("working dates===========", dates);
      const attendanceData = await getAttendanceData({
        employeeId: employeeData[0].employeeData.employeeID,
        end: endOfRange,
        start: startOfMonth,
      });
      const performanceCount = await calculateAttendancePerformance({
        attendanceData: attendanceData,
        workingDates: dates,
      });
      setPErformancepecent(performanceCount || 0);
      console.log("setPerformance------------", performanceCount);
      console.log("performance count===========", performanceCount);
    } catch (e) {
      console.log(
        "Error in VIewEmploeePerformance.js getEmployeePerformance",
        e
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.commonmarginHorizontol10, styles.card]}>
        <MonthYearPickerModal
          visible={showPicker}
          onCancel={() => setShowPicker(false)}
          onConfirm={async (date) => {
            setSelectedDate(date);
            console.log("selecteddate----------", selectedDate);
            setShowPicker(false);
            console.log("date month,", date.month, date.year);
            await getEmployeePerformance({
              month: date.month,
              year: date.year,
            });
          }}
        />
        <ButtonComponent
          onButtonPress={() => setShowPicker(true)}
          label="Select Month and Year"
          align="center"
          margin={0}
          width={330}
        />
        <View>
          <Text>
            {selectedDate
              ? "Selected time period : " + getMonth(selectedDate.month)
              : "Please select time period"}
          </Text>
        </View>
      </View>

      {performancePercent == null ? null : (
        <AttendanceChartComponent performance={performancePercent || 0} />
      )}

      <LoaderComponent show={loading} />
    </View>
  );
};

export default ViewEmployeePerformace;
