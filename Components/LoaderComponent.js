import { View, Modal, ActivityIndicator } from "react-native";
import React from "react";
import Colors from "../Constants/Colors";
import styles from "../Styles/CommonStyle";

const LoaderComponent = ({ show = false }) => {
  return (
    <Modal transparent animationType="none" visible={show}>
      <View style={styles.modalbg}>
        <View style={styles.loaderbg}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </View>
    </Modal>
  );
};

export default LoaderComponent;
