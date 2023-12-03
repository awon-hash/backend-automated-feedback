import {
  adminAuth,
  patientAuth,
  authenticate,
  restrict,
} from "../auth/verifyToken.js";
import {
  deleteUser,
  getAllUser,
  getUserProfile,
  getSingleUser,
  updateUser,
  getMyAppointments,
} from "../controllers/userController.js";
import express from "express";

const router = express.Router();

// get all users
router.get("/", authenticate, adminAuth, getAllUser);
router.get("/:id", authenticate, patientAuth, getSingleUser);
router.put("/:id", authenticate, patientAuth, updateUser);
router.delete("/:id", authenticate, patientAuth, deleteUser);

router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile);
router.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["patient"]),
  getMyAppointments
);

export default router;
