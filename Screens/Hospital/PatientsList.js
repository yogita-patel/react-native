import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useCallback } from "react";
import SearchFieldComponent from "../../Components/SearchFieldComponent";
import PatientCard from "../../Components/PatientCard";
import styles from "../../Styles/CommonStyle";
import { getPatients } from "../../Controller/Hospital/PatientsController";
import { useFocusEffect } from "@react-navigation/native";
import { getLocalUser } from "../../Controller/global";
import NoDataComponent from "../../Components/NoDataComponent";

const PatientsList = ({ navigation }) => {
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [patientList, setPatientList] = useState([]);
  const getPatientsList = async () => {
    try {
      setLoading(true);
      const user = await getLocalUser();
      console.log("buissnessID-----", user.hospitalID);

      const patient = await getPatients({ hospitalId: user.hospitalID });
      setPatientList(patient);
      console.log("patient--------------------", patient);
    } catch (e) {
      console.log("Failed to getPatientsList:", e);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      console.log("callback--------------");
      setPatientList([]);
      getPatientsList();
      return () => {};
    }, [])
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.commonmarginHorizontol10}>
        {/* <SearchFieldComponent
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search Patients..."
          // onSearch={onSearch}
          // onclose={onReset}
        /> */}
      </View>

      <FlatList
        data={patientList}
        renderItem={({ item }) => (
          <PatientCard
            item={item}
            onHistory={() =>
              navigation.navigate("AppointmentList", {
                patient: item,
                isHistory: true,
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
    </View>
  );
};

export default PatientsList;
