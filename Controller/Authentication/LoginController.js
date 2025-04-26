import { getData } from "../../LocalStorage/GetLocalData";
import { auth } from "../../Firebase/Firebase";
import { fetchByCondition } from "../FetchAPIs/coomonFetch";
import { signInWithEmailAndPassword } from "firebase/auth";
import { storeData } from "../../LocalStorage/SaveDataLocally";
export const isUserLoggedIn = async () => {
  try {
    console.log("checklogin:");
    const user = await getData({ key: "user" });
    console.log("user:", user);
    return !user ? false : true;
  } catch (e) {
    console.log("Error: LoginController.js isUserLoggedIn:", e);
    return false;
  }
};

export const loginUser = async (values) => {
  try {
    console.log("loginUser:", values);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    console.log(userCredential);
    const uid = userCredential.user.uid;
    console.log("uid:", uid);
    const user = await fetchByCondition({
      collectionName: "Users",
      condition: "authID",
      value: uid,
    });
    // const user = await getData({ key: "user" });
    console.log("user:", user);
    // return !user ? false : true;
    await storeData({ key: "user", value: user[0] });
    return true;
  } catch (e) {
    console.log("Error: LoginController.js loginUser:", e);
    return false;
  }
};
