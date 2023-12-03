const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // Replace "Student" with your actual Student schema
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
