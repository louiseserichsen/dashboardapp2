// src/firebase.js

// 🔹 Firebase imports
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// 🔹 Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyAxtidbOISqb7iUEdve5rHSgd_CDUOG1es",
  authDomain: "dashboard-app-76626.firebaseapp.com",
  projectId: "dashboard-app-76626",
  storageBucket: "dashboard-app-76626.appspot.com", // ✅ korrekt
  messagingSenderId: "570475160516",
  appId: "1:570475160516:web:52d0c16dc224bdb813fa91",
  measurementId: "G-JGQSF5ED09",
};

// 🔹 Initialiser Firebase App
const app = initializeApp(firebaseConfig);

// 🔹 Initialiser Analytics (kun i browser)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// 🔹 Auth og Firestore skal komme fra samme app
export const auth = getAuth(app);
export const db = getFirestore(app);

// 🔹 Eksporter Analytics og app
export { analytics };
export default app;
