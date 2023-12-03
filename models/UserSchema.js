import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
});

const TeacherSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  subjectsTaught: [String],
});

const AdminSchema = new mongoose.Schema({
  adminId: { type: String, required: true, unique: true },
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  role: {
    type: String,
    enum: ["student", "admin", "teacher"],
    default: "student",
  },
  student: StudentSchema,
  teacher: TeacherSchema,
  admin: AdminSchema,
});

export default mongoose.model("User", UserSchema);
