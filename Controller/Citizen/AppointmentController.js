import { EmployeeModel } from "../../Model/EmployeeModel";
import Constants from "../../Constants/Strings";
import { AddData } from "../AddAPIs/CommonAddAPI";
import { showToast } from "../../Components/ToastComponent";
import { doc, updateDoc } from "firebase/firestore";
import { addUserID } from "../UpdateAPIs/CommonUpdate";
import { db } from "../../Firebase/Firebase";
import MedicalStaffModel from "../../Model/MedicalStaffModel";
import { getLocalUser } from "../global";
import { Timestamp } from "firebase/firestore";
import {
  fetchList,
  fetchUsingMultipleCondition,
} from "../FetchAPIs/coomonFetch";
import { fetchDataByDoc } from "../FetchAPIs/coomonFetch";
import { SearchUserIDs } from "../UncommonAPIs/GetEmployeeIDByName";
// export const getMedicalStaffList = async ({
//   lastDoc = null,
//   searchText = null,
//   hospitalID,
// }) => {
//   try {
//     // const user = await getLocalUser();
//     // console.log("hospitalID-----", user.hospitalID);
//     var searchFName;
//     var medicalStaffList;
//     const filterData = [
//       // { field: "attendanceDate", operator: ">=", value: startDate },
//       // { field: "attendanceDate", operator: "<=", value: endDate },
//     ];
//     if (searchText) {
//       searchFName = await SearchUserIDs({
//         collectionName: Constants.collectionName.user,
//         condition: "fullName",
//         value: searchText,
//       });
//       console.log("Search-userName-------------", searchFName);
//       filterData.push({
//         field: "userID",
//         operator: "in",
//         value: [searchFName[0].userID],
//       });
//     }
//     console.log("FilterData-------------------------", filterData);
//     medicalStaffList = await fetchList({
//       lastDoc: lastDoc,
//       collectionName: Constants.collectionName.medicalStaff,
//       filters: filterData,
//     });
//     if (medicalStaffList) {
//       console.log("medicalStaffList:-----", medicalStaffList);
//       const userIDs = medicalStaffList.list.map((e) => e.userID);
//       console.log("userIDs:-----", userIDs);
//       var userData;
//       if (userIDs.length > 0) {
//         userData = await fetchDataByDoc({
//           collectionName: Constants.collectionName.user,
//           IDs: userIDs,
//         });
//       }
//       // console.log("UserData", userData);
//       var medicalStaffList2;
//       medicalStaffList2 = medicalStaffList.list.map((medicalStaff) => ({
//         ...medicalStaff,
//         name: userData[medicalStaff.userID]?.fullName || "Unknown",
//         email: userData[medicalStaff.userID]?.email || "Unknown",
//       }));

//       console.log(
//         "medicalStaffList2:-------------------------------- ",
//         medicalStaffList2
//       );
//       return {
//         list: medicalStaffList2,
//         lastDoc: medicalStaffList.lastDoc,
//         hasMore: medicalStaffList.hasMore,
//       };
//     }
//     return null;
//   } catch (e) {
//     console.log("Error: MedicalStaffController.js getMedicalStaffList:", e);
//     return null;
//   }
// };
