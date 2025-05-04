import { EmployeeModel } from "../../Model/EmployeeModel";
import Constants from "../../Constants/Strings";
import { AddData } from "../AddAPIs/CommonAddAPI";
import { showToast } from "../../Components/ToastComponent";
import { doc, updateDoc } from "firebase/firestore";
import { addUserID } from "../UpdateAPIs/CommonUpdate";
import { db } from "../../Firebase/Firebase";
import { fetchByCondition, fetchList } from "../FetchAPIs/coomonFetch";
import { getLocalUser } from "../global";
import { fetchDataByDoc } from "../FetchAPIs/coomonFetch";
export const addEmployee = async ({ values, buisnessID }) => {
  try {
    console.log("onCreateBuisness:", values);
    // const user = await getLocalUser();
    // const userID = user.userID;
    console.log("userId", buisnessID);
    var employee = new EmployeeModel({
      userID: values.user,
      businessID: buisnessID,
      roleID: values.employeeRole,
      payRate: values.payRate,
      address: values.address,
      contact: values.contact,
      workingDays: values.workingDays,
      paymentDurationID: values.duration,
      startTime: values.startTime,
      endTime: values.endTime,
      joiningDate: values.joiningDate,
    });
    console.log("emplyee", employee);

    console.log("Employee table:", Constants.collectionName.employee);
    const EdocRef = await AddData({
      collectionName: Constants.collectionName.employee,
      modelName: employee.toJson(),
    });
    var docc;
    if (EdocRef) {
      //add document id to the document itself
      docc = await addUserID({
        docRef: EdocRef,
        EditData: { employeeID: EdocRef.id },
      });
    }
    var userDoc;
    if (docc) {
      const DocRef = doc(db, Constants.collectionName.user, values.user);
      console.log("DocRef--------------", DocRef);
      userDoc = await addUserID({
        docRef: DocRef,
        EditData: {
          employeeID: EdocRef.id,
          roleID: Constants.usersRole.employee,
        },
      });
    }
    if (userDoc) {
      showToast({
        description: "Employee added successfully!",
        message: "Success",
      });
      return true;
    } else {
      showToast({
        description: "Employee add fail please try again later!",
        message: "Error",
        type: "Error",
      });
      return false;
    }
  } catch (e) {
    console.log("Error: EmployeeController.js addEmployee:", e);
    return false;
  }
};

export const getEmployeeList = async ({ lastDoc, searchText = null }) => {
  try {
    const user = await getLocalUser();
    console.log("buissnessID-----", user.businessID);
    var searchEmail;
    var emplyeeList;
    if (searchText) {
      searchEmail = await fetchByCondition({
        collectionName: Constants.collectionName.user,
        condition: "email",
        value: searchText,
      });
      console.log("Search-email-------------", searchEmail[0].userID);
    }

    if (searchEmail) {
      emplyeeList = await fetchList({
        lastDoc: lastDoc,
        collectionName: Constants.collectionName.employee,
        filters: [
          { field: "businessID", operator: "==", value: user.businessID },
          { field: "userID", operator: "==", value: searchEmail[0].userID },
        ],
      });
    } else {
      emplyeeList = await fetchList({
        lastDoc: lastDoc,
        collectionName: Constants.collectionName.employee,
        filters: [
          { field: "businessID", operator: "==", value: user.businessID },
          //  searchEmail? { field: "userID", operator: "in", value: user.businessID }:null,
        ],
      });
    }

    if (emplyeeList) {
      console.log("emplyeeList:-----", emplyeeList);
      const userIDs = emplyeeList.list.map((e) => e.userID);
      console.log("userIDs:-----", userIDs);

      var userData;
      if (userIDs.length > 0) {
        userData = await fetchDataByDoc({
          collectionName: Constants.collectionName.user,
          IDs: userIDs,
        });
      }
      // console.log("UserData", userData);
      var employeeList2;
      employeeList2 = emplyeeList.list.map((employee) => ({
        ...employee,
        name: userData[employee.userID]?.fullName || "Unknown",
        email: userData[employee.userID]?.email || "Unknown",
      }));

      // console.log(
      //   "EmployeeList2:-------------------------------- ",
      //   employeeList2
      // );
      return {
        list: employeeList2,
        lastDoc: emplyeeList.lastDoc,
        hasMore: emplyeeList.hasMore,
      };
    }
    return null;
  } catch (e) {
    console.log("Error: EmployeeController.js getEmployeeList:", e);
    return null;
  }
};
