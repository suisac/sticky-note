// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwM4mF_yRCDZ6-N34yraZn6fzgqvg6mx8",
  authDomain: "netflix-5ad9a.firebaseapp.com",
  projectId: "netflix-5ad9a",
  storageBucket: "netflix-5ad9a.appspot.com",
  messagingSenderId: "714113666718",
  appId: "1:714113666718:web:403d47900c0aa36979358f",
  measurementId: "G-5B2NMC9Y89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);