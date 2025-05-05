import { getRecordCount } from "../FetchAPIs/coomonFetch";

import Constants from "../../Constants/Strings";
import { getLocalUser } from "../global";
import {
  fetchByCondition,
  fetchUsingMultipleCondition,
  fetchList,
} from "../FetchAPIs/coomonFetch";
import { GetAttendanceByEmployee } from "../UncommonAPIs/GetAttendanceByMonthYear";

export const getTotalEmployee = async () => {
  try {
    const user = await getLocalUser();
    const buisnessID = user.businessID;
    // console.log("BuisnessID======", user);
    const employeeCount = await getRecordCount({
      collectionName: Constants.collectionName.employee,
      fieldName: "businessID",
      value: buisnessID,
      //   isDeleteCondition: true,
    });

    return employeeCount;
  } catch (e) {
    console.log("Error: DashboardController.js getTotalEmployee:", e);
    return 0;
  }
};

export const getAlertCount = async () => {
  try {
    const user = await getLocalUser();
    const buisnessID = user.businessID;
    // console.log("BuisnessID======", user);
    const condition = [
      ["buisnessID", "==", buisnessID],
      ["isDelete", "==", 0],
      ["isRead", "==", 0],
    ];
    const alertCount = await fetchUsingMultipleCondition({
      collectionName: Constants.collectionName.buisnessAlert,
      conditions: condition,
    });

    console.log("AlertCount-------", alertCount.length);
    return alertCount.length;
  } catch (e) {
    console.log("Error: DashboardController.js getTotalEmployee:", e);
    return 0;
  }
};

export const calCulateAvgAttendance = async () => {
  try {
    const user = await getLocalUser();
    const buisnessID = user.businessID;
    const employee = await fetchByCondition({
      collectionName: Constants.collectionName.employee,
      condition: "businessID",
      value: buisnessID,
      isDeleteCondition: true,
    });
    // console.log("employee length", (await employee).length);
    if (employee.length === 0) return 0;
    let totalAttendance = 0;
    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      0,
      0,
      0
    );
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    for (const emp of employee) {
      const attendance = await fetchUsingMultipleCondition({
        collectionName: Constants.collectionName.attendance,
        conditions: [
          ["employeeID", "==", emp.employeeID],
          ["attendanceDate", ">=", startOfMonth],
          ["attendanceDate", "<=", endOfMonth],
        ],
      });
      totalAttendance += attendance.length;
      console.log("total Attendance", totalAttendance);
    }
    const average = totalAttendance / employee.length;
    return average;
  } catch (e) {
    console.log("Error: DashboardController.js calCulateAvgAttendance:", e);
    return 0;
  }
};

export const calculateRevenue = async () => {
  try {
    const user = await getLocalUser();

    const filterData = [
      ["businessID", "==", user.businessID],
      ["isDelete", "==", 0],
    ];

    const employeeList = await fetchUsingMultipleCondition({
      collectionName: Constants.collectionName.employee,
      conditions: filterData,
    });

    const employees = employeeList?.list || employeeList; // handle both list or raw array
    if (!employees || employees.length === 0) {
      console.warn("No employees found");
      return 0;
    }

    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      0,
      0,
      0
    );
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    let totalPayroll = 0;

    await Promise.all(
      employees.map(async (employee) => {
        const attendanceData = await GetAttendanceByEmployee({
          employeeID: employee.id,
          startOfMonth,
          endOfMonth,
        });

        let totalHours = 0;
        Object.values(attendanceData || {}).forEach((record) => {
          totalHours += record.hoursWorked || 0;
        });

        const payRate = parseFloat(employee.payRate || "0");
        const payrollAmount = totalHours * payRate;
        totalPayroll += payrollAmount;
      })
    );

    return totalPayroll;
  } catch (err) {
    console.error("Error calculating payroll:", err);
    return 0;
  }
};
