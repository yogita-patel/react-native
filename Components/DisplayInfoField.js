import { View, Text } from "react-native";
import React from "react";
import styles from "../Styles/CommonStyle";
import DividerComponent from "./DividerComponent";

//display information text display
const DisplayInfoField = ({ label, value }) => {
  return (
    <View style={[styles.content, styles.commonMarging10]}>
      <Text style={styles.infoHeading1}>{label + ""}</Text>
      <Text style={styles.infoValue1}>{value || "--"}</Text>
    </View>
  );
};

export default DisplayInfoField;
