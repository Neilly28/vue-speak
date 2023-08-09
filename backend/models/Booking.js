const mongoose = require("mongoose");
const Teacher = require("../models/Teacher");
const User = require("../models/User");

const bookingSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher", // Reference to the Teacher model (teacher)
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model (student)
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
