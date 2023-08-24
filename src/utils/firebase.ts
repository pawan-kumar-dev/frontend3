import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBx8KseYwgFGAxKJVI8Xvaz6hXf29a99Go",
  authDomain: "expensexpert-d47c6.firebaseapp.com",
  projectId: "expensexpert-d47c6",
  storageBucket: "expensexpert-d47c6.appspot.com",
  messagingSenderId: "921470244989",
  appId: "1:921470244989:web:c27d7b2f4330403e837914",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();

const userRef = collection(db, "user");

const taskRef = collection(db, "task");

const googleAuthProvider = new GoogleAuthProvider();

export { db, auth, taskRef, userRef, googleAuthProvider };
