import { signOut } from 'firebase/auth';
import { auth } from './firebase';

export default async function logOut() {
	try {
		await signOut(auth);
	} catch (err) {
		alert('Error signing out. Please try again later.');
		console.log(err);
	}
}