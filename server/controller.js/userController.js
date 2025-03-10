const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

// @desc Register a new user
// @route POST /register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create a user please try again.");
  }
});

// @desc Login a user
// @route POST /login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  //   const { email, password } = req.body;
  //   res.status(200).json({ email, password });
  res.json({ message: "Login a user" });
});

// @desc Current user
// @route GET /current
// @access Private
const currentUser = asyncHandler(async (req, res) => {
  //   res.status(200).json({ user: req.user });
  res.json({ message: "Current user" });
});

module.exports = { registerUser, loginUser, currentUser };
