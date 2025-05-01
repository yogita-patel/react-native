import React, { useState } from "react";
import { View, Text } from "react-native";
import { Checkbox } from "react-native-paper";
import Colors from "../Constants/Colors";
import styles from "../Styles/CommonStyle";
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WorkingDayComponent = ({ onChange, error = null, touched = null }) => {
  const [checkedDays, setCheckedDays] = useState([]);

  const toggleDay = (day) => {
    const updated = checkedDays.includes(day)
      ? checkedDays.filter((d) => d !== day)
      : [...checkedDays, day];
    setCheckedDays(updated);
    onChange && onChange(updated);
  };

  return (
    <View>
      {days.map((day) => (
        <View key={day} style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox
            status={checkedDays.includes(day) ? "checked" : "unchecked"}
            color={Colors.primary}
            onPress={() => toggleDay(day)}
          />
          <Text>{day}</Text>
        </View>
      ))}
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default WorkingDayComponent;
