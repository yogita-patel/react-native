import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import styles from "../../Styles/CommonStyle";
import SearchFieldComponent from "../../Components/SearchFieldComponent";
import LoaderComponent from "../../Components/LoaderComponent";
import ConfrimationDialog from "../../Components/ConfrimationDialog";
import MedicalStaffCard from "../../Components/MedicalStaffCard";
import NoDataComponent from "../../Components/NoDataComponent";
import {
  deleteMedicalStaffData,
  getMedicalStaffList,
} from "../../Controller/Hospital/MedicalStaffController";
import { useFocusEffect } from "@react-navigation/native";
const MedicalStaffListScreen = ({ navigation }) => {
  const [medicalStaffList, setMedicalStaffList] = useState([]);
  const [deleteRecord, setDeleteRecord] = useState({});
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadinDialog, setIsLoadingDialog] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showConfDialog, setShowConDialog] = useState(false);

  useEffect(() => {
    getMedicalStaff();
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log("callback--------------");
      setMedicalStaffList([]); // optional: reset list before fetch
      setLastDoc(null);
      setHasMore(true);
      getMedicalStaff();
      return () => {};
    }, [])
  );
  const getMedicalStaff = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const {
        list: medicalStaff,
        hasMore: more,
        lastDoc: newLastDoc,
      } = await getMedicalStaffList({
        lastDoc: lastDoc,
      });
      setMedicalStaffList(medicalStaff);
      setLastDoc(newLastDoc);
      setHasMore(more);
    } catch (e) {
      console.log("Error: MedicalStaffListSCreen.js getMedicalStaff:", e);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = async () => {
    try {
      if (searchText.length >= 2) {
        console.log("changed text----------", searchText);
        const {
          list: searchList,
          hasMore: m,
          lastDoc: doc,
        } = await getMedicalStaffList({
          lastDoc: null,
          searchText: searchText,
        });
        setMedicalStaffList(searchList);
        setLastDoc(doc);
        setHasMore(m);
        console.log("Searching....................", searchList);
      }
    } catch (e) {
      console.log("Error in MedicalStaffListScreen.js onSearch", e);
    } finally {
    }
  };

  const onReset = async () => {
    try {
      setMedicalStaffList([]);
      setLastDoc(null);
      setHasMore(true);
      getMedicalStaff();
      setSearchText("");
    } catch (e) {
      console.log("Error in MedicalSTaffListScreen.js onReset");
    } finally {
    }
  };

  const setDeletRecord = async ({ emp }) => {
    try {
      setShowConDialog(true);
      setDeleteRecord(emp);
      console.log("delete employee---------", deleteRecord);
    } catch (e) {
      console.log("Error in MedicalStaffListScreen.js setDeletRecord");
    } finally {
    }
  };

  const deletMedicalStaff = async () => {
    try {
      setIsLoadingDialog(true);
      const isDeleted = await deleteMedicalStaffData({
        medicalStaff: deleteRecord,
      });
      if (isDeleted) {
        setMedicalStaffList([]);
        setLastDoc(null);
        setHasMore(true);
        getMedicalStaff();
      }
      setIsLoadingDialog(false);
    } catch (e) {
      console.log("Error: MedicalStaffListScreen.js deletMedicalStaff:", e);
      setIsLoadingDialog(false);
    } finally {
      // setIsLoadingDialog(false);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.commonmarginHorizontol10}>
        <SearchFieldComponent
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search employees by name"
          onSearch={onSearch}
          onclose={onReset}
        />
      </View>
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
              navigation.navigate("CreateMedicalStaff", {
                medicalStaffData: item,
                title: "Edit Medical Staff",
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
        onEndReached={getMedicalStaff}
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
        message="Are you sure do you want to delete the MedicalStaff?"
        onConfirm={() => deletMedicalStaff()}
        onCancel={() => setShowConDialog(false)}
      />
    </View>
  );
};

export default MedicalStaffListScreen;
