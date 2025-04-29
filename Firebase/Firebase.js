// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-yeQQIJzKstGC0XUpRc0k-CFYhfbQeiw",
  authDomain: "bethelcity-df532.firebaseapp.com",
  projectId: "bethelcity-df532",
  storageBucket: "bethelcity-df532.firebasestorage.app",
  messagingSenderId: "99949190225",
  appId: "1:99949190225:web:e30d8b50f85d3bbd7dac70",
  measurementId: "G-7LMTY8VSNM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persitance: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
