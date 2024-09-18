// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, initializeAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQoXE8FA1yfbSzBn8McFCaAiqpaKgzJhQ",
  authDomain: "japan-job-8a6a9.firebaseapp.com",
  projectId: "japan-job-8a6a9",
  storageBucket: "japan-job-8a6a9.appspot.com",
  messagingSenderId: "679603811274",
  appId: "1:679603811274:web:dac851f48b03c4ce329533",
  measurementId: "G-FXXFD86QWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence
});

// Alternatively, you can use getAuth for simpler cases
// const auth = getAuth(app);
// auth.setPersistence(browserLocalPersistence);


const db = getFirestore(app);

const userRef = collection(db, "users");
const roomRef = collection(db, "rooms");

export { auth, db, userRef, roomRef };