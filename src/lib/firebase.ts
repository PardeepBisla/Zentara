import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if config is valid (at least API Key and Project ID)
// Also ensure they aren't placeholder strings and look like real Firebase keys
const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey.startsWith("AIza") &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== "" &&
  !firebaseConfig.projectId.includes("YOUR_")
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    
    // Initialize services individually to prevent one failure from blocking others
    try {
      auth = getAuth(app);
    } catch (e) {
      console.warn("Firebase Auth initialization failed (likely invalid API key):", e);
    }
    
    try {
      db = getFirestore(app);
    } catch (e) {
      console.warn("Firebase Firestore initialization failed:", e);
    }
    
    try {
      storage = getStorage(app);
    } catch (e) {
      console.warn("Firebase Storage initialization failed:", e);
    }
  } catch (error) {
    console.error("Failed to initialize Firebase App:", error);
  }
} else {
  console.warn("Firebase is not configured or has invalid credentials. Please add your real Firebase credentials to the environment variables.");
}

export { app, auth, db, storage, isFirebaseConfigured };
