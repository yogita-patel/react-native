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

const EmployeeListScreen = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getEmployee = async () => {
    if (loading || !hasMore) return;

    const user = await getLocalUser();
    console.log("buissnessID-----", user.businessID);
    setLoading(true);
    try {
      const {
        employeeList: employee,
        lastDoc: newLastDoc,
        hasMore: more,
      } = await fetchList({
        lastDoc: lastDoc,
        collectionName: Constants.collectionName.employee,
        filters: [
          { field: "businessID", operator: "==", value: user.businessID },
        ],
      });

      setEmployeeList((prev) => [...prev, ...(employee || [])]);
      setLastDoc(newLastDoc);
      setHasMore(more);
    } catch (e) {
      console.log("Failed to load users:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const employeeComponent = ({ e }) => (
    <EmployeeListCardComponent
      name={e.name}
      email={e.payRate}
      contact={e.contact}
      role={e.role}
    />
  );

  const NoDataComponent = () => (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text style={{ fontSize: 16, color: "gray" }}>No data found.</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={employeeList}
        renderItem={employeeComponent}
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
