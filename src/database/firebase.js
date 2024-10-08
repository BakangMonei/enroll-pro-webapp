import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Add Auth
import { getFirestore } from "firebase/firestore"; // Add Firestore
import { getDatabase } from "firebase/database"; // Add Realtime Database
import { getStorage } from "firebase/storage"; // Add Storage
import { collection } from "firebase/firestore"; // Add Firestore
import { query, where, getDocs } from "firebase/firestore";
import { getFunctions, httpsCallable } from 'firebase/functions';


const firebaseConfig = {
  apiKey: "AIzaSyBd-1L_b5TEE_PSuO4unXb3sLUNLybFeZ4",
  authDomain: "enrollpro-d4377.firebaseapp.com",
  databaseURL: "https://enrollpro-d4377-default-rtdb.firebaseio.com",
  projectId: "enrollpro-d4377",
  storageBucket: "enrollpro-d4377.appspot.com",
  messagingSenderId: "540942520449",
  appId: "1:540942520449:web:d0978c039eeeed840e7d80",
  measurementId: "G-YFK4R67QZY"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(firebaseApp); // Initialize Auth
const firestore = getFirestore(firebaseApp); // Initialize Firestore
const functions = getFunctions(firebaseApp); // Initialize Functions
const database = getDatabase(firebaseApp); // Initialize Realtime Database
const storage = getStorage(); // Initialize Storage without passing firebaseApp
const analytics = getAnalytics(firebaseApp);

export { auth, firestore, database, storage, functions, analytics, firebaseApp };
