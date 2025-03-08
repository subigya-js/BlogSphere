const dotenv = require("dotenv");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("ExpressJS Backend for NextJS Application!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
