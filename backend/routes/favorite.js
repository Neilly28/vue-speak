const User = require("../models/User");
const Favorite = require("../models/Favorite");

const router = require("express").Router();

// TOGGLE FAVORITE TEACHERS
router.put("/:id/toggleFavorite/:teacherId", async (req, res) => {
  console.log("Toggling favorite for user");

  try {
    const userId = req.params.id;
    const teacherId = req.params.teacherId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favorite = await Favorite.findOne({
      user: user._id,
      teacher: teacherId,
    });

    if (favorite) {
      // Teacher is already a favorite, so remove them
      await Favorite.deleteOne({ _id: favorite._id });
      return res
        .status(200)
        .json({ message: "Teacher removed from favorites" });
    } else {
      // Teacher is not a favorite, so add them
      const newFavorite = new Favorite({
        user: user._id,
        teacher: teacherId,
      });
      await newFavorite.save();
      return res.status(200).json({ message: "Teacher added to favorites" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error toggling favorite" });
  }
});

// GET favorites FOR USER
router.get("/:id", async (req, res) => {
  console.log("hello from fav route");
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findById(userId);
    console.log(user);

    const favorites = await Favorite.find({ user: user._id }).populate(
      "teacher"
    );

    console.log(favorites);

    if (!favorites) {
      return res.status(404).json({ message: "Favorites not found" });
    }

    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user favorites" });
  }
});

module.exports = router;
