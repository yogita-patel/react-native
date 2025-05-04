import { View, Text } from "react-native";
import React, { useState } from "react";
import SmallDateTimepicker from "../../Components/SmallDateTimepicker";
import styles from "../../Styles/CommonStyle";
const CalculatePayrollScreen = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.commonmarginHorizontol10, styles.card]}>
        <View style={[styles.searchDateContriner, styles.commonMarging10]}>
          <SmallDateTimepicker
            label={"Start Date"}
            onConfirm={(date) => setStartDate(date)}
            mode="date"
            selectedTime={startDate}
          />

          <SmallDateTimepicker
            label={"End Date"}
            onConfirm={(date) => setEndDate(date)}
            mode="date"
            selectedTime={endDate}
          />
        </View>
      </View>
    </View>
  );
};

export default CalculatePayrollScreen;
