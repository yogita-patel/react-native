import { AddData } from "../AddAPIs/CommonAddAPI";
import { showToast } from "../../Components/ToastComponent";
import { BusinessModel } from "../../Model/BuinessModel";
import { getLocalUser } from "../global";
import { addUserID } from "../UpdateAPIs/CommonUpdate";
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
    if (doc) {
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
