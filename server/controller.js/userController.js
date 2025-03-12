const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const user = await User.findOne({ email });

  // Compare password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      }),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @desc Current user
// @route GET /current
// @access Private
const currentUser = asyncHandler(async (req, res) => {
  //   res.status(200).json({ user: req.user });
  const { name, email } = req.user;
  // res.status(200).json({ name, email });
  res.json({ message: "Current user" });
});

module.exports = { registerUser, loginUser, currentUser };
