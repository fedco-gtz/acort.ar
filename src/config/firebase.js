import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpMmRCKcqAsXr6VlWYxB6jRqqElkW15vE",
  authDomain: "acortar-c0a70.firebaseapp.com",
  projectId: "acortar-c0a70",
  storageBucket: "acortar-c0a70.firebasestorage.app",
  messagingSenderId: "389893943368",
  appId: "1:389893943368:web:fc4afc207a007579fd287d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);