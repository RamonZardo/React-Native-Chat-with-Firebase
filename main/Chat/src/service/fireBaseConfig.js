import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBBJVAjdIOS5erVi3P92W_9t7xXYKUQDRw",
  authDomain: "chat-real-time-eb554.firebaseapp.com",
  projectId: "chat-real-time-eb554",
  storageBucket: "chat-real-time-eb554.appspot.com",
  messagingSenderId: "377623711719",
  appId: "1:377623711719:web:73ddd80efb3e5018f63742",
  measurementId: "G-S37P9WHFGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getFirestore(app)