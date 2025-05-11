import { EmployeeModel } from "../../Model/EmployeeModel";
import Constants from "../../Constants/Strings";
import { AddData } from "../AddAPIs/CommonAddAPI";
import { showToast } from "../../Components/ToastComponent";
import {
  doc,
  updateDoc,
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";
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
import { MedicalStaffShift } from "../../Model/MedicalStaffShiftModel";

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

export const getMedicalStaffList = async ({
  lastDoc = null,
  searchText = null,
  hospitalId,
}) => {
  try {
    const specialitySnapshot = await getDocs(
      collection(db, Constants.collectionName.doctorSpeciality)
    );
    const specialityMap = {};
    specialitySnapshot.forEach((doc) => {
      specialityMap[doc.id] = doc.data().SpecialityType;
    });

    // const user = await getLocalUser();
    console.log("getMedicalSTaff in controller-----", hospitalId);
    var searchFName;
    var medicalStaffList;
    const filterData = [
      { field: "hospitalId", operator: "==", value: hospitalId },
      // { field: "attendanceDate", operator: "<=", value: endDate },
    ];
    if (searchText) {
      searchFName = await SearchUserIDs({
        collectionName: Constants.collectionName.user,
        condition: "fullName",
        value: searchText,
      });
      console.log("Search-userName-------------", searchFName);
      filterData.push({
        field: "userID",
        operator: "in",
        value: [searchFName[0].userID],
      });
    }
    console.log("FilterData-------------------------", filterData);
    medicalStaffList = await fetchList({
      lastDoc: lastDoc,
      collectionName: Constants.collectionName.medicalStaff,
      filters: filterData,
    });
    if (medicalStaffList) {
      console.log("medicalStaffList:-----", medicalStaffList);
      const userIDs = medicalStaffList.list.map((e) => e.userID);
      console.log("userIDs:-----", userIDs);
      var userData;
      if (userIDs.length > 0) {
        userData = await fetchDataByDoc({
          collectionName: Constants.collectionName.user,
          IDs: userIDs,
        });
      }
      // console.log("UserData", userData);
      var medicalStaffList2;
      medicalStaffList2 = medicalStaffList.list.map((medicalStaff) => ({
        ...medicalStaff,
        name: userData[medicalStaff.userID]?.fullName || "Unknown",
        email: userData[medicalStaff.userID]?.email || "Unknown",
        profile: userData[medicalStaff.userID]?.userProfile || "",
        docSpeciality: specialityMap[medicalStaff.specialty] || "",
      }));

      console.log(
        "medicalStaffList2:-------------------------------- ",
        medicalStaffList2
      );
      return {
        list: medicalStaffList2,
        lastDoc: medicalStaffList.lastDoc,
        hasMore: medicalStaffList.hasMore,
      };
    }
    return null;
  } catch (e) {
    console.log("Error: MedicalStaffController.js getMedicalStaffList:", e);
    return null;
  }
};

export const updateMedicalStaffData = async ({
  medicalStaffData,
  medicalStaffID,
}) => {
  try {
    console.log("updateMedicalStaffData:", medicalStaffData);
    const user = await getLocalUser();
    const hospitalID = user.hospitalID;
    var staff = new MedicalStaffModel({
      userID: medicalStaffData.user,
      hospitalId: hospitalID,
      role: medicalStaffData.staffRole,
      specialty: medicalStaffData.docSpeciality,
      address: medicalStaffData.address,
      contact: medicalStaffData.contact,
    });
    console.log("medicalStaff------------", staff.toJson());
    const staffRef = doc(
      db,
      Constants.collectionName.medicalStaff,
      medicalStaffID
    );
    const updated = addUserID({
      docRef: staffRef,
      EditData: staff.toJson(),
    });
    if (updated) {
      showToast({
        description: "STaff Edited successfully!",
        message: "Success",
      });
      return true;
    } else {
      showToast({
        description: "Staff update fail please try gain later!",
        message: "Error",
        type: "error",
      });
      return false;
    }
  } catch (e) {
    console.log("Error: MedicalStaffController.js updateMedicalStaffData:", e);
    return null;
  }
};

export const deleteMedicalStaffData = async ({ medicalStaff }) => {
  try {
    const empDocRef = doc(
      db,
      Constants.collectionName.medicalStaff,
      medicalStaff.id
    );
    // console.log("DocRef--------------", DocRef);
    const isEdit = await addUserID({
      docRef: empDocRef,
      EditData: {
        staffID: medicalStaff.staffID,
        isDelete: 1,
      },
    });
    if (isEdit) {
      const DocRef = doc(
        db,
        Constants.collectionName.user,
        medicalStaff.userID
      );
      console.log("DocRef--------------", DocRef);
      const userDoc = await addUserID({
        docRef: DocRef,
        EditData: {
          doctorID: null,
          roleID: Constants.usersRole.citizen,
        },
      });
      if (userDoc) {
        showToast({
          description: "Medical Staff Deleted!",
          message: "Success",
          type: "success",
        });
        return true;
      } else {
        showToast({
          description: "Medical Staff Delete fail please try again later!",
          message: "Error",
          type: "Error",
        });
        return false;
      }
    } else {
      showToast({
        description: "Medical Staff fail please try again later!",
        message: "Error",
        type: "Error",
      });
      return false;
    }
  } catch (e) {
    console.log("Error: MedicalStaffController.js deleteMedicalStaffData:", e);
    return null;
  }
};

function generateSlots(shift, shiftID) {
  const {
    staffID: doctorId,
    hospitalID,
    shiftDate,
    shiftStart,
    shiftEnd,
    breakStart,
    breakEnd,
  } = shift;

  const slotDuration = 30; // in minutes
  const slots = [];

  let current = new Date(shiftStart);
  const end = new Date(shiftEnd);

  while (current < end) {
    const next = new Date(current.getTime() + slotDuration * 60000);

    if (breakStart && current >= breakStart && current < breakEnd) {
      current = next;
      continue;
    }

    if (next > end) break;

    slots.push({
      shiftId: shiftID,
      doctorId,
      hospitalId: hospitalID,
      shiftDate: shiftDate.toISOString().split("T")[0], // "YYYY-MM-DD"
      startTime: current.toTimeString().slice(0, 5), // "HH:mm"
      endTime: next.toTimeString().slice(0, 5),
      isBooked: false,
      appointmentId: null,
      createdAt: new Date(),
    });

    current = next;
  }

  return slots;
}

async function saveSlotsToFirestore(slots) {
  const batchPromises = slots.map((slot) =>
    addDoc(collection(db, Constants.collectionName.slots), slot)
  );
  await Promise.all(batchPromises);
}

export const asignMedicalStaffShift = async ({ values, staffId, userId }) => {
  try {
    const user = await getLocalUser();
    const hospitalID = user.hospitalID;

    const shift = new MedicalStaffShift({
      userID: userId,
      hospitalID: hospitalID,
      staffID: staffId,
      shiftDate: values.shiftDate,
      shiftStart: values.startTime,
      shiftEnd: values.endTime,
      breakStart: values.breakStartTime,
      breakEnd: values.breakEndTime,
    });

    const EdocRef = await AddData({
      collectionName: Constants.collectionName.medicalStaffShift,
      modelName: shift.toJson(),
    });

    if (EdocRef) {
      await addUserID({
        docRef: EdocRef,
        EditData: { shiftID: EdocRef.id },
      });

      //  Auto-generate and store slots
      const slots = generateSlots(shift, EdocRef.id);
      await saveSlotsToFirestore(slots);

      showToast({
        description: "Shift and slots created successfully!",
        message: "Success",
      });

      return true;
    } else {
      showToast({
        description: "Shift assignment failed. Please try again.",
        message: "Error",
        type: "info",
      });
      return false;
    }
  } catch (e) {
    console.error("Error in asignMedicalStaffShift:", e);
    return false;
  }
};

// export const asignMedicalStaffShift = async ({ values, staffId, userId }) => {
//   try {
//     console.log("asignMedicalStaffShift:", values, userId, staffId);
//     console.log("asignMedicalStaffShift:", userId, staffId);

//     const user = await getLocalUser();
//     const hospitalID = user.hospitalID;
//     var shift = new MedicalStaffShift({
//       userID: userId,
//       hospitalID: hospitalID,
//       staffID: staffId,
//       shiftDate: values.shiftDate,
//       shiftStart: values.startTime,
//       shiftEnd: values.endTime,
//       breakStart: values.breakStartTime,
//       breakEnd: values.breakEndTime,
//     });
//     console.log("medical  staff shift", shift.toJson());

//     const EdocRef = await AddData({
//       collectionName: Constants.collectionName.medicalStaffShift,
//       modelName: shift.toJson(),
//     });
//     var docc;
//     if (EdocRef) {
//       //add document id to the document itself
//       docc = await addUserID({
//         docRef: EdocRef,
//         EditData: { shiftID: EdocRef.id },
//       });
//     }

//     if (docc) {
//       showToast({
//         description: "Shift assigned successfully!",
//         message: "Success",
//       });
//       return true;
//     } else {
//       showToast({
//         description: "Asign sthift fail please try again later!",
//         message: "Error",
//         type: "info",
//       });
//       return false;
//     }
//   } catch (e) {
//     console.log("Error: MedicalStaffController.js asignMedicalStaffShift:", e);
//     return false;
//   }
// };

export const fetchStaffShcedule = async ({ staffId }) => {
  try {
    const data = await fetchUsingMultipleCondition({
      collectionName: Constants.collectionName.medicalStaffShift,
      conditions: [["staffID", "==", staffId]],
    });
    // console.log("data of shift---------------", data);
    return data;
  } catch (e) {
    console.log("Error: MedicalStaffController.js fetchStaffShcedule:", e);
    return false;
  }
};
export const fetchStaffShceduleByDate = async ({ staffId, selDate }) => {
  try {
    const dateObj = new Date(selDate); // JS Date
    const startOfDay = Timestamp.fromDate(
      new Date(dateObj.setHours(0, 0, 0, 0))
    );
    const endOfDay = Timestamp.fromDate(
      new Date(dateObj.setHours(23, 59, 59, 999))
    );
    console.log("selectedDate--------------------------", startOfDay, endOfDay);
    const data = await fetchUsingMultipleCondition({
      collectionName: Constants.collectionName.medicalStaffShift,
      conditions: [
        ["staffID", "==", staffId],
        ["shiftDate", ">=", startOfDay],
        ["shiftDate", "<=", endOfDay],
      ],
    });
    console.log("data of shift---------------", data);
    return data[0];
  } catch (e) {
    console.log("Error: MedicalStaffController.js fetchStaffShcedule:", e);
    return false;
  }
};
