import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../../Firebase/Firebase";
import Strings from "../../Constants/Strings";
//--------------------------- check employee attendace -------------------
export const checkAttendance = async ({ employeeID, attendanceDate }) => {
  try {
    //   const querySnapshot = await getDocs(collection(db, Strings.collectionName.attendance));
    //   const items = [];
    console.log(
      "collectionName--------",
      Strings.collectionName.attendance,
      employeeID,
      attendanceDate
    );
    const startOfDay = new Date(attendanceDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(attendanceDate);
    endOfDay.setHours(23, 59, 59, 999);
    const q = query(
      collection(db, Strings.collectionName.attendance),
      where("employeeID", "==", employeeID),
      where("attendanceDate", ">=", startOfDay),
      where("attendanceDate", "<=", endOfDay)
    );

    const snapshot = await getDocs(q);
    const items = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
      //   console.log("docs data------------------", doc.id);
    });
    // console.log("snapshot-", snapshot);
    console.log("Item list", items.length);
    return items.length > 0 ? false : true;
    // console.log("snapshot-", snapshot);
    // return !snapshot.empty; // return true if attendance exists
  } catch (error) {
    console.error(
      "Error: checkDateEmployeeAttendanceExists.js checkAttendance:",
      error
    );
    throw error;
  }
};
