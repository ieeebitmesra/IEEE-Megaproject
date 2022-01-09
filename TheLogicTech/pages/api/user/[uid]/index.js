import dbConnect from '../../../../db/utils/dbConnect';
import User from '../../../../db/model/User';

export default async function userHandler(req, res) {
	await dbConnect();

	const { method } = req;
	const { uid } = req.query;

	try {
		const user = await User.findOne({ uid });
		switch (method) {
			case 'GET':
				if (user) {
					res.status(200).json({
						ok: true,
						message: `User ${method}`,
						user,
					});
				} else {
					res.status(404).json({
						ok: false,
						message: `User ${method} failed. User not found`,
					});
				}

				break;

			case 'PUT':
				if (user) {
					user.overwrite(req.body);
					user.save();

					res.status(200).json({
						ok: true,
						message: `User ${method}`,
						user,
					});
				} else {
					res.status(404).json({
						ok: false,
						message: `User ${method} failed. User not found`,
					});
				}

				break;
		}
	} catch (err) {
		res.status(500).json({
			ok: false,
			message: `User ${method} failed. ${err}`,
		});
	}
}
