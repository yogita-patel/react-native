import { View, Text } from "react-native";
import React, { useState } from "react";
import SearchFieldComponent from "../../Components/SearchFieldComponent";
import styles from "../../Styles/CommonStyle";

const EmployeeAttendance = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <View style={styles.commonmarginHorizontol10}>
      <Text>EmployeeAttendance</Text>
      <SearchFieldComponent
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search employees..."
      />
    </View>
  );
};

export default EmployeeAttendance;
