const asyncHandler = require("express-async-handler");
const Blog = require("../models/BlogModel");
require("dotenv").config();

// @desc POST a new blog
// @route POST /api/blogs
// @access Public
const postBlog = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Post a new blog" });
});

// @desc GET all blogs
// @route GET /api/blogs
// @access Public
const getBlogs = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all blogs" });
});

// @desc GET individual blog
// @route GET /api/blogs/:id
// @access Public
const getBlogById = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get individual blog" });
});

// @desc PUT a blog
// @route PUT /api/blogs/:id
// @access Public
const updateBlog = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update a blog" });
});

// @desc DELETE a blog
// @route DELETE /api/blogs/:id
// @access Public
const deleteBlog = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete a blog" });
});

module.exports = { postBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
