import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import Constants from "../../Constants/Strings";
import AppointmentModel from "../../Model/AppointmentModel";
import { addUserID } from "../UpdateAPIs/CommonUpdate";
import { AddData } from "../AddAPIs/CommonAddAPI";
import { showToast } from "../../Components/ToastComponent";
import { doc, getDoc } from "firebase/firestore";
import { fetchList } from "../FetchAPIs/coomonFetch";
import { useReducer } from "react";

export const getTimeSlotsByDoc = async ({ doctorId, selectedDate }) => {
  try {
    // const filterData = [
    //   ["doctorId", "==", doctorId],
    //   ["shiftDate", "==", selectedDate],
    //   ["isBooked", "==", false],
    // ];

    // console.log("FilterData-------------------------", filterData);
    // const slotsList = await fetchUsingMultipleCondition({
    //   collectionName: Constants.collectionName.slots,
    //   condition: filterData,
    // });
    // if (slotsList) {
    //   return slotsList;
    // }
    // return null;
    const slotsRef = collection(db, Constants.collectionName.slots);
    const q = query(
      slotsRef,
      where("doctorId", "==", doctorId),
      where("shiftDate", "==", selectedDate),
      where("isBooked", "==", false)
    );

    const querySnapshot = await getDocs(q);
    const slotsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Filtered slots:", slotsList);
    const sortedSlots = slotsList.sort((a, b) => {
      const [aHours, aMinutes] = a.startTime.split(":").map(Number);
      const [bHours, bMinutes] = b.startTime.split(":").map(Number);

      const aTotalMinutes = aHours * 60 + aMinutes;
      const bTotalMinutes = bHours * 60 + bMinutes;

      return aTotalMinutes - bTotalMinutes;
    });
    return sortedSlots;
  } catch (e) {
    console.log("Error: AppointmentController.js getTimeSlots:", e);
    return null;
  }
};

export const bookAnAppointment = async ({
  slotId,
  doctorId,
  date,
  startTime,
  patientId,
  hospitalID,
}) => {
  try {
    // console.log("userId", buisnessID);
    var appointment = new AppointmentModel({
      slotId: slotId,
      doctorId: doctorId,
      patientId: patientId,
      date: date,
      startTime: startTime,
      status: Constants.appointmentStatus.booked,
      hospitalID: hospitalID,
    });
    console.log("appointment", appointment);
    const EdocRef = await AddData({
      collectionName: Constants.collectionName.appointment,
      modelName: appointment.toJson(),
    });
    var docc;
    if (EdocRef) {
      //add document id to the document itself
      docc = await addUserID({
        docRef: EdocRef,
        EditData: { appointmentID: EdocRef.id },
      });
    }
    console.log("Slot ID for update:", slotId);
    // update the slot to mark it booked
    await updateDoc(doc(db, Constants.collectionName.slots, slotId), {
      isBooked: true,
    });
    showToast({
      description: "Appointment booked successfully!",
      message: "Success",
    });
    console.log("Appointment created successfully.");
    return true;
  } catch (error) {
    console.error("Error booking appointment:", error);
    showToast({
      description: "Appointment book fail!",
      message: "Error",
      type: "error",
    });
    return false;
  }
};

export const getUsersAppointment = async ({ userID, lastDoc }) => {
  try {
    console.log("userID---------", userID, lastDoc);

    const appointmentLit = await fetchList({
      lastDoc,
      collectionName: Constants.collectionName.appointment,
      isDeleteFalse: true,
      filters: [{ field: "patientId", operator: "==", value: userID }],
    });

    console.log("appointmentList--------------------", appointmentLit);

    const enhancedAppointments = await Promise.all(
      appointmentLit.list.map(async (appointment) => {
        if (!appointment.doctorId) return appointment;

        // Get doctor from medicalStaff collection
        const staffRef = doc(
          db,
          Constants.collectionName.medicalStaff,
          appointment.doctorId
        );
        const staffSnap = await getDoc(staffRef);

        if (staffSnap.exists()) {
          const staffData = staffSnap.data();
          const userId = staffData.userID;

          // Get user name from users collection using userId
          if (userId) {
            const userRef = doc(db, Constants.collectionName.user, userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
              const userData = userSnap.data();
              return {
                ...appointment,
                doctorName: userData.fullName || "",
              };
            }
          }
        }

        return appointment;
      })
    );

    console.log("enhancedAppointments...............", enhancedAppointments);

    return {
      list: enhancedAppointments,
      lastDoc: appointmentLit.lastDoc,
      hasMore: appointmentLit.hasMore,
    };
  } catch (e) {
    console.log("Error: AppointmentController.js getUsersAppointment:", e);
    return null;
  }
};

export const cancelAppointment = async ({ appointmentId }) => {
  try {
    const appointmentRef = doc(
      db,
      Constants.collectionName.appointment,
      appointmentId
    );
    // await updateDoc(appointmentRef, {
    //   // Optional: for tracking
    // });
    const upadated = addUserID({
      docRef: appointmentRef,
      EditData: {
        status: Constants.appointmentStatus.cancel,
        cancelledAt: new Date(),
      },
    });
    console.log("Appointment marked as cancelled.");
    showToast({
      description: "Appointment cancelled!",
      message: "Success",
    });
    return upadated;
  } catch (error) {
    console.error("Error updating appointment status:", error);
    showToast({
      description: "Appointment cancelation fail!",
      message: "Error",
      type: "error",
    });
    return false;
  }
};
