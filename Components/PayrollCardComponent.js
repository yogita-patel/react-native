import { View, Text } from "react-native";
import React from "react";
import styles from "../Styles/CommonStyle";
import Colors from "../Constants/Colors";
import MaterialIconComponent from "./MaterialIconComponent";
import DividerComponent from "./DividerComponent";
import Strings from "../Constants/Strings";
//employee payroll card component
const PayrollCardComponent = ({
  employeeName = "Employee Name",
  month = "May",
  year = "2025",
  deducation = "0",
  status = "Pending",
  workingHours = "60",
  payRate = "12.21",
  totalPay = "1000$",
}) => {
  const InfoComponent = ({ iconName, label }) => (
    <View style={styles.content}>
      <MaterialIconComponent
        iconName={iconName}
        size={16}
        color={Colors.commonGrey}
      />
      <Text style={[styles.label, { fontSize: 12 }]}>{label}</Text>
    </View>
  );

  return (
    <View style={[styles.card]}>
      <View style={styles.searchDateContriner}>
        <View style={styles.content}>
          <MaterialIconComponent
            iconName={"person"}
            color={Colors.commonGrey}
          />
          <Text style={styles.label}>{employeeName}</Text>
        </View>
        <Text style={styles.label}>{status}</Text>
      </View>
      <View>
        <DividerComponent />
      </View>
      <View>
        <View style={styles.searchDateContriner}>
          <InfoComponent iconName={"money"} label={"Hourly Rate: " + payRate} />
          <InfoComponent
            iconName={"timer"}
            label={"Total-Work: " + workingHours + "h"}
          />
        </View>

        <View style={styles.searchDateContriner}>
          <InfoComponent
            iconName={"money"}
            label={"Deduction: " + deducation + "$"}
          />
          <InfoComponent iconName={"money"} label={"bonus: 0 $"} />
        </View>
        <View style={styles.searchDateContriner}>
          <InfoComponent
            iconName={"money"}
            label={"Payable: " + totalPay + "$"}
          />
        </View>
      </View>
    </View>
  );
};

export default PayrollCardComponent;
