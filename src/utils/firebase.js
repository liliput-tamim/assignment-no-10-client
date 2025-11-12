import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCTI3s7VFveggcVmWW6AT8iNsacuZab8kY",
  authDomain: "assingment-no-10-client.firebaseapp.com",
  projectId: "assingment-no-10-client",
  storageBucket: "assingment-no-10-client.firebasestorage.app",
  messagingSenderId: "181766365925",
  appId: "1:181766365925:web:e71d2d1c6eb7da736dea0c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();