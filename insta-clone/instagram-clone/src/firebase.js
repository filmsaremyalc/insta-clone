import fb from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseApp = fb.initializeApp({
  apiKey: "AIzaSyCJSCZRGFfyvbnKtKZu_JYDfkd24PPTv6g",
  authDomain: "instagram-clone-51c13.firebaseapp.com",
  databaseURL: "https://instagram-clone-51c13-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-51c13",
  storageBucket: "instagram-clone-51c13.appspot.com",
  messagingSenderId: "100439976643",
  appId: "1:100439976643:web:8f658fba67cb999977d076",
  measurementId: "G-58B83S0WQ9",
});

const db = firebaseApp.firestore();
const auth = fb.auth();
const storage = fb.storage();

export { db, auth, storage, fb };
