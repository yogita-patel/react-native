import { AddData } from "../AddAPIs/CommonAddAPI";
import { showToast } from "../../Components/ToastComponent";
import { BusinessModel } from "../../Model/BuinessModel";
import { getLocalUser } from "../global";
import { addUserID } from "../UpdateAPIs/CommonUpdate";
import { fetchByCondition } from "../FetchAPIs/coomonFetch";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
export const onCreateBuisness = async (values) => {
  try {
    console.log("onCreateBuisness:", values);
    const user = await getLocalUser();
    const userID = user.userID;
    console.log("userId", userID);
    var buisness = new BusinessModel({
      buisnessName: values.bname,
      buisnessAddress: values.baddress,
      buisnessEmail: values.email,
      buisnessContact: values.bcontact,
      buisnessCategory: values.bcat,
      cityId: values.bcity,
      ownerId: userID,
    });
    console.log("buisness", buisness);
    const bdocRef = await AddData({
      collectionName: "Buisness",
      modelName: buisness.toJson(),
    });
    var doc;
    if (bdocRef) {
      //add document id to the document itself
      doc = await addUserID({
        docRef: bdocRef,
        EditData: { buisnessID: bdocRef.id },
      });
    }
    var userDoc;
    if (doc) {
      const businessDocRef = doc(db, "Users", bdocRef.id);
      userDoc = await addUserID({
        docRef: businessDocRef,
        EditData: { buisnessID: bdocRef.id },
      });
    }
    if (userDoc) {
      showToast({
        description: "Buisness Registred successfully!",
        message: "Success",
      });
      return true;
    } else {
      showToast({
        description: "Buisness Registration fail please try again later!",
        message: "Error",
        type: "error",
      });
      return false;
    }
  } catch (e) {
    console.log("Error: BuisnessController.js onCreateBuisness:", e);
    return false;
  }
};

// get buisness
export const getBuisness = async () => {
  try {
    console.log("getBuisness:");
    const user = await getLocalUser();
    const userID = user.userID;
    console.log("userId", userID);
    const bdetails = await fetchByCondition({
      collectionName: "Buisness",
      condition: "ownerId",
      value: userID,
    });
    console.log("bdetails", bdetails);
    return bdetails[0];
  } catch (e) {
    console.log("Error: BuisnessController.js onCreateBuisness:", e);
    return false;
  }
};

export const getBuisnessCategory = async ({ catID }) => {
  try {
    console.log("categoryID", catID);
    const cat = await fetchByCondition({
      collectionName: "BuisnessCategory",
      condition: "catID",
      value: catID,
    });
    console.log("category", cat);
    return cat[0];
  } catch (e) {
    console.log("Error: BuisnessController.js getBuisnessCategory:", e);
    return false;
  }
};

export const getBuisnessCity = async ({ cityID }) => {
  try {
    const city = await fetchByCondition({
      collectionName: "Cities",
      condition: "cityID",
      value: cityID,
    });
    console.log("city", city);
    return city[0];
  } catch (e) {
    console.log("Error: BuisnessController.js getBuisnessCity:", e);
    return false;
  }
};

export const updateBuisness = async ({ values, businessId }) => {
  try {
    console.log("updateBuisness:", values);
    const user = await getLocalUser();
    const userID = user.userID;
    // console.log("userId", userID);
    var buisness = new BusinessModel({
      buisnessName: values.bname,
      buisnessAddress: values.baddress,
      buisnessEmail: values.email,
      buisnessContact: values.bcontact,
      buisnessCategory: values.bcat,
      cityId: values.bcity,
      ownerId: userID,
    });
    // console.log("buisness", buisness);
    const businessRef = doc(db, "Buisness", businessId);
    const updated = addUserID({
      docRef: businessRef,
      EditData: buisness.toJson(),
    });
    if (updated) {
      showToast({
        description: "Buisness Edited successfully!",
        message: "Success",
      });
      return true;
    } else {
      showToast({
        description: "Buisness update fail please try gain later!",
        message: "Error",
        type: "error",
      });
      return false;
    }
  } catch (e) {
    console.log("Error: BuisnessController.js updateBuisness:", e);
    return null;
  }
};

export const updateProfileImage = async ({ image }) => {
  try {
    console.log("updateProfileImage:");
    const user = await getLocalUser();
    const businessID = user.businessID;
    const businessRef = doc(db, "Buisness", businessID);
    const updated = await addUserID({
      docRef: businessRef,
      EditData: { buisnessProfile: image },
    });
    if (updated) {
      showToast({
        description: "Profile upadated Successfully!",
        message: "Success",
      });
      return true;
    } else {
      showToast({
        description: "Profile update fail please try gain later!",
        message: "Error",
        type: "error",
      });
      return false;
    }
  } catch (e) {
    console.log("Error: BuisnessController.js updateProfileImage:", e);
    return null;
  }
};
