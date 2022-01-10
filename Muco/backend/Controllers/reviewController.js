const mongoose = require("mongoose");
const Review = require("./../Models/reviewModel");
const Post = require("./../Models/postModel");
const AppError = require("./../utlis/appError");
const catchAsync = require("./../utlis/catchAsync");
const City = require("./../Models/cityModel");
exports.checkUser = catchAsync(async function (req, res, next) {
  console.log("Check User");
  const post = await Post.findById(req.params.postId);
  if (req._id != post.user._id)
    return next(
      new AppError("Only the user who posted the problem can review it", 400)
    );
  next();
});
exports.getReview = catchAsync(async function (req, res, next) {
  const review = await Review.findOne({ post: req.params.postId });
  if (!review) return next(new AppError("No Review given for this Post", 400));
  res.status(200).json({
    status: "success",
    message: "Here is the Review",
    data: {
      review,
    },
  });
});
exports.postReview = catchAsync(async function (req, res, next) {
  console.log("Post Review");
  const post = await Post.findById(req.params.postId);
  req.body.user = req._id;
  req.body.post = req.params.postId;
  req.body.city = post.city;
  if (post.status == "Pending")
    return next(new AppError("You can't give feedback in pending stage", 400));
  if (post.status == "Accepted") {
    if (post.createdAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
      return next(
        new AppError(
          "You can't give feedback in Accepted state unless 30 days are passed",
          400
        )
      );
  }
  const review = await Review.create(req.body);
  console.log("Post Review 2", review);
  res.status(201).json({
    status: "success",
    message: "You feedback is posted",
    data: {
      review,
    },
  });
});

exports.updateReview = catchAsync(async function (req, res, next) {
  const restrictTo = ["review", "rating", "image"];
  const obj = {};
  Object.keys(req.body).forEach((el) => {
    if (restrictTo.includes(el)) {
      obj[el] = req.body[el];
    }
  });
  console.log(obj);
  const review = await Review.findByIdAndUpdate(req.params.reviewId, obj, {
    runValidators: true,
    new: true,
  });

  if (!review) return next(new AppError("No feedback found with that Id", 400));
  res.status(200).json({
    status: "success",
    message: "You feedback is updated",
    data: {
      review,
    },
  });
});
exports.deleteReview = catchAsync(async function (req, res, next) {
  const review = await Review.findByIdAndDelete(req.params.reviewId);
  if (!review) return next(new AppError("No feedback found with that Id", 400));
  res.status(200).json({
    status: "Success",
    message: "Your feedback is deleted",
  });
});
