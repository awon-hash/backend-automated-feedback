// Import necessary modules
const Feedback = require("../models/Feedback");

// Controller function to post feedback
const postFeedback = async (req, res) => {
  try {
    const newFeedback = await Feedback.create(req.body);
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to get all feedback
const getAllFeedback = async (req, res) => {
  try {
    const allFeedback = await Feedback.find();
    res.status(200).json(allFeedback);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to get feedback by teacher name
const getFeedbackByTeacherName = async (req, res) => {
  try {
    const feedbackByTeacher = await Feedback.find({
      teacherName: req.params.teacherName,
    });

    if (feedbackByTeacher.length === 0) {
      return res
        .status(404)
        .json({ message: "Feedback not found for this teacher" });
    }

    res.status(200).json(feedbackByTeacher);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export controller functions
module.exports = {
  postFeedback,
  getAllFeedback,
  getFeedbackByTeacherName,
};
