const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Token validation middleware
const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401);
      throw new Error("Authorization token is missing.");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("Decoded User:", decoded);
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Invalid token or user is not authorized.");
    }
  } else {
    res.status(401);
    throw new Error("Authorization header is missing or invalid.");
  }
});

module.exports = validateToken;
