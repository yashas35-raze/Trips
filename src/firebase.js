import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- ADD THIS

// TODO: Replace the following with your app's Firebase project configuration
// You can find this in your Firebase Console -> Project Settings
const firebaseConfig = {
  apiKey: "AIzaSyBfoPo8cfacrFmrnRN-mqAIDL2GDHuLOPc",
  authDomain: "trip-4402e.firebaseapp.com",
  projectId: "trip-4402e",
  storageBucket: "trip-4402e.firebasestorage.app",
  messagingSenderId: "676521659592",
  appId: "1:676521659592:web:ed63c8fb953c93bc98e9fd",
  measurementId: "G-QVS4BCT99Z"

};



const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);