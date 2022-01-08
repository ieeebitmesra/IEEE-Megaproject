
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import{getAuth} from 'firebase/auth'
import {getStorage } from 'firebase/storage'

const Config = {
  apiKey: "AIzaSyAPx6rsWUyNy7uJMGdRwck_evPgek_lxPE",
  authDomain: "clonedevlooperproject.firebaseapp.com",
  projectId: "clonedevlooperproject",
  databaseURL: 'https://clonedevlooperproject-default-rtdb.firebaseio.com/',
  storageBucket: "clonedevlooperproject.appspot.com",
  messagingSenderId: "913088868171",
  appId: "1:913088868171:web:e7487d2a67114ba04f02ce",
  measurementId: "G-XYW1E1GGFS"

};

const app = initializeApp(Config);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);

export  {db,auth,storage}
