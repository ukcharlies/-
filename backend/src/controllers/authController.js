const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000
});

const cookieName = process.env.COOKIE_NAME || "task_manager_token";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user._id);
  res.cookie(cookieName, token, getCookieOptions());

  return res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      email: user.email
    }
  });
});

const me = asyncHandler(async (req, res) => {
  return res.status(200).json({
    user: {
      id: req.user._id,
      email: req.user.email
    }
  });
});

const logout = asyncHandler(async (_req, res) => {
  res.clearCookie(cookieName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
  });
  return res.status(200).json({ message: "Logout successful" });
});

module.exports = {
  login,
  me,
  logout
};
