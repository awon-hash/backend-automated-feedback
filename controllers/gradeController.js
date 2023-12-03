const Grade = require("../models/Grade");

// Controller function to get grades by student ID
const getGradesByStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const grades = await Grade.find({ student: studentId });
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to get grades by subject ID
const getGradesBySubject = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const grades = await Grade.find({ course: subjectId });
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to post a grade
const postGrade = async (req, res) => {
  try {
    const newGrade = await Grade.create(req.body);
    res.status(201).json(newGrade);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export controller functions
module.exports = {
  getGradesByStudent,
  getGradesBySubject,
  postGrade,
};
