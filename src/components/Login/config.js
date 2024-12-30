import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzuPs_T9P9_sI3bN4lKhIiP8a0e82awQI",
  authDomain: "sportsdunia-f5229.firebaseapp.com",
  projectId: "sportsdunia-f5229",
  storageBucket: "sportsdunia-f5229.firebasestorage.app",
  messagingSenderId: "364008557406",
  appId: "1:364008557406:web:5112abd8389c8c84ce1dcf",
  measurementId: "G-E99Y7V1R9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};