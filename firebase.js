// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import{getAuth} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRMbqJOWQjWGtzOzs4XQUSbg3g82Cg-gk",
  authDomain: "bitian-hub-e1f0c.firebaseapp.com",
  projectId: "bitian-hub-e1f0c",
  storageBucket: "bitian-hub-e1f0c.appspot.com",
  messagingSenderId: "869373426524",
  appId: "1:869373426524:web:221dd989241d6e702b1f99",
  measurementId: "G-2J7ES2N1WE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app);
export{db,auth}