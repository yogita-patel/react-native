import { getData } from "../LocalStorage/GetLocalData";

export const getLocalUser = async () => {
  try {
    console.log("getLocalUser:");
    const user = await getData({ key: "user" });
    console.log("user:", user);
    return user;
  } catch (e) {
    console.log("Error: global.js getLocalUser:", e);
    return null;
  }
};
