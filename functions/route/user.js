const express = require("express");
const router = express.Router();

const {
    getUserPersonalData,
    updateUserPersonalData,
    deleteUser,
    getUserList,
  } = require("../handler/user");

router.get("/user/:_id", getUserPersonalData);
router.post("/user/:_id", updateUserPersonalData);
router.delete("/user/:_id", deleteUser);
router.post("/get-user-list", getUserList);

module.exports = router