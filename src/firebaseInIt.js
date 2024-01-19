// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu6yEJ0S8krIKZxKFG6Zbyek6aOB-9Uzg",
  authDomain: "buybusy-df6d4.firebaseapp.com",
  projectId: "buybusy-df6d4",
  storageBucket: "buybusy-df6d4.appspot.com",
  messagingSenderId: "90189660336",
  appId: "1:90189660336:web:607c9bfab3621147593b75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
