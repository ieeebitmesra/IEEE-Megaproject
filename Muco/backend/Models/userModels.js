const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const crypto = require("crypto");
const { verify } = require("jsonwebtoken");
const City = require("./cityModel");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide Your name"],
      // trim: true
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      validate: [validator.isEmail, "Provide Correct Email"],
    },
    work: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "A password should have minimum length of 8"],
      select: false,
    },
    confirmpassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not same",
      },
    },
    city: {
      type: String,
      require: [true, "Please provide your city name"],
      enum: {
        values: ["Ranchi", "Mumbai", "Delhi", "Chennai", "Pune"],
        message: "City should be Ranchi, Mumbai, Delhi, Chennai,or Pune ",
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    cityId: {
      type: mongoose.Schema.ObjectId,
      ref: "City",
    },
    likedPosts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
      },
    ],
    passwordChangedAt: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    verified: {
      type: Boolean,
      default: false,
      select: false,
    },
    profile: String,
    verifyToken: String,
    verifyTokenExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("yourPosts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});
// we area hashing
userSchema.pre("save", async function (next) {
  // console.log('hi i am in befor e hashing ');

  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmpassword = undefined;
  next();
});
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.cityId = (await City.findOne({ name: this.city }))._id;
    console.log("hello", this.city, this.cityId);
  }
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userSchema.pre("updateOne", function (next) {
  console.log(this.findOne);
});
////A middleware function to compare the time of issue of JWT
///If the issued time of Jwt is before the password is changed that implies the user will have to login again.
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

// we will create a new collection
userSchema.methods.verifytoken = function () {
  const verifytoken = crypto.randomBytes(32).toString("hex");
  this.verifyToken = verifytoken;
  this.verifyTokenExpires = Date.now() + 10 * 60 * 1000;
  return verifytoken;
};

////To compare password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
