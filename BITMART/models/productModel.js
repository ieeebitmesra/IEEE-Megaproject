const mongoose=require('mongoose')
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

const productSchema=new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [imageSchema],
  category: {
    type: String,
    required: [true, 'Please enter product category'],
  },
  type: {
    type: String,
    required: [true, 'Please Choose Buy Or Sell']
  },
  quantity: {
    type: Number,
    required: [true, 'Please enter product quantity'],
    default: 1,
  },
  noOfReviews: {
    type: Number,
    default: 0,
  },
  creator:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator Not Specified']
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
});

module.exports=mongoose.model("Products", productSchema);
