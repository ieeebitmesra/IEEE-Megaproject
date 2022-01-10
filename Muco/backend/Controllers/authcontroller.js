const User = require("./../Models/userModels");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const crypto = require("crypto");
const Email = require("./../utlis/email");
const userController = require("./userController");
const catchAsync = require("./../utlis/catchAsync");
const AppError = require("./../utlis/appError");

////creates a JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  //console.log("Token", token);
  res.cookie("jwt", token, cookieOptions);
  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
////A function that calls the sendEmail function, which eventually sends the mail
const sendmail = async (res, user, url, subject, signUp) => {
  try {
    await new Email(user, url).sendWelcome();
    res.status(200).json({
      status: "success",
      message: subject,
    });
  } catch (err) {
    if (signUp) {
      await User.deleteOne({ _id: user._id });
    }
    res.status(400).json({
      status: "Failed to send mail, try again",
      message: err,
    });
  }
};

///// A function to filter the objects during profile update, In case the user request to update some unauthorized keys,
///// In that case that key will be eliminated
const filterobj = (options, ...filter) => {
  const newObj = {};
  Object.keys(options).forEach((el) => {
    if (filter.includes(el)) {
      newObj[el] = options[el];
    }
  });
  return newObj;
};

/////Creates a model in mongoose database as per the data given in signUP form
exports.signupcreate = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword,
    city: req.body.city,
  });

  //// Creates a verification Token which is later sent through mail, and also a copy of it is stored in user model for verification
  const verifyToken = user.verifytoken();
  await user.save({ validateBeforeSave: false });
  user.password = undefined;
  user.verifyToken = undefined;
  user.verified = undefined;
  const url = `${req.protocol}://${req.get(
    "host"
  )}/users/signup/${verifyToken}`;

  /////message contains a link that is sent to User's mail, cliking on the link will verify the mailID
  const subject = "Verification mail sent to your mailID, kindly verify it";
  sendmail(res, user, url, subject, true);
});

////To verify the MailID
exports.signupverified = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    verifyToken: req.params.token,
    verifyTokenExpires: { $gte: Date.now() },
  });
  if (!user) {
    return next(new AppError("Invalid Token or token expired", 400));
  }
  if (user.verified) {
    res.status(200).json({
      status: "success",
      message: "Verified",
    });
  }
  user.verified = true;
  User.verifyTokenExpires = undefined;
  await user.save({ validateBeforeSave: false });
  createSendToken(user, 200, res);
});

////To login
exports.login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  createSendToken(user, 200, res);
});

/////If the user forgets his password then a Reset Token is created which is sent to the mail
exports.passwordResetToken = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("Reset Token sent to your mail ID", 200));
  const resetToken = user.verifytoken();
  await user.save({ validateBeforeSave: false });
  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/users/passwordReset/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

/////On clicking the link, a page will open to create a new password
exports.passwordReset = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    verifyToken: req.params.id,
    verifyTokenExpires: { $gte: Date.now() },
  });
  if (!user)
    return next(new AppError("Try again, Invalid Token or token expired", 401));
  user.password = req.body.password;
  user.confirmpassword = req.body.confirmpassword;
  user.verifyTokenExpires = undefined;
  user.verifyToken = undefined;
  await user.save();
  res.status(201).json({
    status: "success",
    message: "Password Changed",
    data: {
      user,
    },
  });
});

///To update the password
exports.passwordUpdate = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req._id }).select("+password");
  const compare = await user.correctPassword(
    req.body.currentPassword,
    user.password
  );
  if (!compare) return next(new AppError("Current Password is Invalid", 400));
  if (req.body.currentPassword === req.body.password)
    return next(
      new AppError("Password should not be same as the old one", 400)
    );
  user.password = req.body.password;
  user.confirmpassword = req.body.confirmpassword;
  await user.save();
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    message: "Your Password has been reset,Please Login again",
    url: `${req.protocol}://${req.get("host")}/api/v1/users/login`,
    token,
  });
});

///To update the Profile, which includes certain given fields
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password)
    return next(
      new AppError("To change the password, go to update password", 401)
    );

  ///This function will eliminate the unauthorized fields
  const filteredobj = filterobj(req.body, "city", "name");
  //console.log("hey", filteredobj);
  const user = await User.findOneAndUpdate({ _id: req._id }, filteredobj, {
    runValidators: true,
    new: true,
  });
  res.status(201).json({
    status: "success",
    message: `Profile Updated`,
    data: {
      value: filteredobj,
    },
  });
});
