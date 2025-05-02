import { EmployeeModel } from "../../Model/EmployeeModel";
import Constants from "../../Constants/Strings";
import { AddData } from "../AddAPIs/CommonAddAPI";
import { showToast } from "../../Components/ToastComponent";
import { addUserID } from "../UpdateAPIs/CommonUpdate";
import { db } from "../../Firebase/Firebase";
import { AttendanceModel } from "../../Model/AttendanceModel";
import { getLocalUser } from "../global";
import { checkAttendance } from "../UncommonAPIs/CheckDateEmployeeAttendanceExists";

export const markAttendance = async ({ values, employeeID, buisnessID }) => {
  try {
    console.log("onCreateBuisness:", values);
    const exist = await checkAttendance({
      attendanceDate: values.attendanceDate,
      employeeID: employeeID,
    });
    console.log("is attendance exists or not :- ", exist);
    if (exist) {
      let checkin = new Date(values.checkin);
      let checkout = new Date(values.checkout);
      // If checkout is earlier than checkin, add 1 day
      if (checkout <= checkin) {
        checkout.setDate(checkout.getDate() + 1);
      }
      const user = await getLocalUser();
      const userID = user.userID;
      console.log(
        "businessId in mark attensance controller---------------------------------------",
        buisnessID
      );
      const hours = (checkout - checkin) / (1000 * 60 * 60);
      console.log("hours worked---------", hours);
      const totalHours = hours - values.break;
      //   con;
      var attendance = new AttendanceModel({
        employeeID: employeeID,
        buisnessID: buisnessID,
        checkIn: values.checkin,
        checkOut: values.checkout,
        breakTime: values.break,
        attendanceDate: values.attendanceDate,
        createdBy: userID,
        hoursWorked: totalHours,
      });
      console.log("attendance data------------", attendance);
      const EdocRef = await AddData({
        collectionName: Constants.collectionName.attendance,
        modelName: attendance.toJson(),
      });
      var doc;
      if (EdocRef) {
        //add document id to the document itself
        doc = await addUserID({
          docRef: EdocRef,
          EditData: { attendanceID: EdocRef.id },
        });
      }
      if (doc) {
        showToast({
          description: "Employee Attendence Marked successfully!",
          message: "Success",
        });
        return true;
      } else {
        showToast({
          description: "Fail to mark attendance please try again later!",
          message: "Error",
          type: "error",
        });
        return false;
      }
    } else {
      showToast({
        description: "Attendance already marked!",
        message: "Error",
        type: "error",
      });
      return false;
    }
  } catch (e) {
    console.log("Error: AttendanceController.js markAttendance:", e);
    return false;
  }
};
