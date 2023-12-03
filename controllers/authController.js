// authController.js

import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15d" }
  );
};

export const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    phone,
    studentId,
    employeeId,
    adminId,
    subjectsTaught,
  } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create and save user based on the role
    let user;

    if (role === "student") {
      user = new User({
        name,
        email,
        password: hashPassword,
        role,
        phone,
        student: { studentId },
      });
    } else if (role === "teacher") {
      user = new User({
        name,
        email,
        password: hashPassword,
        role,
        teacher: { employeeId, subjectsTaught },
      });
    } else if (role === "admin") {
      user = new User({
        name,
        email,
        password: hashPassword,
        role,
        admin: { adminId },
      });
    }

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error! Try again" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check the user's role and retrieve from the appropriate collection
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const { password: userPassword, role, ...userData } = user._doc;

    // Get token
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Successfully logged in",
      token,
      data: userData,
      role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to log in" });
  }
};
