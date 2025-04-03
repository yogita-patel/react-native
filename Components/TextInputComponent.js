import { Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import styles from "../Styles/CommonStyle";

const TextInputComponent = ({
  placeholder,
  value,
  label = "",
  onChangeText,
  leftIcon,
  rightIcon,
  secureTextEntry = false,
  keyboardType = "default",
  containerStyle,
  inputStyle,
  iconSize = 24,
  iconColor = "#666",
}) => {
  return (
    <View style={styles.commonMarging10}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={(newText) => onChangeText(newText)}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default TextInputComponent;
