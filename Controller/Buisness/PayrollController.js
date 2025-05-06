import { formatDate, formatTime, getLocalUser, getMonth } from "../global";
import { SearchUserIDs } from "../UncommonAPIs/GetEmployeeIDByName";
import { fetchList } from "../FetchAPIs/coomonFetch";
import Constants from "../../Constants/Strings";
import { GetAttendanceByEmployee } from "../UncommonAPIs/GetAttendanceByMonthYear";
import { fetchByCondition } from "../FetchAPIs/coomonFetch";
import AlertModel from "../../Model/AlertModel";
import { AddData } from "../AddAPIs/CommonAddAPI";
import { showToast } from "../../Components/ToastComponent";
export const GeneratePayroll = async ({
  lastDoc,
  searchText = null,
  month,
  year,
}) => {
  try {
    showToast({
      message: "Information",
      description: "Generating payroll may take time,please wait",
      type: "info",
    });
    const user = await getLocalUser();
    const filterData = [
      { field: "businessID", operator: "==", value: user.businessID },
    ];

    if (searchText) {
      const searchFName = await SearchUserIDs({
        collectionName: Constants.collectionName.user,
        condition: "fullName",
        value: searchText,
      });

      if (searchFName.length > 0) {
        filterData.push({
          field: "userID",
          operator: "in",
          value: [searchFName[0].userID],
        });
      }
    }

    const employeeList = await fetchList({
      lastDoc: lastDoc,
      collectionName: Constants.collectionName.employee,
      filters: filterData,
    });

    const startOfMonth = new Date(year, month - 1, 1, 0, 0, 0);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    console.log("start of month---------", startOfMonth);
    console.log("end of month---------", endOfMonth);

    const payrolls = await Promise.all(
      employeeList.list.map(async (employee) => {
        const attendanceData = await GetAttendanceByEmployee({
          employeeID: employee.id,
          startOfMonth,
          endOfMonth,
        });

        // Fetch user's fullName from users collection
        let userName = "Unknown";
        if (employee.userID) {
          const userDoc = await fetchByCondition({
            collectionName: Constants.collectionName.user,
            condition: "userID",
            value: employee.userID,
          });
          if (userDoc && userDoc[0].fullName) {
            userName = userDoc[0].fullName;
          }
        }

        // Calculate total hours worked
        let totalHours = 0;
        Object.values(attendanceData).forEach((record) => {
          totalHours += record.hoursWorked || 0;
        });
        console.log(
          "Employee data merge in attendance--------------",
          userName
        );
        return {
          employeeID: employee.id,
          name: userName,
          userID: employee.userID || null,
          totalHours,
          payRate: employee.payRate || 0,
          payrollAmount: totalHours * (employee.payRate || 0),
        };
      })
    );
    const now = new Date();
    if (payrolls) {
      //Add Alert to alert collection
      const des = `Payroll Generated on ${formatDate(now)} at ${formatTime(
        now
      )} for ${getMonth(month)}  ${year}`;
      var alertData = new AlertModel({
        title: "Payroll Alert",
        description: des,
        buisnessID: user.businessID,
        alertType: Constants.alertType.buisnessAlert,
      });
      console.log("alert data--------------", alertData.toJson());
      const bdocRef = await AddData({
        collectionName: Constants.collectionName.buisnessAlert,
        modelName: alertData.toJson(),
      });
    }
    return {
      list: payrolls,
      lastDoc: employeeList.lastDoc,
      hasMore: employeeList.hasMore,
    };
  } catch (e) {
    console.log("Error: PayrollController.js GeneratePayroll:", e);
    return null;
  }
};
