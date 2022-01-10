const mongoose = require("mongoose");
const Reply = require("./../Models/replyModel");
const catchAsync = require("./../utlis/catchAsync");
const AppError = require("./../utlis/appError");
const User = require("./../Models/userModels");
const Post = require("./../Models/postModel");
const City = require("./../Models/cityModel");
exports.fixProblem = catchAsync(async function (req, res, next) {
  if (!req.body.status)
    return next(new AppError("You must provide the status of the work", 400));
  const user = await User.findById(req._id).select("+role");
  if (user.role == "user")
    return next(new AppError("Only Admin can give status of the work"));
  const post = await Post.findById(req.params.postId);
  if (String(user.cityId) !== String(post.city))
    return next(
      new AppError(
        "Only the Admin of the specific city can give status of the work"
      )
    );
  req.body.post = req.params.postId;
  req.body.user = req._id;
  post.status = req.body.status;
  const reply = await Reply.create(req.body);
  post.save({ validateBeforeSave: true });
  res.status(201).json({
    status: "success",
    message: "Your reply is sent",
    data: {
      reply,
    },
  });
});
