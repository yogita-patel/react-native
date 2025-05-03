import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Colors from "../Constants/Colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate, formatTime } from "../Controller/global";
import MaterialIconComponent from "./MaterialIconComponent";
import styles from "../Styles/CommonStyle";
const SmallDateTimepicker = ({
  label,
  onConfirm,
  mode = "time",
  error,
  touched,
  selectedTime = null,
}) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  // const [selectedTime, setSelectedTime] = useState(null);

  // const handleConfirm = (date) => {
  //   setSelectedTime(date);
  //   onConfirm && onConfirm(date);
  //   setPickerVisible(false);
  // };

  return (
    <View>
      <TouchableOpacity
        style={styles.smalldatePickerContainer}
        onPress={() => setPickerVisible(true)}
      >
        <Text style={{ fontSize: 12 }}>
          {selectedTime
            ? mode === "date"
              ? formatDate(selectedTime)
              : formatTime(selectedTime)
            : "Select " + label}
        </Text>
        <MaterialIconComponent
          iconName={"date-range"}
          color={Colors.primary}
          size={24}
          style={{ padding: 8 }}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode={mode}
        is24Hour={true}
        accentColor={Colors.primary}
        onConfirm={onConfirm}
        onCancel={() => setPickerVisible(false)}
      />
    </View>
  );
};

export default SmallDateTimepicker;
