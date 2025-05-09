import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import DoctorListCard from "../../Components/DoctorListCard";
import { useFocusEffect } from "@react-navigation/native";
import NoDataComponent from "../../Components/NoDataComponent";
import { getMedicalStaffList } from "../../Controller/Hospital/MedicalStaffController";

const DoctorListScreen = ({ navigation, route }) => {
  const [docList, setDocList] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [hospitalID, setHospitalID] = useState(null);

  useEffect(() => {
    const hospitalData = route.params?.hospitalData;
    if (hospitalData?.buisnessID) {
      setHospitalID(hospitalData.buisnessID);
    }
  }, []);

  const getDoctorList = async () => {
    try {
      if (loading || !hasMore || !hospitalID) return;

      setLoading(true);

      const {
        list: docList1,
        hasMore: more,
        lastDoc: newLastDoc,
      } = await getMedicalStaffList({
        lastDoc,
        hospitalId: hospitalID,
      });

      setDocList(docList1);
      setLastDoc(newLastDoc);
      setHasMore(more);
    } catch (e) {
      console.log("Failed to getDoctorList:", e);
    }

    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      setDocList([]);
      setLastDoc(null);
      setHasMore(true);
      getDoctorList();
    }, [navigation, hospitalID])
  );

  return (
    <View>
      <FlatList
        data={docList}
        renderItem={({ item }) => (
          <DoctorListCard
            item={item}
            onViewSlots={() =>
              navigation.navigate("BookAppointmentScreen", {
                docData: item,
                title: `${item.name}\'s Availability`,
              })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={getDoctorList}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={!loading ? <NoDataComponent /> : null}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" /> : null
        }
      />
    </View>
  );
};

export default DoctorListScreen;
