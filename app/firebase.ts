// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv2oBvJbTgtBdl-c0uah1qeGHvCU_rhvs",
  authDomain: "bonvoyage-sns.firebaseapp.com",
  projectId: "bonvoyage-sns",
  storageBucket: "bonvoyage-sns.appspot.com",
  messagingSenderId: "303650069475",
  appId: "1:303650069475:web:8fd1ab88d09e24636e1ed6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
