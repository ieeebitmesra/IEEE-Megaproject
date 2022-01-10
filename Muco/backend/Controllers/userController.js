const User = require("./../Models/userModels");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("./../utlis/catchAsync");
const AppError = require("./../utlis/appError");

//// A middleWare that runs before signing up, It will check weather the user exists or not
///If the user exists but mailID not verified then that user will be deleted
exports.DoesUserExist = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+verified"
  );
  if (user) {
    if (!user.verified) await User.deleteOne({ email: req.body.email });
    if (user.verified)
      return next(new AppError("User already exists, Kindly login", 400));
  }
  next();
});

/////A middleware that runs before login, to check users existence and to compare the password
exports.protect = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
    .select("+password")
    .select("+verified");
  if (!user) {
    return next(new AppError("Either MailID or Password Wrong ", 400));
  }
  let compare;
  if (user) {
    compare = await user.correctPassword(req.body.password, user.password);
    user.password = undefined;
    if (compare) {
      if (user.verified) return next();
      else return next(new AppError("Kindly verify you mailID ", 401));
    }
    if (!user || !compare)
      return next(new AppError("Either MailID or Password Wrong ", 401));
  }
});

////A middleware function that runs each time the loggen in user request for something
exports.checkJWT = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  //console.log(currentUser);
  if (!currentUser) return next(new AppError("Invalid User ", 401));

  ///To check if the JWT is issued, after the password is changed.
  if (currentUser.changedPasswordAfter(decoded.iat))
    return next(new AppError("Token Expired, Login again", 400));
  req._id = decoded.id;
  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      // console.log("Decoded", req.cookies.jwt);
      const token = req.cookies.jwt;
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decoded.id);
      //  console.log("hey", currentUser);
      if (!currentUser) return next();

      if (currentUser.changedPasswordAfter(decoded.iat)) return next();
      res.locals.user = currentUser;
    }
  } catch (err) {
    return next();
  }
  next();
});
