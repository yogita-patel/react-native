import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import styles from "../Styles/CommonStyle";

const SmallBUttonComponent = ({ onPress, label = "" }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.smallButtonShadow]}>
      <Text style={styles.smallButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default SmallBUttonComponent;
