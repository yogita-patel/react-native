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
} from "firebase/firestore";

// common function for fetch data
export const fetchData = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (error) {
    console.error("Error: coomonFetch.js fetchData:", error);
    throw error;
  }
};

export const fetchByCondition = async ({
  collectionName,
  condition,
  value,
}) => {
  try {
    const que = query(
      collection(db, collectionName),
      where(condition, "==", value)
    );
    const querySnapshot = await getDocs(que);
    // console.log("querysnap", querySnapshot);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    // console.log("querySnapshot items", items);
    return items;
  } catch (error) {
    console.error("Error: coomonFetch.js fetchByCondition:", error);
    throw error;
  }
};
