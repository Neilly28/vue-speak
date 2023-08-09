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

module.exports = router;
