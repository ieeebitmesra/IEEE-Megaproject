const mongoose = require("mongoose");
const City = require("./../Models/cityModel");
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
    minlength: [10, "Minimum length of review shall be 10"],
    maxlength: [100, "Maximum length of review shall be 100"],
  },
  rating: {
    type: Number,
    require: true,
    min: [1, "Minimum rating shall be one"],
    max: [5, "Maximum rating shall be 5"],
  },
  image: [String],
  city: {
    type: mongoose.Schema.ObjectId,
    ref: "City",
    require: true,
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    require: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
reviewSchema.index({ post: 1, user: 1 }, { unique: true });
reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name profile _id city" });
  next();
});

reviewSchema.statics.calcAverageRating = async function (cityId) {
  const stats = await this.aggregate([
    {
      $match: { city: cityId },
    },
    {
      $group: {
        _id: "$city",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  if (stats.length > 0) {
    await City.findByIdAndUpdate(cityId, {
      numberRating: stats[0].nRating,
      averageRating: stats[0].avgRating,
    });
  } else {
    await City.findByIdAndUpdate(cityId, {
      numberRating: 0,
      averageRating: 4.5,
    });
  }
};
reviewSchema.pre("save", function (next) {
  this.constructor.calcAverageRating(this.city);
  next();
});

reviewSchema.pre(/^findByIdAnd/, async function (next) {
  this.rev = await this.findOne();
  // console.log(this.r);
  next();
});

reviewSchema.post(/^findByIdAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.rev.constructor.calcAverageRatings(this.rev.tour);
  next();
});

//reviewSchema.post(/^findByIdAnd/, function () {});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
