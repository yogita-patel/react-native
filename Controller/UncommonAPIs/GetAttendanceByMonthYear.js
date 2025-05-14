import { db } from "../../Firebase/Firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  documentId,
  startAfter,
  limit,
} from "firebase/firestore";
import Constants from "../../Constants/Strings";
//------------------ get employee wise attendance------------------------
export const GetAttendanceByEmployee = async ({
  employeeID,
  startOfMonth,
  endOfMonth,
}) => {
  try {
    console.log(
      "GetAttendanceByEmployee----------------",
      startOfMonth,
      endOfMonth
    );
    const q = query(
      collection(db, Constants.collectionName.attendance),
      where("employeeID", "==", employeeID),
      where("attendanceDate", ">=", startOfMonth),
      where("attendanceDate", "<=", endOfMonth)
    );
    console.log("Query-------------", q);

    const attendanceSnapshot = await getDocs(q);
    // console.log("Attendace snap---------------", attendanceSnapshot);
    const dataMap = {};
    attendanceSnapshot.forEach((doc) => {
      dataMap[doc.id] = doc.data();
    });
    console.log("dataMap-----", dataMap);
    return dataMap;
  } catch (error) {
    console.error(
      "Error: GetAttendanceByMonthYear.js GetAttendanceByEmployee:",
      error
    );
    throw error;
  }
};
