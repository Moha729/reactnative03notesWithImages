// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk3XElg_fRAqB5-wnQA6vz012kR0zg6Sg",
  authDomain: "reactnativetest-46988.firebaseapp.com",
  projectId: "reactnativetest-46988",
  storageBucket: "reactnativetest-46988.appspot.com",
  messagingSenderId: "124911805737",
  appId: "1:124911805737:web:f809105ba334577a9b4338"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
export {app, database}