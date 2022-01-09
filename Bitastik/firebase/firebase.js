import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider,signOut } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDY1yumA4ZaW_uj3V0Jagk1HCo0Tbyc7_c",
    authDomain: "bitastik.firebaseapp.com",
    projectId: "bitastik",
    storageBucket: "bitastik.appspot.com",
    messagingSenderId: "408403849859",
    appId: "1:408403849859:web:4d6ce06965787c5cdc21b6"
};

export let app;
if (!getApps().length) {
	app = initializeApp(firebaseConfig);
} else {
	app = getApp();
}

export const auth = getAuth();

const googleAuthProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
	await signInWithPopup(auth, googleAuthProvider);
}
export async function signOutFromGoogle() { 
    await signOut(auth,googleAuthProvider);
 }