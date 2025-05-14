import { removeData } from "../../LocalStorage/RemoveLocalData";

//------------------------- logout--------------------------------
export const logoutUser = async () => {
  try {
    console.log("logoutUser:");
    await removeData({ key: "user" }); //remove user data locally
  } catch (e) {
    console.log("Error: logoutController.js logoutUser:", e);
  }
};
