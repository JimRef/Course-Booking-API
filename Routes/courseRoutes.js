const express = require("express");
const router = express.Router();
const courseController = require("../Controllers/courseController");
const auth = require("../auth.js");

// [ROUTE WITHOUT PARAMS]

// Route for creating a course
router.post("/", auth.verify,courseController.addCourse);
// Route for retrieving all courses
router.get("/all", auth.verify, courseController.allCourses);
// Route for retrieving all active courses
router.get("/allActive", courseController.allActiveCourses);
// router for retrieving  inactive courses
router.get("/allInactive", auth.verify, courseController.allInactiveCourses)


// [ROUTE WITH PARAMS]

// Route for retrieving details of specific course
router.get("/:courseId", courseController.courseDetails);

router.put("/update/:courseId", auth.verify, courseController.updateCourse)

router.patch("/archive/:courseId", auth.verify, courseController.archiveCourse)


module.exports = router;