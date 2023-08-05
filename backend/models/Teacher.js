const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    professional: { type: Boolean, required: true },
    language: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    about: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
