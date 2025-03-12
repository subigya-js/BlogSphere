const asyncHandler = require("express-async-handler");
const Blog = require("../models/BlogModel");
require("dotenv").config();

// @desc POST a new blog
// @route POST /api/blogs
// @access Public
const postBlog = asyncHandler(async (req, res) => {
  const { author, title, content } = req.body;
  if (!author || !title || !content) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const newBlog = await Blog.create({
    author,
    title,
    content,
  });

  if (!newBlog) {
    res.status(400);
    throw new Error("Failed to create a blog please try again");
  }
  console.log("New Blog is: ", newBlog);

  res.status(201).json({ newBlog });
});

// @desc GET all blogs
// @route GET /api/blogs
// @access Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});

  if (!blogs) {
    res.status(404);
    throw new Error("No blogs found");
  }

  res.status(200).json({ blogs });
});

// @desc GET individual blog
// @route GET /api/blogs/:id
// @access Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  res.status(200).json({ blog });
});

// @desc PUT a blog
// @route PUT /api/blogs/:id
// @access Public
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ updatedBlog });
});

// @desc DELETE a blog
// @route DELETE /api/blogs/:id
// @access Public
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
  res.status(200).json({ deletedBlog });
});

module.exports = { postBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
