// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_6QlKX0iBbvPPNVGehNSH8ELz3-SJAt4",
  authDomain: "bd-food-distribution.firebaseapp.com",
  projectId: "bd-food-distribution",
  storageBucket: "bd-food-distribution.appspot.com",
  messagingSenderId: "289427369412",
  appId: "1:289427369412:web:640a4f94bbe31262c00891",
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
