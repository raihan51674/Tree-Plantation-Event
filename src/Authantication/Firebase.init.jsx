// firebase.init.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration using Vite environment variables
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_apiKey,
  // authDomain:import.meta.env.VITE_authDomain,
  // projectId: import.meta.env.VITE_projectId,
  // storageBucket: import.meta.env.VITE_storageBucket,
  // messagingSenderId: import.meta.env.VITE_messagingSenderId,
  // appId: import.meta.env.VITE_appId,
   apiKey: "AIzaSyBUjmqLPrTfTIfh5myH4Nc4loHdhCtCXQI",
  authDomain: "freelance-task-marketpla-cd9ed.firebaseapp.com",
  projectId: "freelance-task-marketpla-cd9ed",
  storageBucket: "freelance-task-marketpla-cd9ed.firebasestorage.app",
  messagingSenderId: "692215520961",
  appId: "1:692215520961:web:6b8fb0fea4fe748795fe40"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
