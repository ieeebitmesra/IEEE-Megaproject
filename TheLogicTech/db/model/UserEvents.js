import { Schema, model, models } from 'mongoose';

const UserEventsSchema = new Schema({
	uid: {
		type: String,
		required: [true, 'UID required'],
		unique: true,
	},
	wedding: {
		type: Schema.Types.Mixed,
	},
	corporate: {
		type: Schema.Types.Mixed,
	},
	birthday: {
		type: Schema.Types.Mixed,
	},
	social: {
		type: Schema.Types.Mixed,
	},
});

export default models.User_Events || model('User_Events', UserEventsSchema);
