const express = require("express");
const router = express.Router();

const {
    getClassList,
    getActiveClassList,
    registerClass,
  } = require("../handler/class");

router.get("/class", getClassList);
router.get("/class/get-active-class-list", getActiveClassList);
router.post("/class/register/:_id", registerClass);

module.exports = router;