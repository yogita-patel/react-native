import { Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import styles from "../Styles/CommonStyle";

//text label
const LabelComponent = ({ label = "" }) => {
  return (
    <View style={styles.commonMarging10}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default LabelComponent;
