import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import Colors from "../Constants/Colors";

const screenWidth = Dimensions.get("window").width;

const AttendanceChartComponent = ({ performance }) => {
  const data = {
    labels: ["Attendance"],
    data: [performance / 100],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Performance</Text>
      <ProgressChart
        data={data}
        width={screenWidth - 22}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={{
          backgroundColor: Colors.primary,
          backgroundGradientFrom: Colors.gredient1,
          backgroundGradientTo: Colors.gredient2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        hideLegend={true}
      />
      <Text style={styles.performanceText}>{performance + "%"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  performanceText: { fontSize: 18, marginTop: 15 },
});

export default AttendanceChartComponent;
