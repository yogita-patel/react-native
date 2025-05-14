import AsyncStorage from "@react-native-async-storage/async-storage";

//-------------------------- remove data from async storage -------------------------
export const removeData = async ({ key }) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log("Error in RomveLocalData.js - removeData", e);
  }
};
