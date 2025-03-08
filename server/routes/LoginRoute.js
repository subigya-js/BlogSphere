const express = require("express");
const router = express.Router();

router.route("/login").get((req, res) => {
  res.status(200).json({ message: "Login Route" });
});

module.exports = router;
