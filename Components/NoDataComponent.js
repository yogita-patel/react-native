import { View, Text } from "react-native";
import React from "react";

const NoDataComponent = () => {
  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text style={{ fontSize: 16, color: "gray" }}>No data found.</Text>
    </View>
  );
};

export default NoDataComponent;
