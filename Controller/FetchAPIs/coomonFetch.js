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
  limit,
} from "firebase/firestore";
import Constants from "../../Constants/Strings";

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

export const fetchList = async ({ collectionName, lastDoc, filters = [] }) => {
  try {
    const baseRef = collection(db, collectionName);
    // Basic filters (always apply)
    let constraints = [
      where("isDelete", "==", 0),
      limit(Constants.lazyLoadLimit),
    ];

    // Add custom filters dynamically
    filters.forEach((filter) => {
      constraints.unshift(where(filter.field, filter.operator, filter.value));
    });

    // Add pagination
    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }
    const q = query(baseRef, ...constraints);

    const snapshot = await getDocs(q);

    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    return {
      list,
      lastDoc: lastVisible,
      hasMore: snapshot.docs.length === Constants.lazyLoadLimit,
    };
  } catch (error) {
    console.error("Error: coomonFetch.js fetchList:", error);
    throw error;
  }
};
