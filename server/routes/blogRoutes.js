const express = require("express");
const {
  postBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controller.js/blogController");
const router = express.Router();

router.get("/", getBlogs).post("/", postBlog);

router
  .get("/:id", getBlogById)
  .put("/:id", updateBlog)
  .delete("/:id", deleteBlog);

module.exports = router;
