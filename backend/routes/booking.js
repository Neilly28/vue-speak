const Booking = require("../models/Booking");

const router = require("express").Router();

// CREATE A NEW BOOKING
router.post("/", async (req, res) => {
  try {
    const { teacherId, userId, selectedTime } = req.body;

    const booking = new Booking({
      teacher: teacherId,
      user: userId,
      date: selectedTime,
    });

    const savedBooking = await booking.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking" });
  }
});

// GET BOOKINGS FOR USER
router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const bookings = await Booking.find({ user: userId }).populate("teacher");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user bookings" });
  }
});

// GET ALL BOOKINGS
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET BOOKINGS FOR SPECIFIC TEACHER
router.get("/teacher/:id", async (req, res) => {
  try {
    const teacherId = req.params.id;

    // Validate and sanitize teacherId here if needed

    const bookings = await Booking.find({ teacher: teacherId });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error retrieving teacher bookings:", error);
    res.status(500).json({ message: "Error retrieving teacher bookings" });
  }
});

module.exports = router;
