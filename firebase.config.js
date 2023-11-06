// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "countries-list-37587.firebaseapp.com",
  projectId: "countries-list-37587",
  storageBucket: "countries-list-37587.appspot.com",
  messagingSenderId: "955055302746",
  appId: "1:955055302746:web:530265adeb52d592521063",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
