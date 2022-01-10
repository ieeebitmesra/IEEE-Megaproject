const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    discription: {
      type: String,
      required: true,
      minlength: [10, "Discription shall be atleast of 10 words"],
      maxlength: [200, "Discription shall not exceed above 200 words"],
    },
    images: [String],
    //require: true,

    address: {
      type: String,
      required: true,
    },
    city: {
      type: mongoose.Schema.ObjectId,
      ref: "City",
    },
    cityName: {
      type: mongoose.Schema.ObjectId,
      ref: "City",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    coordinate_lng: {
      type: Number,
      required: true,
    },
    coordinate_lat: {
      type: Number,
      required: [true, "Please Click on the location in map"],
    },
    address: {
      type: String,
      required: [true, "Please provide the Address"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Inprogress",
        "Failed",
        "Success",
        "Rejected",
      ],
      default: "Pending",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
postSchema.index({ createdAt: -1 });
postSchema.virtual("reply", {
  ref: "Reply",
  foreignField: "post",
  localField: "_id",
});
postSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name _id profile city" }).populate({
    path: "cityName",
    select: "name _id",
  });
  next();
});
postSchema.methods.populateReply = function () {
  this.constructor.populate({ path: "reply" });
};
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
