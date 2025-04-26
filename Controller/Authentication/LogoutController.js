import { removeData } from "../../LocalStorage/RemoveLocalData";
export const logoutUser = async () => {
  try {
    console.log("logoutUser:");
    await removeData({ key: "user" });
  } catch (e) {
    console.log("Error: logoutController.js logoutUser:", e);
  }
};
