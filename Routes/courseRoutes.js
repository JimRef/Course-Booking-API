const express = require("express");
const router = express.Router();
const courseController = require("../Controllers/courseController");
const auth = require("../auth.js");

// Route for creating a course
router.post("/", auth.verify,courseController.addCourse);



module.exports = router;