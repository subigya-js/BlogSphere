const express = require("express");
const {
  postBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getUserBlogs,
} = require("../controller.js/blogController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router
  .get("/", getBlogs)
  .get("/users/:user_id", getUserBlogs)
  .post("/", validateToken, postBlog);

router
  .get("/:id", getBlogById)
  .put("/:id", validateToken, updateBlog)
  .delete("/:id", validateToken, deleteBlog);

module.exports = router;
