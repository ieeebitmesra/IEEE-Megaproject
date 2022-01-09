import { Schema, model, models } from 'mongoose';

const newsSchema = new Schema({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: String,
  },
  description: {
    type: String,
  }

}, { timestamps: true });
export default models.news || model('news', newsSchema);

