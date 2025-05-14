import Constants from "../../Constants/Strings";
import { fetchByCondition } from "../FetchAPIs/coomonFetch";
import { addUserID } from "../UpdateAPIs/CommonUpdate";
import { UserModel } from "../../Model/UserModel";
import { doc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import { removeData } from "../../LocalStorage/RemoveLocalData";
import { storeData } from "../../LocalStorage/SaveDataLocally";
import { showToast } from "../../Components/ToastComponent";

//------------------ get country---------------------
export const getCountryByID = async ({ countryID }) => {
  try {
    const country = await fetchByCondition({
      collectionName: Constants.collectionName.country,
      condition: "countryID",
      value: countryID,
    });
    console.log("country", country);
    return country[0];
  } catch (e) {
    console.log("Error: PersonalProfileCOntroller.js getCountryByID:", e);
    return false;
  }
};

//---------------------- update user profile pic ---------------------------
export const updateUserProfile = async ({ image, userid, currentUSer }) => {
  try {
    console.log("updateUserProfile:");

    const userRef = doc(db, Constants.collectionName.user, userid);
    const updated = await addUserID({
      docRef: userRef,
      EditData: { userProfile: image },
    });
    if (updated) {
      //   const parsed = JSON.parse(currentUSer);
      const newUser = UserModel.fromJson(currentUSer);
      newUser.setuserProfile(image);
      await removeData("user");
      await storeData({ key: "user", value: newUser.toJson() });
      console.log("newUser------------", newUser.toJson());
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
    console.log("Error: BuisnessController.js updateUserProfile:", e);
    return null;
  }
};
