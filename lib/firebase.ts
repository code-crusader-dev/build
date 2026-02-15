import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCPoY53fAw2Wh39XNC2_F1DjYBIWDldbI4",
  authDomain: "driven-catalyst-487504-f5.firebaseapp.com",
  projectId: "driven-catalyst-487504-f5",
  storageBucket: "driven-catalyst-487504-f5.firebasestorage.app",
  messagingSenderId: "1052946637970",
  appId: "1:1052946637970:web:c0b97602c9293730bdf24b",
  measurementId: "G-QLFHKS9FD5"
};

// Initialize Firebase (singleton pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
