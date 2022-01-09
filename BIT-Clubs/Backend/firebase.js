import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import {initializeAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKaYv5k8zSN_5r_sRu62dQXcSiMHjWMNA",
  authDomain: "bitclubs.firebaseapp.com",
  projectId: "bitclubs",
  storageBucket: "bitclubs.appspot.com",
  messagingSenderId: "869245796530",
  appId: "1:869245796530:web:db659f9ac75df7692849ab"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
const auth = getAuth();

export {auth}