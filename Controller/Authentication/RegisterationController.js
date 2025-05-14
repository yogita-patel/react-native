import { AddData } from "../AddAPIs/CommonAddAPI";
import { UserModel } from "../../Model/UserModel";
import { storeData } from "../../LocalStorage/SaveDataLocally";
import LoaderComponent from "../../Components/LoaderComponent";
import { showToast } from "../../Components/ToastComponent";
import { addUserID } from "../UpdateAPIs/CommonUpdate";
import { BusinessModel } from "../../Model/BuinessModel";
import Constants from "../../Constants/Strings";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import { getLocalUser } from "../global";

//--------------------- firebase registration ------------------------------------
const registerEmailPassword = async ({ email, password }) => {
  try {
    var userAuthId;
    const justRegistred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then(async (userCredential) => {
      console.log(userCredential.user.uid);
      userAuthId = userCredential.user.uid;
    });
    console.log("authId", userAuthId);
    return userAuthId;
  } catch (e) {
    if (error.code === "auth/email-already-in-use") {
      console.log("That email address is already in use!");
      showToast({
        description: "This email address is already in use!",
        message: e,
        type: "error",
      });
    } else if (error.code === "auth/invalid-email") {
      console.log("That email address is invalid!");
      showToast({
        description: "That email address is invalid!",
        message: e,
        type: "error",
      });
    } else if (error.code === "auth/weak-password") {
      console.log("Password should be at least 6 characters!");
      showToast({
        description: "Password should be at least 6 characters!",
        message: e,
        type: "error",
      });
    } else {
      console.log("error: registerEmailPassword", e);
      showToast({
        description: "Registration fail please try again later!",
        message: e,
        type: "error",
      });
    }
    return null;
  }
};

//-------------------------------- register user---------------------------------------
const Registration = async ({ values }) => {
  try {
    const authId = await registerEmailPassword({
      email: values.email,
      password: values.password,
    });
    if (authId) {
      console.log("auth registration success");
      var user = new UserModel({
        fullName: values.fullname,
        authID: authId,
        cityID: values.city,
        email: values.email,
        countryID: values.country,
        roleID: Constants.usersRole.citizen,
      });
      //--------------- register user in firebase collection----------------------
      const userDocRef = await AddData({
        collectionName: "Users",
        modelName: user.toJson(),
      });
      //add document id to the document itself
      await addUserID({
        docRef: userDocRef,
        EditData: { userID: userDocRef.id },
      });
      user.setUserID(userDocRef.id); //set userID to add into local user
    }

    // if (values.role == 1) {
    //   // for business
    //   var business = BusinessModel({
    //     businessName: values.bname,
    //     businessType: values.btype,
    //     businessAddress: values.baddress,
    //     businessContact: values.bcontact,
    //   });
    //   const BusDocref = await AddData({
    //     collectionName: "Business",
    //     modelName: business.toJson(),
    //   });
    //   //update document by adding buisness reference id
    //   await addUserID({
    //     docRef: BusDocref,
    //     EditData: { buisnessID: BusDocref.id },
    //   });
    //   //update document by adding user reference id and buisness id to the user table
    //   await addUserID({
    //     docRef: userDocRef,
    //     EditData: { buisnessID: BusDocref.id, userID: userDocRef.id },
    //   });
    //   user.setBusinessId(BusDocref.id);
    //   user.setUserID(userDocRef.id);
    // }

    //stored user object in local storage
    await storeData({ key: "user", value: user.toJson() });
    const user2 = await getLocalUser(); //get user data from local storage
    console.log("isLogin = ", user2);
    return true;
  } catch (e) {
    console.log("error: Registration", e);
    return false;
  }
};

//called when user press register button
export const onRegister = async (values) => {
  try {
    console.log("register:", values);

    const isRegister = await Registration({ values: values });

    if (isRegister) {
      showToast({
        description: "Registration successful!",
        message: "Success",
      });
      return true;
    } else {
      showToast({
        description: "Registration fail please try again later!",
        message: "Error",
        type: "error",
      });
      return false;
    }
  } catch (e) {
    console.log("Error: RegisterScreen.js onRegister:", e);
    return false;
  }
};

// const addUserData = async ({ email, password, roleId }) => {
//   try {
//     var userAuthId;
//     await createUserWithEmailAndPassword(auth, email, password).then(
//       async (userCredential) => {
//         console.log(userCredential.user.uid);
//         userAuthId = userCredential.user.uid;
//       }
//     );
//     return userAuthId;
//   } catch (e) {
//     console.log("error: registerEmailPassword", e);
//   }
// };
