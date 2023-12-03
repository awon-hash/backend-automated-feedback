const express = require("express");
const assignmentController = require("../controllers/assignmentController");

const router = express.Router();

router.get(
  "/subject/:subject",
  assignmentController.getAssignmentsBySubject
);

router.get(
  "/teacher/:teacherId",
  assignmentController.getAssignmentsByTeacher
);

router.post("/post-assignment", assignmentController.postAssignment);

module.exports = router;
