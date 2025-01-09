import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    todos: [
      {
        title: { type: String, required: true },
        description: { type: String},
        status: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", userSchema);

export default User;
