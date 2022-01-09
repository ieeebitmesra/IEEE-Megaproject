import { Schema, model, models } from 'mongoose';

const confessionSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      max: 500,
    },
    upvotes: {
      type: Array,
      unique:true,
      default: [],
    },
    downvotes: {
      type: Array,
      default: [],
      unique: true,

    },
  },
  { timestamps: true }
);

export default models.confession || model('confession', confessionSchema);
