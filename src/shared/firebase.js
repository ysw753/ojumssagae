import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCv43Gz_81K78MSbxt_9dsSfN5Dt5BqLus",
  authDomain: "ojumssagae-c8d28.firebaseapp.com",
  databaseURL:
    "https://ojumssagae-c8d28-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ojumssagae-c8d28",
  storageBucket: "ojumssagae-c8d28.appspot.com",
  messagingSenderId: "722775341077",
  appId: "1:722775341077:web:0dec2d9eecb2ae56bdb61c",
  measurementId: "G-9HS41WHJ7S",
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
