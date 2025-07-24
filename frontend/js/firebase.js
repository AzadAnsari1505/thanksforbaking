import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ✅ Add this line for Firestore
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-EZLExP5B-5EG-452YWyf-ZfrRdpAYwA",
  authDomain: "cake-aa012.firebaseapp.com",
  projectId: "cake-aa012",
  storageBucket: "cake-aa012.appspot.com",
  messagingSenderId: "815896537972",
  appId: "1:815896537972:web:e116078a86b7ee30b39a21",
  measurementId: "G-PBM6MB731S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Create Firestore instance

// ✅ Export db also
export {
  auth,
  db, // 👈 ADD THIS
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
};
