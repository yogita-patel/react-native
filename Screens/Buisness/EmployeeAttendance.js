import {
  View,
  Text,
  TouchableOpacity,
  Button,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import SearchFieldComponent from "../../Components/SearchFieldComponent";
import styles from "../../Styles/CommonStyle";
import SmallBUttonComponent from "../../Components/SmallButtonComponent";
import TimePickerComponent from "../../Components/TimePickerComponent";
import Constants from "../../Constants/Strings";
import SmallDateTimepicker from "../../Components/SmallDateTimepicker";
import ButtonComponent from "../../Components/ButtonComponent";
import Colors from "../../Constants/Colors";
import AttendanceCardComponent from "../../Components/AttendanceCardComponent";
import { Alert } from "react-native";
import { getAttendanceList } from "../../Controller/Employees/AttendanceController";
import { formatDate, formatTime } from "../../Controller/global";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const EmployeeAttendance = () => {
  const [searchText, setSearchText] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isSearch, setIsSearch] = useState(false);

  const getAttendance = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const {
        list: attendance,
        hasMore: more,
        lastDoc: newLastDoc,
      } = await getAttendanceList({
        lastDoc: lastDoc,
        endDate: today,
        startDate: today,
      });
      setAttendanceList(attendance);
      setLastDoc(newLastDoc);
      setHasMore(more);
    } catch (e) {
      console.log("Error: EmployeeAttendance.js getAttendance:", e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAttendance();
  }, [attendanceList]);

  useFocusEffect(
    useCallback(() => {
      console.log("callback--------------");
      setAttendanceList([]); // optional: reset list before fetch
      setLastDoc(null);
      setHasMore(true);
      getAttendance();
      return () => {};
    }, [])
  );

  const applySearch = async () => {
    try {
      console.log("Search============");
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (!searchText && !startDate && !endDate) {
        Alert.alert(
          "Missing Fields",
          "Please enter a name or select a date to search."
        );
        return;
      } else {
        setAttendanceList([]);
        setLastDoc(null);
        setHasMore(true);
        setLoading(true);
        setIsSearch(true);
        const {
          list: searchList,
          hasMore: m,
          lastDoc: doc,
        } = await getAttendanceList({
          lastDoc: null,
          searchText: searchText,
          endDate: !endDate ? today : endDate,
          startDate: !startDate ? today : startDate,
        });
        setAttendanceList(searchList);
        setLastDoc(doc);
        setHasMore(m);
        console.log("Searching....................", searchList);
      }
    } catch (e) {
      console.log("Error: EmployeeAttendace.js applySearch: ", e);
    } finally {
      setLoading(false);
    }
  };

  const restSearch = async () => {
    try {
      console.log("research============");
      setAttendanceList([]);
      setLastDoc(null);
      setHasMore(true);
      setIsSearch(false);
      setEndDate(null);
      setStartDate(null);
      setSearchText("");
      getAttendance();
    } catch (e) {
      console.log("Error: EmployeeAttendace.js restSearch: ", e);
    } finally {
      setLoading(false);
    }
  };
  const NoDataComponent = () => (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text style={{ fontSize: 16, color: "gray" }}>No data found.</Text>
    </View>
  );

  const resetSearchField = async () => {
    try {
      console.log("resetSearchField============");
      setSearchText("");
    } catch (e) {
      console.log("Error: EmployeeAttendace.js restSearch: ", e);
    } finally {
      // setLoading(false);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.commonmarginHorizontol10, styles.card]}>
        <SearchFieldComponent
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search employees..."
          onclose={resetSearchField}
        />
        <View style={[styles.searchDateContriner, styles.commonMarging10]}>
          <SmallDateTimepicker
            label={"Start Date"}
            onConfirm={(date) => setStartDate(date)}
            mode="date"
            selectedTime={startDate}
          />

          <SmallDateTimepicker
            label={"End Date"}
            onConfirm={(date) => setEndDate(date)}
            mode="date"
            selectedTime={endDate}
          />
        </View>
        {isSearch ? (
          <ButtonComponent
            onButtonPress={restSearch}
            label="Reset"
            margin={0}
            width={"300"}
          ></ButtonComponent>
        ) : (
          <ButtonComponent
            onButtonPress={applySearch}
            label="Search"
            margin={0}
            width={"300"}
          ></ButtonComponent>
        )}
      </View>

      <Text
        style={[styles.commonmarginHorizontol10, { color: Colors.commonGrey }]}
      >
        {attendanceList.length} Records found
      </Text>
      <FlatList
        data={attendanceList}
        renderItem={({ item }) => (
          <AttendanceCardComponent
            breakhours={item.breakTime}
            checkIn={formatTime(item.checkIn.toDate())}
            checkOut={formatTime(item.checkOut.toDate())}
            date={formatDate(item.attendanceDate.toDate())}
            employeeName={item.name}
            status={item.status}
            workingHours={item.hoursWorked}
          />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={() => {
          // if (hasMore && !loading) {
          //   fetchAttendance(startDate, endDate, searchName, lastDoc);
          // }
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={!loading ? <NoDataComponent /> : null}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" /> : null
        }
      />
    </View>
  );
};

export default EmployeeAttendance;
