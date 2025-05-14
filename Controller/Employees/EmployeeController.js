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

//----------------------------- Add employee ---------------------------
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
      var roleofEmployeeInuserTable;
      var bID;
      // Add role for all employee and buisness ID for admin or manager role
      if (values.employeeRole == Constants.employeesRoleID.manager) {
        roleofEmployeeInuserTable = Constants.usersRole.manager;
        bID = buisnessID;
      } else if (
        values.employeeRole == Constants.employeesRoleID.buisnessAdmin
      ) {
        roleofEmployeeInuserTable = Constants.usersRole.buisnessOwner;
        bID = buisnessID;
      } else {
        roleofEmployeeInuserTable = Constants.usersRole.employee;
        bID = null;
      }
      userDoc = await addUserID({
        docRef: DocRef,
        EditData: {
          employeeID: EdocRef.id,
          roleID: roleofEmployeeInuserTable,
          businessID: bID,
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

//------------------------------- get employee list ------------------------------
export const getEmployeeList = async ({
  lastDoc,
  searchText = null,
  isManager = false,
}) => {
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

//---------------------------------- delete employee data ---------------------------------
export const deleteEmployeeData = async ({ employee }) => {
  try {
    const empDocRef = doc(
      db,
      Constants.collectionName.employee,
      employee.employeeID
    );
    // console.log("DocRef--------------", DocRef);
    const isEdit = await addUserID({
      docRef: empDocRef,
      EditData: {
        employeeID: employee.employeeID,
        isDelete: 1,
      },
    });
    if (isEdit) {
      const DocRef = doc(db, Constants.collectionName.user, employee.userID);
      console.log("DocRef--------------", DocRef);
      const userDoc = await addUserID({
        docRef: DocRef,
        EditData: {
          employeeID: null,
          roleID: Constants.usersRole.citizen,
        },
      });
      if (userDoc) {
        showToast({
          description: "Employee Deleted!",
          message: "Success",
          type: "success",
        });
        return true;
      } else {
        showToast({
          description: "Employee Delete fail please try again later!",
          message: "Error",
          type: "Error",
        });
        return false;
      }
    } else {
      showToast({
        description: "Employee delete fail please try again later!",
        message: "Error",
        type: "Error",
      });
      return false;
    }
  } catch (e) {
    console.log("Error: EmployeeController.js deleteEmployee:", e);
    return null;
  }
};

//----------------------------- update employee data -----------------------------------
export const updateEmployeeData = async ({
  employeeData,
  buisnessID,
  employeeID,
}) => {
  try {
    console.log("updateEmployeeData:", employeeData);
    // const user = await getLocalUser();
    // const userID = user.userID;

    console.log("userId", buisnessID);
    var employee = new EmployeeModel({
      userID: employeeData.user,
      employeeID: employeeID,
      businessID: buisnessID,
      roleID: employeeData.employeeRole,
      payRate: employeeData.payRate,
      address: employeeData.address,
      contact: employeeData.contact,
      workingDays: employeeData.workingDays,
      paymentDurationID: employeeData.duration,
      startTime: employeeData.startTime,
      endTime: employeeData.endTime,
      joiningDate: employeeData.joiningDate,
    });
    console.log("emplyee", employee.toJson());
    const employeeRef = doc(db, Constants.collectionName.employee, employeeID);
    const updated = addUserID({
      docRef: employeeRef,
      EditData: employee.toJson(),
    });
    if (updated) {
      showToast({
        description: "Employee Edited successfully!",
        message: "Success",
      });
      return true;
    } else {
      showToast({
        description: "Employee update fail please try gain later!",
        message: "Error",
        type: "error",
      });
      return false;
    }
  } catch (e) {
    console.log("Error: EmployeeController.js updateEmployeeData:", e);
    return null;
  }
};
