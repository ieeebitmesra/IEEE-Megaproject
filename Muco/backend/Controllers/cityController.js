const mongoose = require("mongoose");
const catchAsync = require("./../utlis/catchAsync");
const AppError = require("./../utlis/appError");
const User = require("./../Models/userModels");
const City = require("./../Models/cityModel");
exports.protect = catchAsync(async function (req, res, next) {
  const city = await City.findOne({ name: req.body.name });
  if (req.body.secretcode !== process.env.SECRET_CODE)
    return next(new AppError("Invalid secret code", 401));
  if (!city) return next(new AppError("The city is not yet registered", 400));
  const compare = city.comparePassword(req.body.password, city.password);
  if (!compare) return next(new AppError("Invalid Password", 401));
  next();
});
exports.registeradmin = catchAsync(async function (req, res, next) {
  const city = await City.findOne({ name: req.body.name });
  const admin = city.admin;
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("User not found", 400));
  const id = user._id;
  city.admin = [...admin, id];
  user.role = "admin";
  user.save({ validateBeforeSave: false });
  await city.save({ validateBeforeSave: false });
  res.status(201).json({
    status: "success",
    message: "Admins added",
  });
  next();
});
exports.getCity = catchAsync(async function (req, res, next) {
  const city = await City.find();

  res.status(200).json({
    status: "success",
    message: "list of all registered cities",
    data: {
      city,
    },
  });
});
exports.getOneCity = catchAsync(async function (req, res, next) {
  const city = await City.findById(req.params.id).populate({
    path: "reviews",
    select: "review rating user createdAt",
    options: { sort: { createdAt: -1 } },
  });
  res.status(200).json({
    status: "success",
    message: "City with all the reviews",
    data: {
      city,
    },
  });
});

exports.getRating = catchAsync(async function (req, res, next) {
  const city = await City.findById(req.params.cityId);
  city.password = undefined;
  res.status(200).json({
    status: "success",
    message: "Rating of city",
    data: {
      city,
    },
  });
});
