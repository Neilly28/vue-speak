const Teacher = require("../models/Teacher");

const router = require("express").Router();

// GET ALL TEACHERS
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET TEACHER
router.get("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
