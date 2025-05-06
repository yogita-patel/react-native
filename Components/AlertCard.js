import { View, Text, StyleSheet } from "react-native";
import React from "react";

const AlertCard = ({
  title = "notification",
  date = "5 may 2025",
  description = "description",
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3, // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});

export default AlertCard;
