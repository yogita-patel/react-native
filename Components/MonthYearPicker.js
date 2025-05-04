import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import styles from "../Styles/CommonStyle";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = Array.from(
  { length: 20 },
  (_, i) => new Date().getFullYear() - 10 + i
);

const MonthYearPickerModal = ({ visible, onCancel, onConfirm }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.monthModalBackground}>
        <View style={styles.monthPickerContainer}>
          <Text style={styles.monthPickerTitle}>Select Month & Year</Text>
          <View style={styles.pickerRow}>
            <FlatList
              data={months}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.pickerItem,
                    selectedMonth === index && styles.selectedItem,
                  ]}
                  onPress={() => setSelectedMonth(index)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
            <FlatList
              data={years}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.pickerItem,
                    selectedYear === item && styles.selectedItem,
                  ]}
                  onPress={() => setSelectedYear(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={styles.pickerAction}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.pickerCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                onConfirm({ month: selectedMonth + 1, year: selectedYear })
              }
            >
              <Text style={styles.pickerConfrim}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MonthYearPickerModal;
