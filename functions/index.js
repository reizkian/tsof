/* D E P E N D E N C I E S   &   I N I T I A L I Z E */
const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const app = express();

const { signin, signup } = require("./handler/user");
const { createCourse } = require("./handler/course");
const { jwtEncodeAPI, jwtDecodeAPI } = require("./utils/jwt");
const { verifyEmail, checkEmailVerified } = require("./utils/smtp/verify_email");
app.use(cors());

/* R O U T E */
app.post("/signin", signin);
app.post("/signup", signup);
app.post("/create-course", createCourse);

app.post("/api/jwt-encode", jwtEncodeAPI);
app.post("/api/jwt-decode", jwtDecodeAPI);

app.get("/api/verify-email/:_id", verifyEmail);

/* E X P O R T S */
exports.app = functions.https.onRequest(app);
