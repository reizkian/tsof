const express = require("express");
const router = express.Router();

const {
    getUnReadNotifications,
    setReadedNotifications,
  } = require("../handler/notification");

router.get("/notifications/unread/:_id", getUnReadNotifications);
router.post("/notifications/setread/:_id", setReadedNotifications);

module.exports = router;
