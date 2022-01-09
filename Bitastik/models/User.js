import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    // password: {
    //   type: String,
    //   required: true,
    //   min: 6,
    // },
    // profilePicture: {
    //   type: String,
    //   default: "",
    // },
    // coverPicture: {
    //   type: String,
    //   default: "",
    // },
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
    // desc: {
    //   type: String,
    //   max: 50,
    // },
    // branch: {
    //   type: String,
    //   required: true,
    // },
    // yearofgraduation: {
    //   type: Number,
    //   required: true,
    // },
  },
);

export default models.User || model('User', userSchema);
