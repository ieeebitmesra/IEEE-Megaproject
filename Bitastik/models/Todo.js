import { Schema, model, models } from 'mongoose';

const todoSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      max: 25,
    },
    note: {
      type: String,
      max: 100,
    },
  }
);

export default models.todolist || model('todolist', todoSchema);
