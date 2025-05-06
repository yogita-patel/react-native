import Constants from "../../Constants/Strings";
import { doc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import { fetchByCondition, fetchList } from "../FetchAPIs/coomonFetch";
import { getLocalUser } from "../global";
import { addUserID } from "../UpdateAPIs/CommonUpdate";
import { updateByCondition } from "../UpdateAPIs/CommonUpdate";

export const getAlert = async ({ lastDoc, type }) => {
  try {
    let buisnessId;
    const filterList = [];
    const user = await getLocalUser();
    if (type === Constants.alertType.buisnessAlert) {
      buisnessId = user.businessID;
      filterList.push({
        field: "buisnessID",
        operator: "==",
        value: user.businessID,
      });
    }
    console.log("buissnessID-----", buisnessId);
    var notificationList;
    notificationList = await fetchList({
      lastDoc: lastDoc,
      collectionName: Constants.collectionName.buisnessAlert,
      filters: filterList,
    });

    return notificationList;
  } catch (e) {
    console.log("Error: AlertController.js getAlert:", e);
    return null;
  }
};

export const markAsReadNotification = async ({ type }) => {
  try {
    let buisnessId;
    const user = await getLocalUser();
    if (type === Constants.alertType.buisnessAlert) {
      buisnessId = user.businessID;
      //   filterList.push({
      //     field: "buisnessID",
      //     operator: "==",
      //     value: user.businessID,
      //   });
      console.log("buissnessID-----", buisnessId);
      if (buisnessId) {
        notificationList = await updateByCondition({
          collectionName: Constants.collectionName.buisnessAlert,
          filterData: [
            ["buisnessID", "==", buisnessId],
            ["isRead", "==", 0],
          ],
          EditData: { isRead: 1 },
        });
      }
    }

    return true;
  } catch (e) {
    console.log("Error: AlertController.js markAsReadNotification:", e);
    return null;
  }
};
