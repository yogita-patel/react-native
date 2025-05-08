import { View, Text } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";
import Colors from "../Constants/Colors";

const CalenderComponent = ({
  markedDates = {},
  selectedDate = "",
  onDateSelect = () => {},
}) => {
  return (
    <Calendar
      onDayPress={(day) => onDateSelect(day.dateString)}
      markedDates={{
        ...markedDates,
        ...(selectedDate
          ? {
              [selectedDate]: {
                selected: true,
                marked: true,
                selectedColor: "green",
              },
            }
          : {}),
      }}
      theme={{
        selectedDayBackgroundColor: Colors.commonGreen,
        selectedDayTextColor: Colors.commonwhite,
        todayTextColor: Colors.primary,
        arrowColor: Colors.primary,
        dotColor: Colors.commonRed,
      }}
    />
  );
};

export default CalenderComponent;
