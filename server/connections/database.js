const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
};
