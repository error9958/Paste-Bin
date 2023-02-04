import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAn9kdDQ2qU3uCELliHQikr9o5hV-xeDs",
  authDomain: "pracpurpose-ee73f.firebaseapp.com",
  projectId: "pracpurpose-ee73f",
  storageBucket: "pracpurpose-ee73f.appspot.com",
  messagingSenderId: "458592625661",
  appId: "1:458592625661:web:64713c663880a699cd2f94",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
