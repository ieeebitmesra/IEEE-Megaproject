import dbConnect from '../../../db/utils/dbConnect';
import {
	WeddingVenue,
	BirthdayVenue,
	SocialVenue,
	CorporateVenue,
} from '../../../db/model/Venue';

export default async function createVenue(req, res) {
	await dbConnect();

	const { method } = req;
	const { type } = req.query;
	const { venue, id } = req.body;

	let Venue;
	switch (type) {
		case 'wedding':
			Venue = WeddingVenue;
			break;
		case 'birthday':
			Venue = BirthdayVenue;
			break;
		case 'social':
			Venue = SocialVenue;
			break;
		case 'corporate':
			Venue = CorporateVenue;
			break;
	}
	try {
		switch (method) {
			case 'GET':
				const venues = await Venue.find({});
				res.status(200).json({
					ok: true,
					message: 'Successfully fetched all venues',
					venues,
				});
				break;
			case 'POST':
				const addVenue = await Venue.create(venue);
				addVenue.save();
				res.status(201).json({
					ok: true,
					message: 'Venue created',
				});
				break;

			case 'DELETE':
				await Venue.deleteOne({ id });

				res.status(201).json({
					ok: true,
					message: 'Venue deleted',
				});
				break;

			default:
				res.status(405).json({ error: 'Invalid request' });
				break;
		}
	} catch (error) {
		res.status(500).json({ error });
	}
}
