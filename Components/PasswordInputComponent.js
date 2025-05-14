import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../Constants/Colors";
import styles from "../Styles/CommonStyle";

//pasword text input with icon
const PasswordInputComponent = ({
  value,
  onChangeText,
  placeholder,
  error,
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.passwordContainer}>
      <TextInput
        style={[styles.passwordInput, error && { borderColor: "red" }]}
        placeholder={placeholder}
        secureTextEntry={!passwordVisible}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />

      <TouchableOpacity
        onPress={() => setPasswordVisible(!passwordVisible)}
        style={styles.eyeIcon}
      >
        <Icon
          name={passwordVisible ? "eye-off" : "eye"}
          size={24}
          color={Colors.primary}
        />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default PasswordInputComponent;
