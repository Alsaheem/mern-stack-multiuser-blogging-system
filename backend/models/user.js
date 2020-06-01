const mongoose = require(`mongoose`);
const crypto = require(`crypto`);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      max: 32,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      max: 32,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    profile: {
      type: string,
      required: true,
    },
    password: {
      type: String,
      minlength: 7,
      required: true,
    },
    salt: Number,
    about: {
      type: String,
    },
    role: {
      type: String,
      trim: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamp: true }
);

const User = mongoose.model("User", userSchema);


module.exports = User;
