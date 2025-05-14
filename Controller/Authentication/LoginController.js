import { getData } from "../../LocalStorage/GetLocalData";
import { auth } from "../../Firebase/Firebase";
import { fetchByCondition } from "../FetchAPIs/coomonFetch";
import { signInWithEmailAndPassword } from "firebase/auth";
import { storeData } from "../../LocalStorage/SaveDataLocally";
import { showToast } from "../../Components/ToastComponent";
//------------------------------ check is user logged in------------------------------
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

//------------------------------ login user method------------------------------
export const loginUser = async (values) => {
  try {
    console.log("loginUser:", values);
    //firebase in build method for login
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
    //store user in local storage
    await storeData({ key: "user", value: user[0] });
    return user[0];
  } catch (error) {
    console.log("Error: LoginController.js loginUser:", error);
    if (error.code === "auth/user-not-found") {
      showToast({
        description: "This email is not registered. Please sign up",
        message: "Error",
        type: "error",
      });
    } else if (error.code === "auth/wrong-password") {
      showToast({
        description: "Please enter the correct password.",
        message: "Error",
        type: "error",
      });
    } else if (error.code === "auth/invalid-credential") {
      showToast({
        description: "Please enter a valid credential.",
        message: "Error",
        type: "error",
      });
    } else {
      showToast({
        description: "Something went wrong. Please try again.",
        message: "Error",
        type: "error",
      });
      console.error(error);
    }
    return null;
  }
};
