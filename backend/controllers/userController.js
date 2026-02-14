// ================== IMPORTS ==================

import bcrypt from "bcrypt";

import userModel from "../models/userModel.js";

import jwt from "jsonwebtoken";

import 'dotenv/config';


// ================== TOKEN GENERATOR ==================

const createToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1d' }
  );

};



// ================== LOGIN USER ==================

const loginUser = async (req, res) => {
  try {

    // ================== REQUEST DATA ==================

    const { email, password } = req.body;


    // ================== VALIDATION ==================

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });

    }


    const emailLower = email.toLowerCase();


    // ================== FIND USER ==================

    const user = await userModel.findOne({ email: emailLower });


    // Same message for security
    if (!user) {

      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });

    }


    // ================== PASSWORD CHECK ==================

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });

    }


    // ================== TOKEN ==================

    const token = createToken(user._id);


    // ================== RESPONSE ==================

    res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};



// ================== REGISTER USER ==================

const registerUser = async (req, res) => {
  try {

    // ================== REQUEST DATA ==================

    const { name, email, password } = req.body;


    // ================== CHECK EXISTING USER ==================

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User already exists"
      });

    }


    // ================== VALIDATION ==================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


    if (!emailRegex.test(email)) {

      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });

    }

    if (!passwordRegex.test(password)) {

      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and contain both letters and numbers"
      });

    }


    // ================== HASH PASSWORD ==================

    const hashedPassword = await bcrypt.hash(password, 10);


    // ================== CREATE USER ==================

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();


    // ================== TOKEN ==================

    const token = createToken(newUser._id);


    // ================== RESPONSE ==================

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};



// ================== ADMIN LOGIN ==================

const loginAdmin = async (req, res) => {
  try {

    // ================== REQUEST DATA ==================

    const { email, password } = req.body;


    // ================== VALIDATION ==================

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {

      return res.status(401).json({
        success: false,
        message: "Invalid Admin Credentials",
      });

    }


    // ================== TOKEN ==================

    const token = jwt.sign(
      {
        email,
        role: "admin",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );


    // ================== RESPONSE ==================

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      data: {
        token,
      },
    });

  } catch (error) {

    console.error("ADMIN LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ================== EXPORTS ==================

export {
  loginUser,
  registerUser,
  loginAdmin
};
