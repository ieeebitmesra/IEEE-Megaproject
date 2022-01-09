import dbConnect from '../../../db/utils/dbConnect';
import User from '../../../db/model/User';
import UserEvents from '../../../db/model/UserEvents';

export default async function createUserHandler(req, res) {
	await dbConnect();

	const { method } = req;
	const { uid, email, displayName, phoneNumber, photoURL } = req.body;

	switch (method) {
		case 'POST':
			try {
				// Check if user already exists
				const user = await User.findOne({ uid });

				if (user) {
					res.status(200).json({
						ok: true,
						message: 'User already exists',
					});
				} else {
					// Create user
					const newUser = await User.create({
						uid,
						email,
						displayName: displayName || '',
						phoneNumber: phoneNumber || '',
						photoURL: photoURL || '',
						gender: '',
						city: '',
						state: '',
						dob: '',
					});
					const newEvent = await UserEvents.create({
						uid,
						wedding: [],
						corporate: [],
						birthday: [],
						social: [],
					});

					newUser.save();
					newEvent.save();

					res.status(201).json({
						ok: true,
						message: 'User created',
					});
				}
			} catch (err) {
				res.status(400).json({
					ok: false,
					message: `User could not be added. Error: ${err}`,
				});
			}
			break;

		default:
			res.status(403).json({ error: 'ACCESS DENIED' });
			break;
	}
}
