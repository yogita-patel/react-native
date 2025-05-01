import { EmployeeModel } from "../../Model/EmployeeModel";
import Constants from "../../Constants/Strings";
import { AddData } from "../AddAPIs/CommonAddAPI";
import { showToast } from "../../Components/ToastComponent";
import { doc, updateDoc } from "firebase/firestore";
import { addUserID } from "../UpdateAPIs/CommonUpdate";
import { db } from "../../Firebase/Firebase";
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
    var doc;
    if (EdocRef) {
      //add document id to the document itself
      doc = await addUserID({
        docRef: EdocRef,
        EditData: { employeeID: EdocRef.id },
      });
    }
    var userDoc;
    if (doc) {
      const DocRef = doc(db, Constants.collectionName.user, EdocRef.id);
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
