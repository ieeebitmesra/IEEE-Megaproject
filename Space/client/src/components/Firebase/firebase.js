// import firebase from "firebase";
import firebase from 'firebase/compat/app';
import "firebase/compat/database";


const firebaseConfig = {
   apiKey: process.env.REACT_APP_API_KEY,
   authDomain: process.env.REACT_APP_AUTHD,
   projectId: process.env.REACT_APP_PRO_ID,
   storageBucket: process.env.REACT_APP_STOREB ,
   messagingSenderId: process.env.REACT_APP_MSG_ID ,
   appId: process.env.REACT_APP_ID
};
// eslint-disable-next-line
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
var firebaseOrdersCollection = db.ref('Interview_details');

export default firebaseOrdersCollection;