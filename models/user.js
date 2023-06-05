import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exisst"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    unique: [true, "username already exisst"],
    required: [true, "username is required"],
    image: {
      type: String,
    },
  },
});

const User = models.User || model("User", userSchema);

export default User;
