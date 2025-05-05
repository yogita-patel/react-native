import { View, Text, FlatList } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import styles from "../../Styles/CommonStyle";
import ButtonComponent from "../../Components/ButtonComponent";
import { formatTime, formatDate } from "../../Controller/global";

const EmployeeSchedule = ({ navigation, route }) => {
  const [weekdays, setWeekdays] = useState(["Mon", "Tue"]);
  const scheduleData = useState(route.params);

  useLayoutEffect(() => {
    try {
      console.log("useLayoutEffect-------");
      if (scheduleData) {
        console.log("Schedule data...........", scheduleData);
        // console.log(
        //   "change navcigation title----",
        //   employeeData[0].employeeData.name
        // );

        //   const title = employeeData[0].title;
        //   navigation.setOptions({ title: title });
        //   setIsForEdit(true);
      } else {
        //   navigation.setOptions({ title: "Add Employee" });
        //   setIsForEdit(false);
      }
      // console.log("EmployeeData-------", employeeData);
    } catch (e) {
      console.log("Error: Employee Schedule---", e);
    } finally {
    }
  }, [navigation, scheduleData]);
  return (
    <View>
      <Text
        style={[
          styles.welcomeText,
          { fontSize: 20, textAlign: "center", marginTop: 10 },
        ]}
      >
        {scheduleData[0]?.Scheduledata.name + "'s Schedule"}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={[styles.infoHeading1, styles.commonMarging10]}>
          {scheduleData
            ? "Start Time : " +
              formatTime(scheduleData[0]?.Scheduledata.startTime.toDate())
            : ""}
        </Text>
        <Text style={[styles.infoHeading1, styles.commonMarging10]}>
          {scheduleData
            ? "End Time : " +
              formatTime(scheduleData[0]?.Scheduledata.endTime.toDate())
            : ""}
        </Text>
        <Text style={[styles.infoHeading1, styles.commonMarging10]}>
          {scheduleData
            ? "Joining Date: " +
              formatDate(scheduleData[0]?.Scheduledata.joiningDate.toDate())
            : ""}
        </Text>
        <Text style={[styles.infoHeading1, styles.commonMarging10]}>
          Time:{" "}
        </Text>

        <FlatList
          data={scheduleData[0]?.Scheduledata.workingDays ?? []}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Text style={styles.label}>• {item}</Text>}
        />
      </View>
      {/* <ButtonComponent
        align="center"
        label="Edit Schedule"
        onButtonPress={() => console.log("Edit Schedule")}
      /> */}
    </View>
  );
};

export default EmployeeSchedule;
