import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ainotes-523b5.firebaseapp.com",
  projectId: "ainotes-523b5",
  storageBucket: "ainotes-523b5.firebasestorage.app",
  messagingSenderId: "70382541078",
  appId: "1:70382541078:web:23a580bec92208ac121837"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export {auth, provider}