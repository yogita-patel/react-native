import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import styles from "../../Styles/CommonStyle";
import SearchFieldComponent from "../../Components/SearchFieldComponent";
import LoaderComponent from "../../Components/LoaderComponent";
import ConfrimationDialog from "../../Components/ConfrimationDialog";
import MedicalStaffCard from "../../Components/MedicalStaffCard";
import NoDataComponent from "../../Components/NoDataComponent";

const MedicalStaffListScreen = ({ navigation }) => {
  const [medicalStaffList, setMedicalStaffList] = useState([]);

  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadinDialog, setIsLoadingDialog] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showConfDialog, setShowConDialog] = useState(false);

  const onSearch = async () => {
    // // setSearchText(text);
    // // console.log("Changed text---------", text);
    // if (searchText.length >= 2) {
    //   console.log("changed text----------", searchText);
    //   const {
    //     list: searchList,
    //     hasMore: m,
    //     lastDoc: doc,
    //   } = await getEmployeeList({
    //     lastDoc: null,
    //     searchText: searchText,
    //   });
    //   setEmployeeList(searchList);
    //   setLastDoc(doc);
    //   setHasMore(m);
    //   console.log("Searching....................", searchList);
    // }
  };

  const onReset = async () => {
    // setEmployeeList([]);
    // setLastDoc(null);
    // setHasMore(true);
    // getEmployee();
    setSearchText("");
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
      <MedicalStaffCard
        name={"item.name"}
        email={"item.email" || "N/A"}
        contact={"item.contact" || "N/A"}
        role={"item.address " || "N/A"}
        onDelete={() => setDeletRecord({ emp: item })}
        onEdit={() =>
          navigation.navigate("CreateEmployee", {
            employeeData: item,
            title: "Edit Employee",
          })
        }
        onView={() => console.log("View")}
        onSchedule={() =>
          navigation.navigate("EmployeeSchedule", {
            Scheduledata: item,
            title: "Schedule",
          })
        }
      />
      <FlatList
        data={medicalStaffList}
        renderItem={({ item }) => (
          <MedicalStaffCard
            name={item.name || "N/A"}
            email={item.email || "N/A"}
            contact={item.contact || "N/A"}
            role={item.address || "N/A"}
            onDelete={() => setDeletRecord({ emp: item })}
            onEdit={() =>
              navigation.navigate("CreateEmployee", {
                employeeData: item,
                title: "Edit Employee",
              })
            }
            onView={() => console.log("View")}
            onSchedule={() =>
              navigation.navigate("EmployeeSchedule", {
                Scheduledata: item,
                title: "Schedule",
              })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        // onEndReached={getEmployee}
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

export default MedicalStaffListScreen;
