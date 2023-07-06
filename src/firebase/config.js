import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnhERZBEZFZbq083BBMorEkEyWfGEanJs",
  authDomain: "firstreactnativeproject-a42b1.firebaseapp.com",
  databaseURL:
    "https://firstreactnativeproject-a42b1-default-rtdb.firebaseio.com",
  projectId: "firstreactnativeproject-a42b1",
  storageBucket: "firstreactnativeproject-a42b1.appspot.com",
  messagingSenderId: "85662034139",
  appId: "1:85662034139:web:8e5eefbd8be6af23d4c4fe",
  measurementId: "G-BTZ73QZ717",
};

const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
