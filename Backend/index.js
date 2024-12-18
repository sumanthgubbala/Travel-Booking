const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const tourRoute = require("./routes/tour.js");
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");
const reviewRoute = require("./routes/reviews.js");
const bookingRoute = require("./routes/booking.js");

const cookieParser = require('cookie-parser');


const dotenv = require("dotenv");

dotenv.config();
const corsOptions = {
  origin: true,
  credentials: true,
};



const app = express();
const port = process.env.PORT || 8000;
app.use(
  cors((
    corsOptions
  ))
);

app.use(express.json());

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err.message);
  }
};
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/tours", tourRoute);
app.use("/api/users", userRoute);
app.use("/api/review", reviewRoute);
app.use("/api/booking", bookingRoute);

app.listen(port, () => {
  connectDB();
  console.log("listening on port", port);
});
