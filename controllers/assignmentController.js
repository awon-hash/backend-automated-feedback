const Assignment = require("../models/Assignment");

// Controller function to get assignments by subject
const getAssignmentsBySubject = async (req, res) => {
  const { subject } = req.params;

  try {
    const assignments = await Assignment.find({ course: subject });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to get assignments by teacher
const getAssignmentsByTeacher = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const assignments = await Assignment.find({ createdBy: teacherId });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to post an assignment
const postAssignment = async (req, res) => {
  try {
    const newAssignment = await Assignment.create(req.body);
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export controller functions
module.exports = {
  getAssignmentsBySubject,
  getAssignmentsByTeacher,
  postAssignment,
};
