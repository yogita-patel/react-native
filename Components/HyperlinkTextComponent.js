import { View, Text } from "react-native";
import React from "react";
import styles from "../Styles/CommonStyle";

const HyperlinkTextComponent = ({ text = "", onTextPress }) => {
  return (
    <View style={styles.commonMarging10}>
      <Text style={styles.linkText} onPress={onTextPress}>
        {text}
      </Text>
    </View>
  );
};

export default HyperlinkTextComponent;
