const express = require("express");
const router = express.Router();

const { getGroupList } = require("../handler/group");

router.get("/group/get-group-list", getGroupList);

module.exports = router;
