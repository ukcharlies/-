require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");

const seed = async () => {
  try {
    await connectDB();

    const email = "test@elonatech.com.ng";
    const password = "123456";

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Test user already exists");
      process.exit(0);
    }

    await User.create({ email, password });
    console.log("Test user created");
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed test user:", error.message);
    process.exit(1);
  }
};

seed();

