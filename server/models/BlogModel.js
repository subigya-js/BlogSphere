const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    author: {
      type: {
        name: String,
        email: String,
      },
      required: [true, "Please add the author information."],
    },
    title: {
      type: String,
      required: [true, "Please add the blog title."],
    },
    content: {
      type: String,
      required: [true, "Please add the blog content."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", BlogSchema);
