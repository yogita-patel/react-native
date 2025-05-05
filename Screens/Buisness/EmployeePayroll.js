import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import SmallDateTimepicker from "../../Components/SmallDateTimepicker";
import styles from "../../Styles/CommonStyle";
import MonthYearPickerModal from "../../Components/MonthYearPicker";
import ButtonComponent from "../../Components/ButtonComponent";
import PayrollCardComponent from "../../Components/PayrollCardComponent";
import { GeneratePayroll } from "../../Controller/Buisness/PayrollController";
import NoDataComponent from "../../Components/NoDataComponent";
import { getMonth } from "../../Controller/global";
const EmployeePayroll = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ month: 1, year: 2025 });
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [payrollList, setPayrollList] = useState([]);

  const generatAdminPayroll = async ({ month, year }) => {
    if (loading || !hasMore) return;

    // const user = await getLocalUser();
    // console.log("buissnessID-----", user.businessID);
    setLoading(true);
    try {
      // await GeneratePayroll({ lastDoc: lastDoc, month: month, year: year });
      const {
        list: payroll,
        hasMore: more,
        lastDoc: newLastDoc,
      } = await GeneratePayroll({ lastDoc: lastDoc, month: month, year: year });
      setPayrollList(payroll);
      setLastDoc(newLastDoc);
      setHasMore(more);
    } catch (e) {
      console.log("Error in EmployeePayroll.js generatAdminPayroll:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.commonmarginHorizontol10, styles.card]}>
        {/* <View style={[styles.searchDateContriner, styles.commonMarging10]}> */}
        <MonthYearPickerModal
          visible={showPicker}
          onCancel={() => setShowPicker(false)}
          onConfirm={(date) => {
            setSelectedDate(date);
            setShowPicker(false);
            console.log("date month,", date.month, date.year);
            // generatePayroll(date.month, date.year);
            generatAdminPayroll({ month: date.month, year: date.year });
          }}
        />
        <ButtonComponent
          onButtonPress={() => setShowPicker(true)}
          label="Select Month and Year"
          align="center"
          margin={0}
          width={330}
        />
        <Text>
          {" "}
          {selectedDate
            ? "Selected time period : " + getMonth(selectedDate.month)
            : "Please select time period"}
        </Text>
        {/* </View> */}
      </View>

      <FlatList
        data={payrollList}
        renderItem={({ item }) => (
          <PayrollCardComponent
            employeeName={item.name}
            deducation="0"
            payRate={item.payRate}
            totalPay={item.payrollAmount}
            workingHours={item.totalHours}
          />
        )}
        keyExtractor={(item) => item.employeeID}
        // onEndReached={() => {
        //   if (hasMore && !loading) {
        //     fetchAttendance(startDate, endDate, searchName, lastDoc);
        //   }
        // }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={!loading ? <NoDataComponent /> : null}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" /> : null
        }
      />
    </View>
  );
};

export default EmployeePayroll;
