import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../Styles/CommonStyle";

const ButtonComponent = ({ label = "", onButtonPress }) => {
  return (
    <View style={styles.commonMarging10}>
      <TouchableOpacity
        style={{ alignSelf: "center" }}
        onPress={() => onButtonPress}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>{label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComponent;
