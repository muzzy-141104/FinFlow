// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Environment-based configuration
const getFirebaseConfig = (): FirebaseOptions => {
  // For production (Vercel)
  if (process.env.NODE_ENV === 'production') {
    return {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "finflow-knjbt",
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:399972333112:web:4c2247d7d01879488558cd",
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "finflow-knjbt.firebasestorage.app",
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDG4-9PRKbPTFPa4vfK5_HXTKpHMROuhI0",
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "finflow-knjbt.firebaseapp.com",
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "399972333112",
    };
  }
  
  // For development
  return {
    projectId: "finflow-knjbt",
    appId: "1:399972333112:web:4c2247d7d01879488558cd",
    storageBucket: "finflow-knjbt.firebasestorage.app",
    apiKey: "AIzaSyDG4-9PRKbPTFPa4vfK5_HXTKpHMROuhI0",
    authDomain: "finflow-knjbt.firebaseapp.com",
    messagingSenderId: "399972333112",
  };
};

// Initialize Firebase for SSR
const firebaseConfig = getFirebaseConfig();
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
