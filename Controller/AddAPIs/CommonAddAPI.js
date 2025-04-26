import { db } from "../../Firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { addUserID } from "../UpdateAPIs/CommonUpdate";

//common add function
export const AddData = async ({ collectionName, modelName }) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...modelName,
    });
    console.log("user added:", docRef.id);
    return docRef;
  } catch (e) {
    console.log("Error: CommonAddAPI.js AddData: ", e);
    throw error;
  }
};
