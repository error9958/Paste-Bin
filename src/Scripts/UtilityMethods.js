import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

function passwordGenerator() {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var passwordLength = 12;
  var password = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
}

export async function SignIn(email, password, flag) {
  try {
    flag
      ? setPersistence(auth, browserLocalPersistence)
      : setPersistence(auth, browserSessionPersistence);
    const user = await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (e) {
    console.log(e.code);
    return e.code;
  }
}

export async function SignUp(userName, email, password, flag) {
  try {
    setPersistence(auth, browserSessionPersistence);
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: userName, email });
    return true;
  } catch (e) {
    console.log(e.code);
    return e.code;
  }
}

export async function createPaste(title, paste, flag, createdBy) {
  try {
    const password = passwordGenerator();
    await setDoc(doc(db, "UserPastes", password), {
      title,
      paste,
      flag,
      createdBy,
      createdOn: Timestamp.now(),
      id: password,
    });
    return password;
  } catch (e) {
    console.log(e);
  }
}

export function timeSince(time) {
  var timeStamp = new Date(time * 1000);
  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp) / 1000;
  if (secondsPast < 60) {
    return parseInt(secondsPast) + " Sec ago";
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + " Min ago";
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + " Hrs ago";
  }
  if (secondsPast > 86400) {
    const day = timeStamp.getDate();
    const month = timeStamp
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(" ", "");
    const year =
      timeStamp.getFullYear() == now.getFullYear()
        ? ""
        : " " + timeStamp.getFullYear();
    return day + " " + month + year;
  }
}

export async function findPaste(code) {
  try {
    const data = (await getDoc(doc(db, "UserPastes", code))).data();
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function deletePaste(code) {
  try {
    deleteDoc(doc(db, "UserPastes", code));
    return true;
  } catch (e) {
    console.log(e.message);
    return false;
  }
}

export async function updatePaste(code, newPaste) {
  try {
    await updateDoc(doc(db, "UserPastes", code), { paste: newPaste });
  } catch (e) {
    console.log(e.message);
  }
}

export function getError(errorCode) {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Email is already in use !";
    case "auth/weak-password":
      return "Weak password !";
    case "auth/wrong-password":
      return "Incorrect password !";
    case "auth/user-not-found":
      return "User not found !";
    default:
      return "Something went wrong,try again !";
  }
}
