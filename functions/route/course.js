const express = require("express");
const router = express.Router();

const { createCourse } = require("../handler/course");

router.post("/course/create-course", createCourse);

module.exports = router;