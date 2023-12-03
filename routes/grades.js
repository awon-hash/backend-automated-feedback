const express = require("express");
const gradeController = require("../controllers/gradeController");

// Create an Express router
const router = express.Router();

// GET route to retrieve grades by student ID
router.get("/student/:studentId", gradeController.getGradesByStudent);

// GET route to retrieve grades by subject ID
router.get("/subject/:subjectId", gradeController.getGradesBySubject);

// POST route to create a new grade
router.post("/post", gradeController.postGrade);

// Export the router
module.exports = router;
