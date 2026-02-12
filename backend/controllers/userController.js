import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
}

// Route for user login
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const emailLower = email.toLowerCase();

    // Find user
    const user = await userModel.findOne({ email: emailLower });

    // Same message for security
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate token
    const token = createToken(user._id);

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


// Route for user registration
const registerUser = async(req,res)=>{
   try{
    const { name, email, password } = req.body;
    // checking if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({success:false, message: "User already exists" });
    }
    // validating email format & strong password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({success:false, message: "Invalid email format" });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({success:false, message: "Password must be at least 8 characters long and contain both letters and numbers" });
    }
    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // creating new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = createToken(newUser._id);
    res.status(201).json({success:true, message: "User registered successfully", token });


   }catch(error){
    res.status(500).json({success:false, message: "Server error" });
   }
}

//Route for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid Admin Credentials",
      });
    }

    // Create proper payload
    const token = jwt.sign(
      {
        email,
        role: "admin",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

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


export { loginUser, registerUser, loginAdmin }