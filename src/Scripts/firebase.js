import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEz-ei2Ki4hily0CVcksAq2cS3x3YrotM",
  authDomain: "paste-bin-site.firebaseapp.com",
  projectId: "paste-bin-site",
  storageBucket: "paste-bin-site.appspot.com",
  messagingSenderId: "938810758019",
  appId: "1:938810758019:web:3e9917491f5b8169339cb6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
