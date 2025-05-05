import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../Styles/CommonStyle";

import MaterialIconComponent from "./MaterialIconComponent";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../Constants/Colors";
import DividerComponent from "./DividerComponent";
import ButtonComponent from "./ButtonComponent";
import SmallBUttonComponent from "./SmallButtonComponent";

const EmployeeListCardComponent = ({
  name,
  email,
  contact,
  role,
  onEdit,
  onDelete,
  onView,
  onMarkAttendace,
  onCalculatePay,
  onSchedule,
}) => {
  // return (
  //   <View style={styles.card}>
  //     <View style={styles.content}>
  //       <MaterialIconComponent iconName={"person"} />
  //       <Text style={styles.label}>{name}</Text>
  //     </View>
  //   </View>
  // );
  return (
    <View style={styles.card}>
      {/* Main content */}
      <View style={styles.content}>
        <MaterialIconComponent iconName={"person"} color={Colors.shade2Black} />
        <Text style={styles.label}>{name}</Text>
      </View>

      <View style={styles.content}>
        <MaterialIconComponent iconName={"email"} color={Colors.shade2Black} />
        <Text style={styles.label}>{email}</Text>
      </View>

      <View style={styles.content}>
        <MaterialIconComponent iconName={"phone"} color={Colors.shade2Black} />
        <Text style={styles.label}>{contact}</Text>
      </View>

      <View style={styles.content}>
        <MaterialIconComponent iconName={"badge"} color={Colors.shade2Black} />
        <Text style={styles.label}>{role}</Text>
      </View>
      <DividerComponent />
      <View style={[styles.content]}>
        <SmallBUttonComponent
          onPress={onMarkAttendace}
          label="Mark Attendance"
          bgColor={Colors.commonGreen}
        />
        <View style={{ marginLeft: 4 }}></View>
        {/* <SmallBUttonComponent
          onPress={onCalculatePay}
          label="Calculate Payroll"
          bgColor={Colors.commonRed}
        />
        <View style={{ marginLeft: 4 }}></View> */}
        <SmallBUttonComponent onPress={onSchedule} label="Schedule" />
      </View>
      <View style={[styles.actions, styles.content]}>
        <TouchableOpacity onPress={onEdit}>
          <MaterialIconComponent iconName={"edit"} color={Colors.commonblue} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={{ marginLeft: 12 }}>
          <MaterialIconComponent iconName={"delete"} color={Colors.commonRed} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={onView} style={{ marginLeft: 12 }}>
          <MaterialIconComponent
            iconName={"visibility"}
            color={Colors.commonGreen}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default EmployeeListCardComponent;
