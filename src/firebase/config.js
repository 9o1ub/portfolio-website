import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyD0PhJEDBo6UZ1ljgxqey_os_HUoRXQ98o",
  authDomain: "visitka-a3048.firebaseapp.com",
  projectId: "visitka-a3048",
  storageBucket: "visitka-a3048.firebasestorage.app",
  messagingSenderId: "1021711554367",
  appId: "1:1021711554367:web:a30951d7600ffad54ee58a",
  measurementId: "G-EG34XJ5CCT"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app; 