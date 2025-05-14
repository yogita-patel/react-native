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

//-------------------------- common function for fetch data -----------------------------
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

//----------------------- fetch data by providing one condition only----------------------
export const fetchByCondition = async ({
  collectionName,
  condition,
  value,
  isDeleteCondition = false,
}) => {
  try {
    var que;
    if (isDeleteCondition) {
      que = query(
        collection(db, collectionName),
        where(condition, "==", value),
        where("isDelete", "==", 0)
      );
    } else {
      que = query(
        collection(db, collectionName),
        where(condition, "==", value)
      );
    }
    const querySnapshot = await getDocs(que);
    // console.log("querysnap", querySnapshot);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    console.log("querySnapshot items", items);
    return items;
  } catch (error) {
    console.error("Error: coomonFetch.js fetchByCondition:", error);
    throw error;
  }
};

//----------------------------- fetch data by lazy laoding ---------------------------
export const fetchList = async ({
  collectionName,
  lastDoc,
  filters = [],
  isDeleteFalse = false,
}) => {
  try {
    const baseRef = collection(db, collectionName);
    // Basic filters (always apply)
    let constraints;
    if (isDeleteFalse) {
      constraints = [limit(Constants.lazyLoadLimit)];
    } else {
      constraints = [
        where("isDelete", "==", 0),
        limit(Constants.lazyLoadLimit),
      ];
    }

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
    console.log("fetched list:", list);
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

// common function for fetch data
export const fetchDataByDoc = async ({ collectionName, IDs }) => {
  try {
    const snapshot = await getDocs(
      query(collection(db, collectionName), where(documentId(), "in", IDs))
    );

    const dataMap = {};
    snapshot.forEach((doc) => {
      dataMap[doc.id] = doc.data();
    });
    console.log("dataMap-----", dataMap);
    return dataMap;
  } catch (error) {
    console.error("Error: coomonFetch.js fetchDataByDoc:", error);
    throw error;
  }
};

//-------------------- get record count for given collection -----------------
export const getRecordCount = async ({ collectionName, fieldName, value }) => {
  try {
    console.log("getRecordCount", value);
    const q = query(
      collection(db, collectionName),
      where(fieldName, "==", value),
      where("isDelete", "==", 0)
    );

    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error("Error: coomonFetch.js getRecordCount:", error);
    return 0;
  }
};

//--------------------- fetch data by daynamic multiple condition------------------
export const fetchUsingMultipleCondition = async ({
  collectionName,
  conditions = [],
}) => {
  try {
    const colRef = collection(db, collectionName);

    let q = colRef;

    if (conditions.length > 0) {
      const whereClauses = conditions.map(([field, op, value]) =>
        where(field, op, value)
      );
      q = query(colRef, ...whereClauses);
    }

    const snapshot = await getDocs(q);

    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return result;
  } catch (error) {
    console.error("Error coomonFetch fetchUsingMultipleCondition:", error);
    return [];
  }
};
