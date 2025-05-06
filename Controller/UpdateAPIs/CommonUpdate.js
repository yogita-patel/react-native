import { db } from "../../Firebase/Firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
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

export const updateByCondition = async ({
  collectionName,
  filterData = [],
  EditData,
}) => {
  try {
    let q = collection(db, collectionName);

    // Apply each condition as a where clause
    filterData.forEach((cond) => {
      const [field, operator, value] = cond;
      q = query(q, where(field, operator, value));
    });

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents found.");
      return;
    }

    for (const docSnapshot of querySnapshot.docs) {
      await updateDoc(docSnapshot.ref, EditData);
      console.log(`Updated document: ${docSnapshot.id}`);
    }
  } catch (error) {
    console.error("Error: commonUpdate.js updateByCondition:", error);
    throw error;
  }
};
