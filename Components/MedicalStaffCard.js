import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../Styles/CommonStyle";
import DividerComponent from "./DividerComponent";
import SmallBUttonComponent from "./SmallButtonComponent";
import MaterialIconComponent from "./MaterialIconComponent";
import Colors from "../Constants/Colors";

//medical staff card
const MedicalStaffCard = ({
  name,
  email,
  contact,
  role,
  onEdit,
  onDelete,
  //   onView,
  onViewSchedule,
  //   onViewPerformance,
  onSchedule,
  //   isShowPerformance = true,
}) => {
  const IconLabelComponent = ({ iconName, label }) => {
    return (
      <View style={styles.content}>
        <MaterialIconComponent iconName={iconName} color={Colors.shade2Black} />
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  };
  return (
    <View style={styles.card}>
      <IconLabelComponent iconName={"person"} label={name} />
      <IconLabelComponent iconName={"email"} label={email} />
      <IconLabelComponent iconName={"phone"} label={contact} />
      <IconLabelComponent iconName={"badge"} label={role} />
      <DividerComponent />
      <View style={[styles.content]}>
        <SmallBUttonComponent
          onPress={onViewSchedule}
          label="View Schedule"
          bgColor={Colors.commonGreen}
        />
        <View style={{ marginLeft: 4 }}></View>
        {/* {isShowPerformance && (
              <SmallBUttonComponent
                onPress={onViewPerformance}
                label="View Performance"
                bgColor={Colors.commonRed}
              />
            )}
            <View style={{ marginLeft: 4 }}></View> */}
        <SmallBUttonComponent onPress={onSchedule} label="Assign Schedule" />
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

export default MedicalStaffCard;
