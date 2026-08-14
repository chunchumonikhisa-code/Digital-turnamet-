// ===============================
// BD SOCIAL - FIREBASE CONFIG
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
  getStorage
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

import {
  getAnalytics
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";


// Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyAqd6NT4u3gd5vgt4-fYZpWV_dasArLV_o",

  authDomain:
    "bd-social-c033a.firebaseapp.com",

  projectId:
    "bd-social-c033a",

  storageBucket:
    "bd-social-c033a.firebasestorage.app",

  messagingSenderId:
    "836946205931",

  appId:
    "1:836946205931:web:4a1651ebe1c64093c032ae",

  measurementId:
    "G-9E5JVMCFVZ"
};


// Initialize Firebase
const app =
  initializeApp(firebaseConfig);


// Authentication
const auth =
  getAuth(app);


// Firestore Database
const db =
  getFirestore(app);


// Storage
const storage =
  getStorage(app);


// Analytics
let analytics = null;

try {

  analytics =
    getAnalytics(app);

} catch(error) {

  console.log(
    "Analytics unavailable:",
    error.message
  );

}


// Export
export {
  app,
  auth,
  db,
  storage,
  analytics
};
