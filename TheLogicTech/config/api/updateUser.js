import { auth } from '../firebase/firebase';

export default async function updateUser(user) {
	try {
		const updateUser = await fetch(
			`/api/user/${auth.currentUser.uid}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			}
		);
		const res = await updateUser.json();
		return res.ok;
	} catch (err) {
		console.log(err);
		return false;
	}
}
