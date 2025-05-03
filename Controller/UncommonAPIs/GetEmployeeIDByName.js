import { db } from "../../Firebase/Firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  documentId,
  startAfter,
  limit,
} from "firebase/firestore";
import Constants from "../../Constants/Strings";
export const SearchUserIDs = async ({ collectionName, condition, value }) => {
  try {
    const que = query(
      collection(db, collectionName),
      where(condition, ">=", value),
      where(condition, "<=", value + "\uf8ff")
    );
    const querySnapshot = await getDocs(que);
    // console.log("querysnap", querySnapshot);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    console.log("querySnapshot items", items);
    return items;
  } catch (error) {
    console.error("Error: GetEmployeeIDbyName.js SearchUserIDs:", error);
    throw error;
  }
};
