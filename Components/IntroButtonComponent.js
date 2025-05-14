import { View, Text, TouchableOpacity, Icon } from "react-native";
import React from "react";
import styles from "../Styles/CommonStyle";
import { MaterialIcons } from "@expo/vector-icons";
//button whith text of screen size
const IntroButtonComponent = ({ title, iconName, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <MaterialIcons name={iconName} size={20} color="white" />
        <View style={styles.commonLeftMargine10}></View>
        <Text style={styles.size20text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default IntroButtonComponent;
