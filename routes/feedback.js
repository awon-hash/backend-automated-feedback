const express = require("express");
const feedbackController = require("../controllers/feedbackController");

const router = express.Router();

router.post("/post", feedbackController.postFeedback);
router.get("/get-all", feedbackController.getAllFeedback);
router.get(
  "/get-feedback/:teacherName",
  feedbackController.getFeedbackByTeacherName
);

module.exports = router;
