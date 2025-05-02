import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../Styles/CommonStyle";
import Colors from "../Constants/Colors";

const ButtonComponent = ({
  label = "",
  onButtonPress,
  bgColor = Colors.primary,
  align = "center",
  margin = styles.commonMarging10,
}) => {
  return (
    <View style={margin}>
      <TouchableOpacity style={{ alignSelf: "center" }} onPress={onButtonPress}>
        <View style={[styles.smallButton, { backgroundColor: bgColor }]}>
          <Text style={styles.buttonText}>{label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComponent;
