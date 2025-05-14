import AsyncStorage from "@react-native-async-storage/async-storage";

//---------------------store data to async --------------------------------
export const storeData = async ({ key, value }) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log("stored:", key, value);
  } catch (e) {
    console.log("Error in SaveDataLoacally.js - storeData", e);
  }
};
