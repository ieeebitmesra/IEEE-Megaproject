import { Schema, model, models } from 'mongoose';

const VenueSchema = new Schema({ // 9 - keys
	id: {
		type: String,
		unique: true,
	},
	value: {
		type: String,
		required: [true, 'No value'],
	},
	address: {
		type: String,
		required: [true, 'No address'],
	},
	city: {
		type: String,
		required: [true, 'No city'],
	},
	ratings: {
		type: Number,
		required: [true, 'No ratings'],
		default: 0,
	},
	capacity: {
		type: String,
		required: [true, 'No capacity'],
	},
	veg: {
		type: Number,
		required: [true, 'No veg'],
	},
	nonveg: {
		type: Number,
		required: [true, 'No nonveg'],
	},
	display: {
		type: String,
		required: [true, 'No display'],
	},
	bookings: {
		type: Schema.Types.Mixed,
		required: [true, 'No bookings'],
		default: [],
	},
});

export let WeddingVenue = models.Wedding_Venue || model('Wedding_Venue', VenueSchema);
export let SocialVenue = models.Social_Venue || model('Social_Venue', VenueSchema);
export let BirthdayVenue = models.Birthday_Venue || model('Birthday_Venue', VenueSchema);
export let CorporateVenue = models.Corporate_Venue || model('Corporate_Venue', VenueSchema);


