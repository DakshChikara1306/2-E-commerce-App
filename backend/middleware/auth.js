// ================== IMPORTS ==================

import jwt from "jsonwebtoken";


// ================== USER AUTH MIDDLEWARE ==================

const authUser = async (req, res, next) => {
  try {

    // ================== GET TOKEN ==================

    const { token } = req.headers;


    // ================== CHECK TOKEN ==================

    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });

    }


    // ================== VERIFY TOKEN ==================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );


    // ================== ATTACH USER ID ==================

    // Attach userId to request object
    req.userId = decoded.id;


    // ================== NEXT ==================

    next();

  } catch (error) {

    // ================== ERROR ==================

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};


// ================== EXPORT ==================

export default authUser;
