// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDfVXLOP2x9XZw61-3CjKw-z_x1Lk5fdEo",
  authDomain: "recipe-book-d5784.firebaseapp.com",
  databaseURL: "https://recipe-book-d5784-default-rtdb.firebaseio.com",
  projectId: "recipe-book-d5784",
  storageBucket: "recipe-book-d5784.appspot.com",
  messagingSenderId: "781941941470",
  appId: "1:781941941470:web:342214d2ede45aad810e4f",
  measurementId: "G-N36K5J4T9S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const firestore = getFirestore(app);
const db = getDatabase(app);
const auth = getAuth(app);
export { auth, app, analytics, storage, firestore, db };
