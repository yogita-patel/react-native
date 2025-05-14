import { EmployeeModel } from "../../Model/EmployeeModel";
import Constants from "../../Constants/Strings";
import { AddData } from "../AddAPIs/CommonAddAPI";
import { showToast } from "../../Components/ToastComponent";
import { addUserID } from "../UpdateAPIs/CommonUpdate";
import { db } from "../../Firebase/Firebase";
import { AttendanceModel } from "../../Model/AttendanceModel";
import { getLocalUser } from "../global";
import { checkAttendance } from "../UncommonAPIs/CheckDateEmployeeAttendanceExists";
import { fetchByCondition, fetchList } from "../FetchAPIs/coomonFetch";
import { SearchUserIDs } from "../UncommonAPIs/GetEmployeeIDByName";
import { fetchDataByDoc } from "../FetchAPIs/coomonFetch";

//---------------------------- mark employee's attendance---------------------------
export const markAttendance = async ({
  values,
  employeeID,
  buisnessID,
  employeeUSerID,
}) => {
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
      // const onlyDate = values.attendanceDate.setHours(0, 0, 0, 0);
      const onlyDate = new Date(values.attendanceDate);
      onlyDate.setHours(0, 0, 0, 0); // 00:00:00

      var attendance = new AttendanceModel({
        employeeID: employeeID,
        buisnessID: buisnessID,
        checkIn: values.checkin,
        status: values.status,
        checkOut: values.checkout,
        breakTime: values.break,
        attendanceDate: onlyDate,
        createdBy: userID,
        hoursWorked: totalHours,
        userID: employeeUSerID,
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

//--------------------------- get employee's attendance list ------------------------
export const getAttendanceList = async ({
  lastDoc = null,
  searchText = null,
  startDate = null,
  endDate = null,
}) => {
  try {
    const user = await getLocalUser();
    console.log("buissnessID-----", user.businessID);
    var searchFName;
    var attendanceList;
    const filterData = [
      { field: "buisnessID", operator: "==", value: user.businessID },
      { field: "attendanceDate", operator: ">=", value: startDate },
      { field: "attendanceDate", operator: "<=", value: endDate },
    ];
    if (searchText) {
      searchFName = await SearchUserIDs({
        collectionName: Constants.collectionName.user,
        condition: "fullName",
        value: searchText,
      });
      console.log("Search-userName-------------", searchFName[0]);
      filterData.push({
        field: "userID",
        operator: "in",
        value: [searchFName[0].userID],
      });
    }
    console.log("FilterData-------------------------", filterData);
    attendanceList = await fetchList({
      lastDoc: lastDoc,
      collectionName: Constants.collectionName.attendance,
      filters: filterData,
    });
    // if (searchFName) {
    //   attendanceList = await fetchList({
    //     lastDoc: lastDoc,
    //     collectionName: Constants.collectionName.attendance,
    //     filters: [
    //       { field: "businessID", operator: "==", value: user.businessID },
    //       { field: "userID", operator: "==", value: searchFName[0].userID },
    //     ],
    //   });
    // } else {
    //   attendanceList = await fetchList({
    //     lastDoc: lastDoc,
    //     collectionName: Constants.collectionName.employee,
    //     filters: [
    //       { field: "businessID", operator: "==", value: user.businessID },
    //       //  searchFName? { field: "userID", operator: "in", value: user.businessID }:null,
    //     ],
    //   });
    // }

    if (attendanceList) {
      console.log("attendanceList:-----", attendanceList);
      const userIDs = attendanceList.list.map((e) => e.userID);
      console.log("userIDs:-----", userIDs);

      var userData;
      if (userIDs.length > 0) {
        userData = await fetchDataByDoc({
          collectionName: Constants.collectionName.user,
          IDs: userIDs,
        });
      }
      // console.log("UserData", userData);
      var attendanceList2;
      attendanceList2 = attendanceList.list.map((attendance) => ({
        ...attendance,
        name: userData[attendance.userID]?.fullName || "Unknown",
        email: userData[attendance.userID]?.email || "Unknown",
      }));

      console.log(
        "attendanceList2:-------------------------------- ",
        attendanceList2
      );
      return {
        list: attendanceList2,
        lastDoc: attendanceList.lastDoc,
        hasMore: attendanceList.hasMore,
      };
    }
    return null;
  } catch (e) {
    console.log("Error: AttendanceController.js getAttendanceList:", e);
    return null;
  }
};
