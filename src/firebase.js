// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
<<<<<<< HEAD
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Add Firestore
=======
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // ✅ Add GoogleAuthProvider
import { getFirestore } from "firebase/firestore";
>>>>>>> 69fae736d4ac61308343c78102f4f62a7f53fa40

const firebaseConfig = {
  apiKey: "AIzaSyBLmRqEpmCWB8Z_yXlI1CajBFM2P0zDI3c",
  authDomain: "ridesmartph-a32b9.firebaseapp.com",
  projectId: "ridesmartph-a32b9",
  storageBucket: "ridesmartph-a32b9.firebasestorage.app",
  messagingSenderId: "113392120352",
  appId: "1:113392120352:web:17dcc475011f4cc8e84245",
  measurementId: "G-92R9ZRTJXF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
<<<<<<< HEAD
const db = getFirestore(app); // ✅ Initialize Firestore

export { app, analytics, auth, googleProvider, db };
=======
const db = getFirestore(app); // ✅ Create Firestore instance

export { app, analytics, auth, googleProvider, db }; // ✅ Export db
>>>>>>> 69fae736d4ac61308343c78102f4f62a7f53fa40
