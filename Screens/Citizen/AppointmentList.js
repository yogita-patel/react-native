import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import styles from "../../Styles/CommonStyle";
import Colors from "../../Constants/Colors";
import DividerComponent from "../../Components/DividerComponent";
import SmallBUttonComponent from "../../Components/SmallButtonComponent";
import Constants from "../../Constants/Strings";
import NoDataComponent from "../../Components/NoDataComponent";
import ConfrimationDialog from "../../Components/ConfrimationDialog";
import LoaderComponent from "../../Components/LoaderComponent";
import { useFocusEffect } from "@react-navigation/native";
import {
  cancelAppointment,
  getUsersAppointment,
} from "../../Controller/Citizen/AppointmentController";
import {
  dateStringFormat,
  getLocalUser,
  isTodayOrFuture,
  getStatusColor,
} from "../../Controller/global";
import EmailModel from "../../Components/EmailModel";
import { sendEmail } from "../../Controller/Hospital/FollowupCOntroller";
const AppointmentList = ({ navigation, route }) => {
  const [appointments, setAppointments] = useState([]);
  const [lastDoc, setLastDoc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoader, setIsLoader] = useState(false);
  const [showConfDialog, setShowConDialog] = useState(false);
  const [cancelAppointmentID, setCancelAppointmentId] = useState(null);
  const [slotID, setSlotID] = useState(null);
  const routeData = useState(route.params);
  const [isHistory, setHisHistory] = useState(false);
  const [patient, setPatient] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  useEffect(() => {
    try {
      console.log("routeData-------------------", routeData);
      if (routeData && routeData[0].isHistory) {
        setHisHistory(true);
        console.log("-------------------------isHistory", isHistory);
        setPatient(routeData[0].patient);
        getAppointment();
      }
    } catch (e) {
      console.log("Error in AppointmentList.js useEffect");
    } finally {
    }
  }, [routeData, isHistory]);
  const getAppointment = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      let userId;
      console.log("-------------------------isHistory2", isHistory);
      if (isHistory) {
        userId = patient.userID;
      } else {
        const user = await getLocalUser();
        userId = user.userID;
      }

      // console.log("buissnessID-----", user.userID);
      if (userId) {
        const {
          list: appointment,
          hasMore: more,
          lastDoc: newLastDoc,
        } = await getUsersAppointment({
          lastDoc: lastDoc,
          userID: userId,
          isHistory: isHistory,
        });
        setAppointments(appointment);
        setLastDoc(newLastDoc);
        setHasMore(more);
        console.log("Appointmentdata===============", appointment);
      }
    } catch (e) {
      console.log("Failed to getAppointment:", e);
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
      if (cancelAppointmentID)
        await cancelAppointment({
          appointmentId: cancelAppointmentID,
          slotId: slotID,
        });
      setShowConDialog(false);
      setAppointments([]); // optional: reset list before fetch
      setLastDoc(false);
      setHasMore(true);
      setCancelAppointmentId(null);
      setSlotID(null);
      getAppointment();
    } catch (e) {
      console.log("Failed to cancelAppointmentBooking:", e);
    } finally {
      setIsLoader(false);
    }
  };
  const onCancel = ({ ID, slot }) => {
    console.log("cancelID..................", ID, slot);
    setCancelAppointmentId(ID);
    setSlotID(slot);
    setShowConDialog(true);
  };
  useFocusEffect(
    useCallback(() => {
      console.log("useFocusEffect appointmentScreen--------------");
      setAppointments([]); // optional: reset list before fetch
      setLastDoc(false);
      setHasMore(true);
      setCancelAppointmentId(null);
      getAppointment();
      return () => {};
    }, [])
  );

  const openModal = ({ patient }) => {
    // setSelectedPatient(patient);
    setSelectedEmail(patient.email);
    setIsModalVisible(true);
  };
  // const closeModel = () => {
  //   // setSelectedPatient(patient);
  //   setModalVisible(false);
  // };
  const handleSendEmail = async ({ to, subject, message }) => {
    setIsModalVisible(false);
    sendEmail({ message: message, subject: subject, to: to });
    console.log("Sending email to", to, subject, message);
  };
  const renderItem = ({ item }) => {
    const canCancel =
      isTodayOrFuture(item.date) &&
      item.status === Constants.appointmentStatus.booked;
    return (
      <View style={styles.card}>
        <Text style={styles.infoValue1}>Doctor: {item.doctorName}</Text>
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
        {canCancel && (
          <SmallBUttonComponent
            onPress={() =>
              onCancel({ ID: item.appointmentID, slot: item.slotId })
            }
            label="Cancel"
            bgColor={Colors.commonRed}
          />
        )}
        {isHistory && (
          <SmallBUttonComponent
            onPress={() => openModal({ patient: item })}
            label="Follow up"
            bgColor={Colors.commonRed}
          />
        )}
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={getAppointment}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={!loading ? <NoDataComponent /> : null}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" /> : null
        }
      />
      <EmailModel
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSend={handleSendEmail}
        defaultEmail={selectedEmail}
      />
      {/* <LoaderComponent show={isLoader} /> */}
      <ConfrimationDialog
        visible={showConfDialog}
        title="Cancel"
        message="Are you sure do you want to cancel Appointment?"
        onConfirm={() => cancelAppointmentBooking()}
        onCancel={() => setShowConDialog(false)}
      />
    </View>
  );
};

export default AppointmentList;
