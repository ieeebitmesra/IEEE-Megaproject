const mongoose = require("mongoose");
const multer = require("multer");
const sharp = require("sharp");
const Reply = require("./../Models/replyModel");
const AppError = require("./../utlis/appError");
const catchAsync = require("../utlis/catchAsync");
const User = require("./../Models/userModels");
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadReplyImages = upload.fields([{ name: "images", maxCount: 3 }]);

exports.resizeReplyImages = catchAsync(async (req, res, next) => {
  const user = await User.findById(req._id).select("role");
  if (user.role == "admin") {
    if (!req.files.images)
      return next(new AppError("You must provide at least one image", 400));
  }

  if (!req.files.images) return next();
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `reply-${req.params.postId}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${filename}`);

      req.body.images.push(filename);
    })
  );
  next();
});

exports.postReply = catchAsync(async function (req, res, next) {
  req.body.user = req._id;
  req.body.post = req.params.postId;
  const reply = await Reply.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Reply posted",
    data: {
      reply,
    },
  });
});

exports.deleteReply = catchAsync(async function (req, res, next) {
  const reply = await Reply.findById(req.params.replyId);
  if (!reply) return next(new AppError("No reply found with this Id", 400));
  if (reply.user._id != req._id)
    return next(
      new AppError("You don't have access to delete this reply", 400)
    );
  await Reply.findByIdAndDelete(req.params.replyId);
  res.status(200).json({
    status: "success",
    message: "Your reply is deleted",
  });
});

exports.likeReply = catchAsync(async function (req, res, next) {
  const reply = await Reply.findById(req.params.replyId);
  if (!reply) return next(new AppError("No reply available", 400));
  const user = await User.findById(req._id);
  let likedby = reply.likedBy;
  if (!likedby.includes(req._id)) {
    reply.likedBy = [req._id, ...likedby];
    reply.likes = reply.likes + 1;
    await reply.save({ validateBeforeSave: false });
  }
  res.status(200).json({
    status: "success",
    message: "reply Liked",
    data: {
      name: user.name,
    },
  });
  next();
});
exports.dislikeReply = catchAsync(async function (req, res, next) {
  reply = await Reply.findById(req.params.replyId);
  if (!reply) return next(new AppError("No reply available", 400));
  let likedby = reply.likedBy;
  if (likedby.includes(req._id)) {
    const liked = likedby.filter((el) => el != req._id);
    reply.likedBy = [...liked];
    reply.likes = reply.likes - 1;
    await reply.save({ validateBeforeSave: false });
  }
  res.status(200).json({
    status: "success",
    message: "Reply Disliked",
  });
});
exports.getOneReply = async (req, res, get) => {
  reply = await Reply.findById(req.params.replyId);
  if (!reply) return next(new AppError("No reply available", 400));
  console.log(reply);
  res.status(200).json({
    status: "success",
    message: "Reply recieved",
    data: {
      post: reply,
    },
  });
};
