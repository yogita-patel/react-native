import Constants from "../../Constants/Strings";
import { fetchUsingMultipleCondition } from "../FetchAPIs/coomonFetch";
import { getFirestore, Timestamp } from "firebase/firestore";

//---------------------- get employess working days for performance measure---------------------------
export const getWorkingDaysInRange = ({ startDate, endDate, workingDays }) => {
  try {
    let currentDate = new Date(startDate);
    const dates = [];

    while (currentDate <= endDate) {
      const dayName = Constants.dayNameMap[currentDate.getDay()];
      if (workingDays.includes(dayName)) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  } catch (e) {
    console.log(
      "Error in PerformanceController.js getWorkingDaysInRange---------",
      e
    );
    return [];
  }
};

//------------------------- get attendance details ----------------------------
export const getAttendanceData = async ({ employeeId, start, end }) => {
  try {
    var attendanceList = [];
    // const now = new Date();

    // // First day of current month
    // const start1 = new Date(now.getFullYear(), now.getMonth(), 1);

    // // Last day of current month (set to 23:59:59.999 for inclusivity)
    // const end1 = new Date(
    //   now.getFullYear(),
    //   now.getMonth() + 1,
    //   0,
    //   23,
    //   59,
    //   59,
    //   999
    // );

    // Firebase Timestamps
    const startTimestamp = Timestamp.fromDate(start);
    const endTimestamp = Timestamp.fromDate(end);
    attendanceList = await fetchUsingMultipleCondition({
      collectionName: Constants.collectionName.attendance,
      conditions: [
        ["employeeID", "==", employeeId],
        ["attendanceDate", ">=", startTimestamp],
        ["attendanceDate", "<=", endTimestamp],
      ],
    });
    // const jsDate = new Date(start);

    // console.log(jsDate);
    // console.log(typeof start, typeof end);
    console.log(
      "attendanceList============",
      attendanceList,
      employeeId,
      end,
      start
    );
    return attendanceList;
  } catch (e) {
    console.log("Error in PerformanceController.js getAttendanceData", e);
    return [];
  }
};

//------------------------- calculate employee performance by attendance---------------------------------
export const calculateAttendancePerformance = async ({
  attendanceData,
  workingDates,
}) => {
  try {
    let presentDays = 0;

    workingDates.forEach((dateStr) => {
      const targetDate = new Date(dateStr).toISOString().slice(0, 10); // 'YYYY-MM-DD'

      const record = attendanceData.find((record) => {
        const recordDate = new Date(record.attendanceDate.seconds * 1000);
        const formattedRecordDate = recordDate.toISOString().slice(0, 10);
        return formattedRecordDate === targetDate;
      });

      console.log("Records for", dateStr, "=>", record);

      if (
        record &&
        (record.status === Constants.attendanceStatus.present ||
          record.status === Constants.attendanceStatus.late)
      ) {
        presentDays += 1;
        console.log("Working day-----", presentDays);
      }
    });

    const totalWorkingDays = workingDates.length;
    const performance =
      totalWorkingDays > 0 ? (presentDays / totalWorkingDays) * 100 : 0;

    console.log("Attendance cout---------", performance);
    return performance;
  } catch (e) {
    console.log(
      "Error in PerformanceController.js calculateAttendancePerformance",
      e
    );
  }
};
