const mongoose = require("mongoose");
const replySchema = new mongoose.Schema({
  reply: {
    type: String,
    max: [200, "Reply should not exceed above 200 words"],
    require: true,
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    require: [true, "A review must have a Post Id"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: [true, "A review must have a user Id"],
  },  
  images: [String],
  likedBy: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: {
      values: ["Failed", "Success", "Rejected", "Inprogress"],
      message: "Status should be either Success,Failed,Inprogress or Rejected ",
    },
  },
});

replySchema.pre(/^find/, function () {
  this.populate({ path: "user", select: "name _id profile role city" });
});
const Reply = mongoose.model("Reply", replySchema);
module.exports = Reply;
