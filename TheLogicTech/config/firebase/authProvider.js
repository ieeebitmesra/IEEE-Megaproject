import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from './firebase';

const googleAuthProvider = new GoogleAuthProvider();
const fbAuthProvider = new FacebookAuthProvider();

export async function signInWithGoogle() {
	await signInWithPopup(auth, googleAuthProvider);
}

export async function signInWithFb() {
	await signInWithPopup(auth, fbAuthProvider);
}

export async function registerUser(email, password) {
	await createUserWithEmailAndPassword(auth, email, password);
}

export async function loginUser(email, password) {
	await signInWithEmailAndPassword(auth, email, password);
}

export async function signInMethods(email) {
	return await fetchSignInMethodsForEmail(auth, email);
}

