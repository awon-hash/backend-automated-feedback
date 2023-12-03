import jwt from "jsonwebtoken";
import UserSchema from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  // Get token from header
  const authToken = req.headers.authorization;

  // Check if token exists
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Token has expired" });
    }

    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const restrict = roles => async (req, res, next) => {
  const userId = req.userId;

  let user;
  // Check the user's role and retrieve from the appropriate collection
  const student = await UserSchema.findById(userId);
  const teacher = await UserSchema.findById(userId);
  const admin = await UserSchema.findById(userId);

  if (student) {
    user = student;
  } else if (teacher) {
    user = teacher;
  } else if (admin) {
    user = admin;
  }
  else {
    return res.status(404).json({ message: "User not found" });
  }

  if (!roles.includes(user.role)) {
    return res
      .status(401)
      .json({ success: false, message: "You're not authorized" });
  }

  next();
};

// Middleware to authenticate admin access
export const adminAuth = restrict(["admin"]);

// Middleware to restrict doctor access
export const studentAuth = restrict(["student"]);

// Middleware to restrict patient access
export const teacherAuth = restrict(["teacher", "admin"]);
