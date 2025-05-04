import { getLocalUser } from "../global";
import { SearchUserIDs } from "../UncommonAPIs/GetEmployeeIDByName";
import { fetchList } from "../FetchAPIs/coomonFetch";
import Constants from "../../Constants/Strings";
import { GetAttendanceByEmployee } from "../UncommonAPIs/GetAttendanceByMonthYear";
export const GeneratePayroll = async ({
  lastDoc,
  searchText = null,
  month,
  year,
}) => {
  try {
    const user = await getLocalUser();
    // console.log("buissnessID-----", user.businessID);
    var searchFName;
    var employeeList;
    var filterData = [
      { field: "businessID", operator: "==", value: user.businessID },
    ];
    // const filterData = [
    //   { field: "attendanceDate", operator: ">=", value: startDate },
    //   { field: "attendanceDate", operator: "<=", value: endDate },
    // ];
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
    employeeList = await fetchList({
      lastDoc: lastDoc,
      collectionName: Constants.collectionName.employee,
      filters: filterData,
    });

    // console.log("EmployeeList------------------", employeeList);

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    const data = await GetAttendanceByEmployee({
      employeeID: "S0VXiBHslIz54GzkJZgy",
      endOfMonth,
      startOfMonth,
    });

    console.log("Employee data--------------------------", data);
    // if (searchEmail) {
    //   emplyeeList = await fetchList({
    //     lastDoc: lastDoc,
    //     collectionName: Constants.collectionName.employee,
    //     filters: [
    //       { field: "businessID", operator: "==", value: user.businessID },
    //       { field: "userID", operator: "==", value: searchEmail[0].userID },
    //     ],
    //   });
    // } else {
    //   emplyeeList = await fetchList({
    //     lastDoc: lastDoc,
    //     collectionName: Constants.collectionName.employee,
    //     filters: [
    //       { field: "businessID", operator: "==", value: user.businessID },
    //       //  searchEmail? { field: "userID", operator: "in", value: user.businessID }:null,
    //     ],
    //   });
    // }

    // if (emplyeeList) {
    //   console.log("emplyeeList:-----", emplyeeList);
    //   const userIDs = emplyeeList.list.map((e) => e.userID);
    //   console.log("userIDs:-----", userIDs);

    //   var userData;
    //   if (userIDs.length > 0) {
    //     userData = await fetchDataByDoc({
    //       collectionName: Constants.collectionName.user,
    //       IDs: userIDs,
    //     });
    //   }
    //   // console.log("UserData", userData);
    //   var employeeList2;
    //   employeeList2 = emplyeeList.list.map((employee) => ({
    //     ...employee,
    //     name: userData[employee.userID]?.fullName || "Unknown",
    //     email: userData[employee.userID]?.email || "Unknown",
    //   }));

    //   // console.log(
    //   //   "EmployeeList2:-------------------------------- ",
    //   //   employeeList2
    //   // );
    //   return {
    //     list: employeeList2,
    //     lastDoc: emplyeeList.lastDoc,
    //     hasMore: emplyeeList.hasMore,
    //   };
    //}
    return null;
  } catch (e) {
    console.log("Error: PayrollController.js GeneratePayroll:", e);
    return null;
  }
};
