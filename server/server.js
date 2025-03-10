const dotenv = require("dotenv");
const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/", require("./routes/authRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
