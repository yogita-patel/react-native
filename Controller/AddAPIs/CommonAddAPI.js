import { db } from "../../Firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { addUserID } from "../UpdateAPIs/CommonUpdate";

//---------------------common add API function----------------------
export const AddData = async ({ collectionName, modelName }) => {
  try {
    console.log("Collection name: ", collectionName);

    //addDoc use to add data in fire store if collection exists otherwise it creates new
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
