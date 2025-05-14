import Constants from "../../Constants/Strings";
import { db } from "../../Firebase/Firebase";
import {
  getDocs,
  query,
  collection,
  where,
  getDoc,
  doc,
} from "firebase/firestore";

//------------------- get patients-----------------------
export const getPatients = async ({ hospitalId }) => {
  try {
    const q = query(
      collection(db, Constants.collectionName.appointment),
      where("hospitalID", "==", hospitalId)
    );
    const snapshot = await getDocs(q);

    // Collect unique patient IDs
    const patientIds = [
      ...new Set(snapshot.docs.map((doc) => doc.data().patientId)),
    ];

    const patientPromises = patientIds.map((id) =>
      getDoc(doc(db, Constants.collectionName.user, id))
    );
    const patientDocs = await Promise.all(patientPromises);
    const patients = patientDocs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("patientsList...................", patients);
    return patients;
  } catch (e) {
    console.log("Error: PAtientsController.js getPatients:", e);
    return null;
  }
};
