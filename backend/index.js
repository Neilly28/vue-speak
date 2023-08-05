const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const teacherRoute = require("./routes/teacher");

// configs
dotenv.config();
app.use(cors());
app.use(express.json());

// message for deployment
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from SpeakVue backend!",
  });
});

// routes
app.use("/api/teachers", teacherRoute);

// connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT || 5000, () => {
      console.log("SpeakVue server is listening at port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
