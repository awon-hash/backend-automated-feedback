const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    files: [
      {
        filename: String,
        path: String,
      },
    ],
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
