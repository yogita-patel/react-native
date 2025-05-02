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

const EmployeeListScreen = ({ navigation }) => {
  const [employeeList, setEmployeeList] = useState([]);
  // const [employeeList2, setEmployeeList2] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState("");

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
  useEffect(() => {
    getEmployee();
  }, [employeeList]);

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

  const NoDataComponent = () => (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text style={{ fontSize: 16, color: "gray" }}>No data found.</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.commonmarginHorizontol10}>
        <SearchFieldComponent
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search employees..."
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
            onDelete={() => console.log("delete")}
            onEdit={() => console.log("edit")}
            onView={() => console.log("View")}
            onMarkAttendace={() =>
              navigation.navigate("MarkEmployeeAttendance", {
                employee: item,
                title: "Mark Attendance",
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
    </View>
  );
};

export default EmployeeListScreen;
