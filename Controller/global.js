import { getData } from "../LocalStorage/GetLocalData";

export const getLocalUser = async () => {
  try {
    // console.log("getLocalUser:");
    const user = await getData({ key: "user" });
    // console.log("user:", user);
    return user;
  } catch (e) {
    console.log("Error: global.js getLocalUser:", e);
    return null;
  }
};

export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getMonth = (monthNumber) => {
  // const monthNumber = selectedDate.month;
  const date = new Date(2023, monthNumber - 1);
  const monthName = date.toLocaleString("default", { month: "long" });
  return monthName;
};
