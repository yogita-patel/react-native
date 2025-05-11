import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import ButtonComponent from "../../Components/ButtonComponent";
import styles from "../../Styles/CommonStyle";
import SmallBUttonComponent from "../../Components/SmallButtonComponent";
import SmallDateTimepicker from "../../Components/SmallDateTimepicker";
import TimePickerComponent from "../../Components/TimePickerComponent";
import Constants from "../../Constants/Strings";
import { Checkbox } from "react-native-paper";
import LabelComponent from "../../Components/LabelComponent";
import Colors from "../../Constants/Colors";
import NoDataComponent from "../../Components/NoDataComponent";
import {
  completeAppointment,
  getAllAppointment,
} from "../../Controller/Citizen/AppointmentController";
import {
  getLocalUser,
  getTodayDateString,
  isToday,
} from "../../Controller/global";
import { dateStringFormat } from "../../Controller/global";
import { getStatusColor, isTodayOrFuture } from "../../Controller/global";
import DividerComponent from "../../Components/DividerComponent";
import ConfrimationDialog from "../../Components/ConfrimationDialog";
import LoaderComponent from "../../Components/LoaderComponent";
import { cancelAppointment } from "../../Controller/Citizen/AppointmentController";
const AllAppointmenList = () => {
  const statuses = [
    Constants.appointmentStatus.booked,
    Constants.appointmentStatus.completed,
    Constants.appointmentStatus.cancel,
  ];
  const [selectedDate, setselectedDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState(statuses);
  const [appointmentList, setAppointments] = useState([]);
  const [hospitalId, setHospitalId] = useState(null);
  const [user, setUser] = useState(null);
  const [datePickerKey, setDatePickerKey] = useState(0);
  const [isLoader, setIsLoader] = useState(false);
  const [showConfDialog, setShowConDialog] = useState(false);
  const [cancelAppointmentID, setCancelAppointmentId] = useState(null);
  const [slotID, setSlotID] = useState(null);
  const [isCancel, setIsCancel] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState("");

  const fetchAppointMent = async () => {
    try {
      let fetchDate;
      if (selectedDate) {
        fetchDate = getTodayDateString({ today: selectedDate });
      } else {
        fetchDate = getTodayDateString({ today: new Date() });
      }
      const user = await getLocalUser();
      setHospitalId(user.hospitalID);
      const {
        list: appointment,
        hasMore: more,
        lastDoc: newLastDoc,
      } = await getAllAppointment({
        date: fetchDate,
        hospitalID: user.hospitalID,
        lastDoc: lastDoc,
        status: selectedStatuses,
      });
      setAppointments(appointment);
      setLastDoc(newLastDoc);
      setHasMore(more);
      console.log("AllAppointmentdata===============", appointment);
    } catch (e) {
      console.log("Error in AllApointmentList.js fetchAppointMent", e);
    } finally {
    }
  };

  useEffect(() => {
    fetchAppointMent();
  }, []);
  const toggleStatus = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const applySearch = async () => {
    try {
      console.log("Search============");
      if (!selectedStatuses.length && !selectedDate) {
        Alert.alert("Missing Fields", "Please select status or date");
        return;
      }

      setAppointments([]);
      setLastDoc(null);
      setHasMore(true);
      setLoading(true);
      setIsSearch(true);

      let fetchDate = selectedDate
        ? getTodayDateString({ today: selectedDate })
        : getTodayDateString({ today: new Date() });

      let hID = hospitalId;
      if (!hID) {
        const user = await getLocalUser();
        hID = user.hospitalID;
        setHospitalId(hID); // Save it for future searches
      }

      const {
        list: searchList,
        hasMore: m,
        lastDoc: doc,
      } = await getAllAppointment({
        lastDoc: null,
        date: fetchDate,
        hospitalID: hID,
        status: selectedStatuses,
      });

      setAppointments(searchList);
      setLastDoc(doc);
      setHasMore(m);
      console.log("Searching....................", searchList);
    } catch (e) {
      console.log("Error: AllAppointmenList.js applySearch: ", e);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = async () => {
    try {
      setselectedDate(null); // Clear date
      setSelectedStatuses(statuses); // Reset to all statuses
      setAppointments([]); // Clear list
      setLastDoc(null); // Reset pagination
      setHasMore(true);
      setIsSearch(false); // Mark as not searching
      setLoading(true);
      setDatePickerKey((prev) => prev + 1);
      fetchAppointMent();
    } catch (e) {
      console.log("Error in resetSearch: ", e);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointmentBooking = async () => {
    try {
      setIsLoader(true);
      console.log(
        "cancelAppointmentID-----------------------------",
        cancelAppointmentID
      );
      if (cancelAppointmentID) {
        isCancel
          ? await cancelAppointment({
              appointmentId: cancelAppointmentID,
              slotId: slotID,
            })
          : await completeAppointment({
              appointmentId: cancelAppointmentID,
            });
      }
      setShowConDialog(false);
      setAppointments([]); // optional: reset list before fetch
      setLastDoc(false);
      setHasMore(true);
      setCancelAppointmentId(null);
      setSlotID(null);
      getAllAppointment();
    } catch (e) {
      console.log("Failed to cancelAppointmentBooking:", e);
    } finally {
      setIsLoader(false);
    }
  };
  const onChangeStatus = ({ ID, slot, isForcancel }) => {
    console.log("cancelID..................", ID, slot, isForcancel);
    setCancelAppointmentId(ID);
    setSlotID(slot);
    if (isForcancel) {
      setDialogTitle("Cancel");
      setDialogDescription("Are you sure do you want to cancel Appointment?");
    } else {
      setDialogTitle("Complete");
      setDialogDescription("Are you sure do you want to Complete Appointment?");
    }
    setIsCancel(isForcancel);
    setShowConDialog(true);
  };
  const renderItem = ({ item }) => {
    const canCancel =
      isTodayOrFuture(item.date) &&
      item.status === Constants.appointmentStatus.booked;
    const ccanComplete =
      isToday(item.date) && item.status === Constants.appointmentStatus.booked;
    // const canCancel = false;
    return (
      <View style={styles.card}>
        <Text style={styles.infoValue1}>Doctor: {item.doctorName}</Text>
        <Text style={styles.infoValue1}>Patient: {item.patientName}</Text>
        <Text style={styles.label}>Date: {dateStringFormat(item.date)}</Text>
        <Text style={styles.label}>Time: {item.startTime}</Text>
        <Text
          style={[
            styles.label,
            { color: getStatusColor(item.status), fontWeight: "bold" },
          ]}
        >
          Status: {item.status}
        </Text>
        <DividerComponent />
        <View style={[styles.content]}>
          {canCancel && (
            <SmallBUttonComponent
              onPress={() =>
                onChangeStatus({
                  ID: item.appointmentID,
                  slot: item.slotId,
                  isForcancel: true,
                })
              }
              label="Cancel"
              bgColor={Colors.commonRed}
            />
          )}
          <View style={styles.commonmarginHorizontol10} />
          {ccanComplete && (
            <SmallBUttonComponent
              onPress={() =>
                onChangeStatus({
                  ID: item.appointmentID,
                  slot: item.slotId,
                  isForcancel: false,
                })
              }
              label="Complete"
              bgColor={Colors.commonGreen}
            />
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.commonmarginHorizontol10, styles.card]}>
        <TimePickerComponent
          key={datePickerKey}
          label="Select Date"
          onConfirm={(date) => setselectedDate(date)}
          mode="date"
        />

        <LabelComponent label="Filter by status" />
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}
        >
          {statuses.map((status) => (
            <View
              key={status}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              <Checkbox
                color={Colors.primary}
                status={
                  selectedStatuses.includes(status) ? "checked" : "unchecked"
                }
                onPress={() => toggleStatus(status)}
              />
              <Text>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
            </View>
          ))}
        </View>
        {isSearch ? (
          <ButtonComponent
            onButtonPress={resetSearch}
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
      <FlatList
        data={appointmentList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={() => {
          if (hasMore && !loading) {
            fetchAppointMent();
          }
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={!loading ? <NoDataComponent /> : null}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" /> : null
        }
      />
      <LoaderComponent show={isLoader} />
      <ConfrimationDialog
        visible={showConfDialog}
        title={dialogTitle}
        message={dialogDescription}
        onConfirm={() => cancelAppointmentBooking()}
        onCancel={() => setShowConDialog(false)}
      />
    </View>
  );
};

export default AllAppointmenList;
