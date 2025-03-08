const dotenv = require("dotenv");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use("/", require("./routes/RegisterRoute"));
app.use("/", require("./routes/LoginRoute"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
