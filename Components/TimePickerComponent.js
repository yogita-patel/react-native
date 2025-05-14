import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Colors from "../Constants/Colors";
import styles from "../Styles/CommonStyle";
import { formatDate, formatTime } from "../Controller/global";

//common date and time picker
const TimePickerComponent = ({
  label,
  onConfirm,
  mode = "time",
  error,
  touched,
  externalTime = null,
}) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  // Sync with parent when externalTime changes
  useEffect(() => {
    console.log("External time", externalTime);
    setSelectedTime(externalTime || null);
  }, []);

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
