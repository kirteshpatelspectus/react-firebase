// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtqfEuuN3Nv2xe4WNrHtTQ77g-1N130I0",
  authDomain: "react-curd-286c2.firebaseapp.com",
  projectId: "react-curd-286c2",
  storageBucket: "react-curd-286c2.appspot.com",
  messagingSenderId: "419215581006",
  appId: "1:419215581006:web:2429bb326241d0b860881f",
  measurementId: "G-TEP743WJHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
