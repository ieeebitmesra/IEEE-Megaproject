import dbConnect from '../../../../db/utils/dbConnect';
import UserEvents from '../../../../db/model/UserEvents';

export default async function eventHandler(req, res) {
	dbConnect();

	const { method, body } = req;
	const { uid } = req.query;

	try {
		switch (method) {
			case 'POST':
				const user = await UserEvents.updateOne(
					{ uid },
					{
						$push: {
							[body.type]: body.event,
						},
					}
				).clone();

				if (!user) {
					return res.status(500).json({
						ok: false,
						message: 'Event not created',
					});
				} else {
					return res.status(200).json({
						ok: true,
						message: 'Event list updated',
					});
				}

			case 'GET':
				const event = await UserEvents.findOne({ uid });

				if (event) {
					return res.status(200).json({
						ok: true,
						message: 'Events retrieved',
						event,
					});
				} else {
					return res.status(404).json({
						ok: false,
						message: 'Events not found',
					});
				}

			case 'PUT':
				const query = `${body.type}.uid`;
				const updateQuery = `${body.type}.$.userRatings`;
				const ratingUpdate = await UserEvents.updateOne(
					{ [query]: body.uid },
					{ $set: { [updateQuery]: body.ratings } }
				).clone();

				if (!ratingUpdate) {
					return res.status(500).json({
						ok: false,
						message: 'Event not updated',
					});
				} else {
					return res.status(200).json({
						ok: true,
						message: 'Event updated',
					});
				}

			case 'DELETE':
				const deleteEvent = await UserEvents.updateOne(
					{ uid },
					{
						$pull: {
							[body.type]: {
								uid: body.uid,
							},
						},
					}
				).clone();

				if (!deleteEvent) {
					return res.status(500).json({
						ok: false,
						message: 'Event not deleted',
					});
				} else {
					return res.status(200).json({
						ok: true,
						message: 'Event deleted',
					});
				}

			default:
				res.status(400).json({
					ok: false,
					message: 'Bad request',
				});
				break;
		}
	} catch (error) {
		return res.status(500).json({
			ok: false,
			message: 'Internal server error',
		});
	}
}
