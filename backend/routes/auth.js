const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/User");

// SIGN UP NEW USER
router.post("/signup", async (req, res) => {
  try {
    // capture username and password from req body
    const { username, password } = req.body;

    // find user in db
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // apply hashing and salt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, password: hashedPassword });

    // save the new user to db
    const savedUser = await newUser.save();

    // generate jwt for new user
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    // Return the user and the token to the client
    res.status(201).json({
      token,
      userId: savedUser._id,
      username: savedUser.username,
      favorites: savedUser.favorites,
    });
  } catch (err) {
    console.log("hello from new user");
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    // capture username and password from req body
    const { username, password } = req.body;

    // find a user in db
    const user = await User.findOne({ username }).populate("favorites");
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate jwt for new user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    // send back token and userid to client
    res.status(200).json({
      token,
      userId: user._id,
      username: user.username,
      favorites: user.favorites,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
