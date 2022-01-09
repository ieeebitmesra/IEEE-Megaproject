import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const createUser = () => {
	const contentType = 'application/json';
	onAuthStateChanged(auth, async (user) => {
		if (user) {
			try {
				const res = await fetch(
					`/api/createuser`,
					{
						method: 'POST',
						headers: {
							Accept: contentType,
							'Content-Type': contentType,
						},
						body: JSON.stringify(user),
					}
				);
				const status = await res.json();
				console.log(status.message);
			} catch (error) {
				console.log(error);
				console.log('Authentication failed. Cannot add user to database');
			}
		}
	});
}

export default createUser;
