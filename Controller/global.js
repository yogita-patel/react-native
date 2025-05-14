import { getData } from "../LocalStorage/GetLocalData";
import Colors from "../Constants/Colors";

//------------------ get locally stored user -----------------
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

//--------------------- common date formate ------------------
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

//-----------------common time formate --------------------
export const formatTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

//--------------------- get month name by number --------------------------
export const getMonth = (monthNumber) => {
  // const monthNumber = selectedDate.month;
  const date = new Date(2023, monthNumber - 1);
  const monthName = date.toLocaleString("default", { month: "long" });
  return monthName;
};

function iosDateToFirestoreTimestamp(iosDateString) {
  return firestore.Timestamp.fromDate(new Date(iosDateString));
}

//----------------formate date string ------------------
export const dateStringFormat = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (isNaN(date)) return "";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

//------------------------ check date is greater than today ------------------------------

export const isTodayOrFuture = (dateString) => {
  if (!dateString) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, month, day] = dateString.split("-");
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);

  return date > today;
};

//----------------------------- check date is today ---------------------
export const isToday = (dateString) => {
  if (!dateString) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, month, day] = dateString.split("-");
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);

  return date == today;
};

//------------------- get today date as string -----------------------------------
export const getTodayDateString = ({ today }) => {
  // const today = date?: new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

//-------------------- appointment status color change dynamically----------------------
export const getStatusColor = (status) => {
  switch (status) {
    case "Booked":
      return Colors.commonGreen;
    case "Completed":
      return Colors.commonblue;
    case "Cancelled":
      return Colors.commonRed;
    default:
      return "#000";
  }
};

//---------------------- get greeting of the day-------------------
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  else if (hour < 17) return "Good Afternoon";
  else if (hour < 20) return "Good Evening";
  else return "Good Night";
};
