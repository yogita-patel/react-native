import Constants from "../../Constants/Strings";
import { db } from "../../Firebase/Firebase";
import { getRecordCount } from "../FetchAPIs/coomonFetch";
import moment from "moment";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
export const getTotalMedicalStaff = async ({ hospitalID }) => {
  try {
    // const user = await getLocalUser();
    // const buisnessID = user.businessID;
    // // console.log("BuisnessID======", user);
    const medicalStaff = await getRecordCount({
      collectionName: Constants.collectionName.medicalStaff,
      fieldName: "hospitalId",
      value: hospitalID,
      //   isDeleteCondition: true,
    });
    console.log("medicalStaff count---------======", medicalStaff);
    return medicalStaff;
  } catch (e) {
    console.log("Error: HomeScreenController.js getTotalMedicalStaff:", e);
    return 0;
  }
};

export const getTOdaysAppointmentCount = async ({ hospitalID }) => {
  try {
    const todayDate = moment().format("YYYY-MM-DD"); // or use your date format
    const appointmentsRef = collection(db, "appointment");

    const q = query(
      appointmentsRef,
      where("date", "==", todayDate),
      where("hospitalID", "==", hospitalID),
      where("status", "==", Constants.appointmentStatus.booked) // optional filter
    );
    const querySnapshot = await getDocs(q);
    console.log("Total today's appointments:", querySnapshot.size);
    return querySnapshot.size;
  } catch (e) {
    console.log("Error: HomeScreenController.js getTotalMedicalStaff:", e);
    return 0;
  }
};
