require("dotenv").config();
const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const app = express();
const port = process.env.PORT || 3001;

connectDB();

app.use(express.json());

app.use("/", require("./routes/authRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
