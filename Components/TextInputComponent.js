import { Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import styles from "../Styles/CommonStyle";
//common text input
const TextInputComponent = ({
  placeholder,
  value,
  label = "",
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  error,
  ...props
}) => {
  return (
    <View style={styles.commonMarging10}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, error && { borderColor: "red" }]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onChangeText={(newText) => onChangeText(newText)}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default TextInputComponent;
