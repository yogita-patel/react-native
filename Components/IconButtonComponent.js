import { View, Text, TouchableOpacity, Ionicons } from "react-native";
import React from "react";
import Colors from "../Constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

//icon button
const IconButtonComponent = ({ onIconPress, iconName }) => {
  return (
    <TouchableOpacity style={{ marginRight: 15 }} onPress={onIconPress}>
      <MaterialIcons name={iconName} size={20} color="white" />
    </TouchableOpacity>
  );
};

export default IconButtonComponent;
