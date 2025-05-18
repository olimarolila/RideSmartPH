// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // ✅ Add GoogleAuthProvider
import { getFirestore } from "firebase/firestore";

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
const db = getFirestore(app); // ✅ Create Firestore instance

export { app, analytics, auth, googleProvider, db }; // ✅ Export db