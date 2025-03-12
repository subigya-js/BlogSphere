require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const app = express();
const port = process.env.PORT || 3001;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/", require("./routes/authRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
