import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
//---------------------- pick image from gallery ---------------------------
export const pickImage = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,

      allowsEditing: false,

      quality: 1,
    });
    return result;
  } catch (e) {
    console.log("Exception in uploadImage.js pickImage:", e);
    return null;
  }
};

//------------------------ upload image to firebase storage----------------
export const uploadImageFirebaseStorage = async ({
  imageUrl,
  imagePath = null,
}) => {
  try {
    console.log("Url ", imageUrl);
    var imageName;
    if (imagePath) {
      imageName = imagePath + `${Date.now()}_${imageUrl.split("/").pop()}`;
    } else {
      imageName = `buisness/buisness_Profile/${Date.now()}_${imageUrl
        .split("/")
        .pop()}`;
    }
    const storageRef = ref(getStorage(), imageName);

    const blob = await (await fetch(imageUrl)).blob();
    const uploadTask = uploadBytesResumable(storageRef, blob);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Uploading... ${progress.toFixed(0)}%`);
        },
        (error) => {
          console.log("Upload failed: " + error.message);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at:", downloadURL);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } catch (e) {
    console.log("Exception in uploadImage.js uploadImageFirebaseStorage:", e);
    return null;
  }
};
