import { getLocalUser } from "../global";
import { SearchUserIDs } from "../UncommonAPIs/GetEmployeeIDByName";
import { fetchList } from "../FetchAPIs/coomonFetch";
import Constants from "../../Constants/Strings";
import { GetAttendanceByEmployee } from "../UncommonAPIs/GetAttendanceByMonthYear";
import { fetchByCondition } from "../FetchAPIs/coomonFetch";
export const GeneratePayroll = async ({
  lastDoc,
  searchText = null,
  month,
  year,
}) => {
  try {
    // const user = await getLocalUser();
    // // console.log("buissnessID-----", user.businessID);
    // var searchFName;
    // var employeeList;
    // var filterData = [
    //   { field: "businessID", operator: "==", value: user.businessID },
    // ];
    // // const filterData = [
    // //   { field: "attendanceDate", operator: ">=", value: startDate },
    // //   { field: "attendanceDate", operator: "<=", value: endDate },
    // // ];
    // if (searchText) {
    //   searchFName = await SearchUserIDs({
    //     collectionName: Constants.collectionName.user,
    //     condition: "fullName",
    //     value: searchText,
    //   });
    //   console.log("Search-userName-------------", searchFName[0]);
    //   filterData.push({
    //     field: "userID",
    //     operator: "in",
    //     value: [searchFName[0].userID],
    //   });
    // }
    // employeeList = await fetchList({
    //   lastDoc: lastDoc,
    //   collectionName: Constants.collectionName.employee,
    //   filters: filterData,
    // });

    // // console.log("EmployeeList------------------", employeeList);

    // const startOfMonth = new Date(year, month - 1, 1, 0, 0, 0);
    // const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    // const data = await GetAttendanceByEmployee({
    //   employeeID: "U7ifs7KVHAlu9Wm8h21O",
    //   endOfMonth,
    //   startOfMonth,
    // });

    // console.log("Employee data--------------------------", data);
    // // if (searchEmail) {
    // //   emplyeeList = await fetchList({
    // //     lastDoc: lastDoc,
    // //     collectionName: Constants.collectionName.employee,
    // //     filters: [
    // //       { field: "businessID", operator: "==", value: user.businessID },
    // //       { field: "userID", operator: "==", value: searchEmail[0].userID },
    // //     ],
    // //   });
    // // } else {
    // //   emplyeeList = await fetchList({
    // //     lastDoc: lastDoc,
    // //     collectionName: Constants.collectionName.employee,
    // //     filters: [
    // //       { field: "businessID", operator: "==", value: user.businessID },
    // //       //  searchEmail? { field: "userID", operator: "in", value: user.businessID }:null,
    // //     ],
    // //   });
    // // }

    // // if (emplyeeList) {
    // //   console.log("emplyeeList:-----", emplyeeList);
    // //   const userIDs = emplyeeList.list.map((e) => e.userID);
    // //   console.log("userIDs:-----", userIDs);

    // //   var userData;
    // //   if (userIDs.length > 0) {
    // //     userData = await fetchDataByDoc({
    // //       collectionName: Constants.collectionName.user,
    // //       IDs: userIDs,
    // //     });
    // //   }
    // //   // console.log("UserData", userData);
    // //   var employeeList2;
    // //   employeeList2 = emplyeeList.list.map((employee) => ({
    // //     ...employee,
    // //     name: userData[employee.userID]?.fullName || "Unknown",
    // //     email: userData[employee.userID]?.email || "Unknown",
    // //   }));

    // //   // console.log(
    // //   //   "EmployeeList2:-------------------------------- ",
    // //   //   employeeList2
    // //   // );
    // //   return {
    // //     list: employeeList2,
    // //     lastDoc: emplyeeList.lastDoc,
    // //     hasMore: emplyeeList.hasMore,
    // //   };
    // //}
    // return null;

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

    const startOfMonth = new Date(year, month - 1, 1, 0, 0, 0); // e.g., May -> month=5, so month-1 = 4
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999); // last day of selected month

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
