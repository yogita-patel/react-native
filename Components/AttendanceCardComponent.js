import { View, Text } from "react-native";
import React from "react";
import styles from "../Styles/CommonStyle";
import Colors from "../Constants/Colors";
import MaterialIconComponent from "./MaterialIconComponent";
import DividerComponent from "./DividerComponent";
import Strings from "../Constants/Strings";
const AttendanceCardComponent = ({
  employeeName = "Employee Name",
  checkIn = "09:00AM",
  checkOut = "06:00PM",
  breakhours = "1",
  status = "Present",
  workingHours = "8",
  date = "03 May 2025",
}) => {
  const InfoComponent = ({ iconName, label }) => (
    <View style={styles.content}>
      <MaterialIconComponent
        iconName={iconName}
        size={16}
        color={Colors.commonGrey}
      />
      <Text style={[styles.label, { fontSize: 12 }]}>{label}</Text>
    </View>
  );

  return (
    <View style={[styles.card]}>
      <View style={styles.searchDateContriner}>
        <View style={styles.content}>
          <MaterialIconComponent
            iconName={"person"}
            color={Colors.commonGrey}
          />
          <Text style={styles.label}>{employeeName}</Text>
        </View>
        <Text style={styles.label}>{date}</Text>
      </View>
      <DividerComponent />
      {status == Strings.attendanceStatus.absent ? (
        <Text style={{ color: Colors.commonRed }}>
          {Strings.attendanceStatus.absent}
        </Text>
      ) : (
        <View>
          <View style={styles.searchDateContriner}>
            <InfoComponent iconName={"timer"} label={"Start: " + checkIn} />
            <InfoComponent iconName={"timer"} label={"End: " + checkOut} />
          </View>
          <View style={styles.searchDateContriner}>
            <InfoComponent iconName={"coffee"} label={"Break: " + breakhours} />
            <InfoComponent
              iconName={"timer"}
              label={"Total-Work: " + workingHours + "h"}
            />
          </View>
          <Text
            style={{
              color:
                status === Strings.attendanceStatus.present
                  ? Colors.commonGreen
                  : Colors.commonOrange,
              padding: 4,
            }}
          >
            {status === Strings.attendanceStatus.present ? "Present" : "Late"}
          </Text>
        </View>
      )}
    </View>
  );
};

export default AttendanceCardComponent;
