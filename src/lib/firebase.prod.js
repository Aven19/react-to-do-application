import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6m88t3hzHmnfFB9ieJ1mMi9yDTD_iJco",
  authDomain: "react-firebase-to-do-1c360.firebaseapp.com",
  projectId: "react-firebase-to-do-1c360",
  storageBucket: "react-firebase-to-do-1c360.appspot.com",
  messagingSenderId: "870982684713",
  appId: "1:870982684713:web:aa4ba6fe96039979facc38",
  measurementId: "G-D4VB289RNG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
