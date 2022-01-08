import { Schema, model, models } from 'mongoose';

const UserVenue = new Schema({
	uid: {
		type: String,
		required: [true, 'UID required'],
		unique: true,
	},
	venues: {
		type: Schema.Types.Mixed,
		default: [],
	},
});

export default models.user_venue || model('user_venue', UserVenue);
