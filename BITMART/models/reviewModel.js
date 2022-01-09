const mongoose=require('mongoose');
const User=require('./user');

const imageSchema=new mongoose.Schema({
    public_id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
}
);

const reviewSchema=new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    images: [
        imageSchema
    ],
    date: {
        type: String,
        default: new Date(Date.now()).toDateString()+" "+new Date(Date.now()).toLocaleTimeString(),
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Review=new mongoose.model('Review', reviewSchema);

module.exports=Review;