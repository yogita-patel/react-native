import { View, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../Constants/Colors";

const MaterialIconComponent = ({
  iconName,
  size = 22,
  color = Colors.commonblack,
  style = null,
}) => {
  return (
    <MaterialIcons name={iconName} size={size} color={color} style={style} />
  );
};

export default MaterialIconComponent;
