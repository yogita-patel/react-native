import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../Constants/Colors";
import MaterialIconComponent from "./MaterialIconComponent";
import { MaterialIcons } from "@expo/vector-icons";

//common dashboard card
const DashboardCard = ({ iconName, size = 30, label, value, onCardPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onCardPress}>
      <MaterialIcons name={iconName} size={30} color={Colors.primary} />
      <Text style={styles.dashboardLabel}>{label}</Text>
      <Text style={styles.dashboardValue}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dashboardLabel: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "600",
  },
  dashboardValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  card: {
    width: "47%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});
export default DashboardCard;
