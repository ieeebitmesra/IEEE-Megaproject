const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A city must have a name"],
      unique: [true, "name must be unique"],
      enum: {
        values: ["Ranchi", "Mumbai", "Delhi", "Chennai", "Pune"],
        message: "City should be Ranchi, Mumbai, Delhi, Chennai,or Pune ",
      },
    },
    state: {
      type: String,
      required: [true, "A state must have a name"],
      maxlength: [20, "length of state name should not be more than 20"],
      minlength: [2, "state name should at least be more than 2"],
    },
    averageRating: {
      type: Number,
      min: [1, "Minimum rating should be one"],
      max: [5, "Maximum rating should be 5"],
      default: 4.5,
    },
    numberRating: Number,
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      discription: String,
    },
    admin: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    password: {
      type: String,
      minlength: [8, "Minimum length of password should be 8"],
      required: true,
    },
    image: [String],
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
citySchema.virtual("reviews", {
  ref: "Review",
  foreignField: "city",
  localField: "_id",
});

citySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
citySchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const City = mongoose.model("City", citySchema);
module.exports = City;
