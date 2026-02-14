// ================== IMPORTS ==================

import jwt from "jsonwebtoken";

import "dotenv/config";


// ================== ADMIN AUTH MIDDLEWARE ==================

const adminAuth = (req, res, next) => {
  try {

    // ================== GET AUTH HEADER ==================

    const authHeader = req.headers.authorization;


    // ================== CHECK TOKEN EXIST ==================

    if (!authHeader || !authHeader.startsWith("Bearer ")) {

      return res.status(401).json({
        success: false,
        message: "No token provided",
      });

    }


    // ================== EXTRACT TOKEN ==================

    const token = authHeader.split(" ")[1];


    // ================== VERIFY TOKEN ==================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );


    // ================== CHECK ADMIN ROLE ==================

    if (decoded.role !== "admin") {

      return res.status(403).json({
        success: false,
        message: "Forbidden access",
      });

    }


    // ================== ATTACH ADMIN DATA ==================

    req.admin = decoded;


    // ================== NEXT ==================

    next();

  } catch (error) {

    console.error("ADMIN AUTH ERROR:", error);


    // ================== ERROR RESPONSE ==================

    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};


// ================== EXPORT ==================

export default adminAuth;
