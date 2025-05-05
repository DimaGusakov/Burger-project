import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBu09syy6PYU7hDZmNW-VLJ1RuToE315mw",
  authDomain: "login-d5e82.firebaseapp.com",
  databaseURL: "https://login-d5e82-default-rtdb.firebaseio.com",
  projectId: "login-d5e82",
  storageBucket: "login-d5e82.firebasestorage.app",
  messagingSenderId: "863966576777",
  appId: "1:863966576777:web:906e2396b3f6629fd60658",
  measurementId: "G-8MV553R0PH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
export { app, auth, db };