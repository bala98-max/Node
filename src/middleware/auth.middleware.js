const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization is missing",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Authentication error",
      error: err.message,
    });
  }
};

module.exports = authMiddleware;
