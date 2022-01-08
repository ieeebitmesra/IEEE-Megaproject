import { auth } from '../firebase/firebase';

export default async function sendMail(guestlist, userEmail) {
	const emails = guestlist.map((guest) => guest.email);
	const contentType = 'application/json';
	try {
		const invite = await fetch(
			`/api/user/${auth.currentUser.uid}/invitation`,
			{
				method: 'POST',
				headers: {
					'Content-Type': contentType,
				},
				body: JSON.stringify({ emails, userEmail }),
			}
		);
		const res = await invite.json();
		return res.ok;
	} catch (e) {
		console.log(e);
		return false;
	}
}
