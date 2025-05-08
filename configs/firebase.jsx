import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAeoXqlI2vVCUG3y-JW0n5iwbX1jeh2ijg",
  authDomain: "th-react-native.firebaseapp.com",
  projectId: "th-react-native",
  storageBucket: "th-react-native.firebasestorage.app",
  messagingSenderId: "246088405141",
  appId: "1:246088405141:web:25b0b5711988ee9b534b9c",
  measurementId: "G-1HLQVRGLRL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Lấy instance Firestore
export const auth = getAuth(app);
