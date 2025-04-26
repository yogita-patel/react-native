import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../Styles/CommonStyle";
import Colors from "../Constants/Colors";

const ConfrimationDialog = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.confrimationOverlay}>
        <View style={styles.dialog}>
          <Text style={styles.confrimationtitle}>{title || "Confirm"}</Text>
          <Text style={styles.message}>{message || "Are you sure?"}</Text>

          <View style={styles.confrimationbuttonContainer}>
            <TouchableOpacity
              style={[
                styles.Confrimationbutton,
                { backgroundColor: Colors.primary },
              ]}
              onPress={onCancel}
            >
              <Text style={styles.confirmText}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.Confrimationbutton]}
              onPress={onConfirm}
            >
              <Text style={styles.cancelText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfrimationDialog;
