const express = require("express");
const router = express.Router();

router.route("/register").get((req, res) => {
  res.status(200).json({ message: "Register Route" });
});

module.exports = router;
