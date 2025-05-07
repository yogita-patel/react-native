import { EmployeeModel } from "../../Model/EmployeeModel";
import Constants from "../../Constants/Strings";
import { AddData } from "../AddAPIs/CommonAddAPI";
import { showToast } from "../../Components/ToastComponent";
import { doc, updateDoc } from "firebase/firestore";
import { addUserID } from "../UpdateAPIs/CommonUpdate";
import { db } from "../../Firebase/Firebase";
import MedicalStaffModel from "../../Model/MedicalStaffModel";
import { getLocalUser } from "../global";

export const addMedicalStaff = async ({ values }) => {
  try {
    console.log("addMedicalStaff:", values);
    const user = await getLocalUser();
    const hospitalID = user.hospitalID;
    // console.log("userId", buisnessID);
    var staff = new MedicalStaffModel({
      userID: values.user,
      hospitalId: hospitalID,
      role: values.staffRole,
      specialty: values.docSpeciality,
      address: values.address,
      contact: values.contact,
    });
    console.log("medical staff", staff);

    const EdocRef = await AddData({
      collectionName: Constants.collectionName.medicalStaff,
      modelName: staff.toJson(),
    });
    var docc;
    if (EdocRef) {
      //add document id to the document itself
      docc = await addUserID({
        docRef: EdocRef,
        EditData: { staffID: EdocRef.id },
      });
    }
    var userDoc;

    if (docc) {
      const DocRef = doc(db, Constants.collectionName.user, values.user);
      console.log("DocRef--------------", DocRef);

      userDoc = await addUserID({
        docRef: DocRef,
        EditData: {
          doctorID: EdocRef.id,
          roleID: Constants.usersRole.doctor,
          hospitalID: hospitalID,
        },
      });
    }
    if (userDoc) {
      showToast({
        description: "Medical staff added successfully!",
        message: "Success",
      });
      return true;
    } else {
      showToast({
        description: "Medical staff add fail please try again later!",
        message: "Error",
        type: "Error",
      });
      return false;
    }
  } catch (e) {
    console.log("Error: MedicalStaffController.js addEmployee:", e);
    return false;
  }
};
