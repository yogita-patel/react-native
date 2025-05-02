// components/TimePickerComponent.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Colors from "../Constants/Colors";
import styles from "../Styles/CommonStyle";
import { formatDate, formatTime } from "../Controller/global";
const TimePickerComponent = ({
  label,
  onConfirm,
  mode = "time",
  error,
  touched,
}) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleConfirm = (date) => {
    setSelectedTime(date);
    onConfirm && onConfirm(date);
    setPickerVisible(false);
  };

  return (
    <View style={styles.commonMarging10}>
      <Text style={styles.label}>{label || "Select Time"}</Text>
      <TouchableOpacity
        onPress={() => setPickerVisible(true)}
        style={styles.input}
      >
        <Text style={{ fontSize: 12 }}>
          {selectedTime
            ? mode === "date"
              ? formatDate(selectedTime)
              : formatTime(selectedTime)
            : "Select " + label}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode={mode}
        is24Hour={true}
        accentColor={Colors.primary}
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(false)}
      />
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default TimePickerComponent;
