// src/firebase.js

// Importer Firebase-funktioner
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Din Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyAxtidbOISqb7iUEdve5rHSgd_CDUOG1es",
  authDomain: "dashboard-app-76626.firebaseapp.com",
  projectId: "dashboard-app-76626",
  storageBucket: "dashboard-app-76626.firebasestorage.app",
  messagingSenderId: "570475160516",
  appId: "1:570475160516:web:52d0c16dc224bdb813fa91",
  measurementId: "G-JGQSF5ED09"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Analytics (valgfrit)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Eksporter auth og firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
export { analytics };
export default app;
