// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqM2dCzxtj0fjmzJC58bjMAA4ctTW5CR4",
  authDomain: "reactsocialmediaapp27.firebaseapp.com",
  projectId: "reactsocialmediaapp27",
  storageBucket: "reactsocialmediaapp27.appspot.com",
  messagingSenderId: "1020743680752",
  appId: "1:1020743680752:web:47b8b583af0f7f180bb835"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage=getStorage(app);