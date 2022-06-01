const express = require("express");
const router = express.Router();

const { getLogActivity } = require("../handler/log");

router.get("/activity/get-log", getLogActivity);

module.exports = router;
