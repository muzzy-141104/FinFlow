// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "finflow-knjbt",
  appId: "1:399972333112:web:4c2247d7d01879488558cd",
  storageBucket: "finflow-knjbt.firebasestorage.app",
  apiKey: "AIzaSyDG4-9PRKbPTFPa4vfK5_HXTKpHMROuhI0",
  authDomain: "finflow-knjbt.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "399972333112",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
