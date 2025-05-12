import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import EmployeeListCardComponent from "../../Components/EmployeeListCardComponent";
import styles from "../../Styles/CommonStyle";
import { fetchList } from "../../Controller/FetchAPIs/coomonFetch";
import Constants from "../../Constants/Strings";
import { getLocalUser } from "../../Controller/global";
import { fetchDataByDoc } from "../../Controller/FetchAPIs/coomonFetch";
import { getEmployeeList } from "../../Controller/Employees/EmployeeController";
import SearchFieldComponent from "../../Components/SearchFieldComponent";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import NoDataComponent from "../../Components/NoDataComponent";
import ConfrimationDialog from "../../Components/ConfrimationDialog";
import LoaderComponent from "../../Components/LoaderComponent";
import { deleteEmployeeData } from "../../Controller/Employees/EmployeeController";

const EmployeeListScreen = ({ navigation }) => {
  const [employeeList, setEmployeeList] = useState([]);
  // const [employeeList2, setEmployeeList2] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [showConfDialog, setShowConDialog] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState({});
  const [isLoadinDialog, setIsLoadingDialog] = useState(false);

  const getEmployee = async () => {
    if (loading || !hasMore) return;

    // const user = await getLocalUser();
    // console.log("buissnessID-----", user.businessID);
    setLoading(true);
    try {
      const {
        list: employee,
        hasMore: more,
        lastDoc: newLastDoc,
      } = await getEmployeeList({ lastDoc: lastDoc });
      setEmployeeList(employee);
      setLastDoc(newLastDoc);
      setHasMore(more);
    } catch (e) {
      console.log("Failed to load users:", e);
    }
    setLoading(false);
  };
  // useEffect(() => {
  //   getEmployee();
  // }, [employeeList]);

  useFocusEffect(
    useCallback(() => {
      console.log("callback--------------");
      setEmployeeList([]); // optional: reset list before fetch
      setLastDoc(null);
      setHasMore(true);
      getEmployee();
      return () => {};
    }, [])
  );
  const onSearch = async () => {
    // setSearchText(text);
    // console.log("Changed text---------", text);
    if (searchText.length >= 2) {
      console.log("changed text----------", searchText);
      const {
        list: searchList,
        hasMore: m,
        lastDoc: doc,
      } = await getEmployeeList({
        lastDoc: null,
        searchText: searchText,
      });
      setEmployeeList(searchList);
      setLastDoc(doc);
      setHasMore(m);
      console.log("Searching....................", searchList);
    }
  };
  const onReset = async () => {
    setEmployeeList([]);
    setLastDoc(null);
    setHasMore(true);
    getEmployee();
    setSearchText("");
  };

  const setDeletRecord = async ({ emp }) => {
    setShowConDialog(true);
    setDeleteRecord(emp);
    console.log("delete employee---------", deleteRecord);
  };
  const deleteEmployee = async () => {
    try {
      setIsLoadingDialog(true);
      const isDeleted = await deleteEmployeeData({ employee: deleteRecord });
      if (isDeleted) {
        setEmployeeList([]);
        setLastDoc(null);
        setHasMore(true);
        getEmployee();
      }
    } catch (e) {
      console.log("Error: EmployeeListScreen.js deleteEmployee:", e);
    } finally {
      setIsLoadingDialog(false);
      setShowConDialog(false);
    }
  };

  const editEmployee = async () => {
    try {
    } catch (e) {
      console.log("Error: EmployeeListScreen.js editEmployee:", e);
    } finally {
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.commonmarginHorizontol10}>
        <SearchFieldComponent
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search employees by email"
          onSearch={onSearch}
          onclose={onReset}
        />
      </View>

      <FlatList
        data={employeeList}
        renderItem={({ item }) => (
          <EmployeeListCardComponent
            name={item.name || "N/A"}
            email={item.email || "N/A"}
            contact={item.contact || "N/A"}
            role={item.address || "N/A"}
            onDelete={() => setDeletRecord({ emp: item })}
            // isShowPerformance={
            //   item.roleID === Constants.employeesRoleID.manager ||
            //   item.roleID === Constants.employeesRoleID.buisnessAdmin ||
            //   item.roleID === Constants.employeesRoleID.buisnessOwner
            //     ? false
            //     : true
            // }
            onEdit={() =>
              navigation.navigate("CreateEmployee", {
                employeeData: item,
                title: "Edit Employee",
              })
            }
            onView={() => console.log("View")}
            onMarkAttendace={() =>
              navigation.navigate("MarkEmployeeAttendance", {
                employeeData: item,
                title: "Mark Attendance",
              })
            }
            onViewPerformance={() =>
              navigation.navigate("ViewEmployeePerformace", {
                employeeData: item,
                title: "View Performance",
              })
            }
            onSchedule={() =>
              navigation.navigate("EmployeeSchedule", {
                Scheduledata: item,
                title: "Schedule",
              })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={getEmployee}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={!loading ? <NoDataComponent /> : null}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" /> : null
        }
      />
      <LoaderComponent show={isLoadinDialog} />
      <ConfrimationDialog
        visible={showConfDialog}
        title="Delete"
        message="Are you sure do you want to delete the Employee?"
        onConfirm={() => deleteEmployee()}
        onCancel={() => setShowConDialog(false)}
      />
    </View>
  );
};

export default EmployeeListScreen;
