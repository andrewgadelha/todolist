import { getFirestore } from "firebase/firestore";




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdHHXLIhVP4VkPx2byb8PYQfwec6c2Wc0",
  authDomain: "todolist-e38da.firebaseapp.com",
  projectId: "todolist-e38da",
  storageBucket: "todolist-e38da.firebasestorage.app",
  messagingSenderId: "605791842615",
  appId: "1:605791842615:web:5d34ae26cf57a182f6aab2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
