const mongoose = require("mongoose");
const Teacher = require("../models/Teacher");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher", // Reference to the Teacher model
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
