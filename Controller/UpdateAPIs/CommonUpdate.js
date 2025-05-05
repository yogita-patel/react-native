import { db } from "../../Firebase/Firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// common function for edit data
export const addUserID = async ({ docRef, EditData }) => {
  try {
    // add ref-id to field
    console.log("doc ref", docRef);
    console.log("edddit", EditData);
    await updateDoc(docRef, EditData);
    return true;
  } catch (error) {
    console.error("Error: commonUpdate.js addUserID:", error);
    throw error;
  }
};
