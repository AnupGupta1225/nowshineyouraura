import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC0yFwgraFlvxtikK6FmWvPHxKwMpdCKGI",
  authDomain: "now-shine-your-aura.firebaseapp.com",
  projectId: "now-shine-your-aura",
  storageBucket: "now-shine-your-aura.firebasestorage.app",
  messagingSenderId: "987525264332",
  appId: "1:987525264332:web:0e7eda4a0735d1d0bd6369",
  measurementId: "G-N3KEL0BZFZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
