import AsyncStorage from "@react-native-async-storage/async-storage";
export const getData = async ({ key }) => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log(key + value);
    return JSON.parse(value);
  } catch (e) {
    console.log("Error in dataAccees.js - getLoginData", e);
    return null;
  }
};
