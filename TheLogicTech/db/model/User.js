import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
	uid: {
		type: String,
		required: [true, 'UID required'],
		unique: true,
	},
	email: {
		type: String,
		required: [true, 'Email required'],
		unique: true,
	},
  displayName: {
    type: String,
  },
	phoneNumber: {
		type: String,
	},
	gender: {
		type: String,
	},
	city: {
		type: String,
	},
	state: {
		type: String,
	},
	dob: {
		type: Date,
	},
	photoURL: {
		type: String,
	},
});

export default models.User || model('User', UserSchema);
