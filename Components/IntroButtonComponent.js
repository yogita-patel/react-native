import { View, Text, TouchableOpacity, Icon } from "react-native";
import React from "react";
import styles from "../Styles/CommonStyle";
import Icons from "react-native-vector-icons/MaterialIcons";

const IntroButtonComponent = ({ title, iconName, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <Icons
          name={iconName}
          size={24}
          color="white"
          style={styles.commonMarging10}
        />
        <Text style={styles.size20text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default IntroButtonComponent;
