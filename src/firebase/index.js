

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCviosdBly9KJ5xq13KCBdbX8Xe_PjPWZY",
  authDomain: "time-tracker-ac459.firebaseapp.com",
  projectId: "time-tracker-ac459",
  storageBucket: "time-tracker-ac459.appspot.com",
  messagingSenderId: "698618010713",
  appId: "1:698618010713:web:e2ab61b5be2981ba94a548",
  measurementId: "G-QGFN1C8XK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};