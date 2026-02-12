import jwt from "jsonwebtoken";
import "dotenv/config";

const adminAuth = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden access",
      });
    }

    req.admin = decoded;

    next();

  } catch (error) {
    console.error("ADMIN AUTH ERROR:", error);

    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default adminAuth;
