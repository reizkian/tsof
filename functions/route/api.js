const express = require("express");
const router = express.Router();

const { jwtEncodeAPI, jwtDecodeAPI } = require("../utils/jwt");
const { verifyEmail } = require("../utils/smtp/verify_email");

router.post("/api/jwt-encode", jwtEncodeAPI);
router.post("/api/jwt-decode", jwtDecodeAPI);
router.get("/api/verify-email/:_id", verifyEmail);

module.exports = router;
