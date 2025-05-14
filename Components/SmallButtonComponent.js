import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import styles from "../Styles/CommonStyle";
import Colors from "../Constants/Colors";

//small button
const SmallBUttonComponent = ({
  onPress,
  label = "",
  bgColor = Colors.primary,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.smallButtonShadow, { backgroundColor: bgColor }]}
    >
      <Text style={styles.smallButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default SmallBUttonComponent;
