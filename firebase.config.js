// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "countries-list-37587.firebaseapp.com",
  databaseURL:
    "https://countries-list-37587-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "countries-list-37587",
  storageBucket: "countries-list-37587.appspot.com",
  messagingSenderId: "955055302746",
  appId: "1:955055302746:web:530265adeb52d592521063",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { app, database };
