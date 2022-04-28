/* D E P E N D E N C I E S   &   I N I T I A L I Z E */
const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const app = express();

const { signin, signup } = require("./handler/authentication");
const {
  getUserPersonalData,
  updateUserPersonalData,
  deleteUser,
  getUserList,
} = require("./handler/user");
const { createCourse } = require("./handler/course");
const { getActiveClassList, registerClass } = require("./handler/class");
const { getGroupList } = require("./handler/group");
const { jwtEncodeAPI, jwtDecodeAPI } = require("./utils/jwt");
const { verifyEmail } = require("./utils/smtp/verify_email");

app.use(cors());

/* R O U T E */
app.post("/signin", signin);
app.post("/signup", signup);

app.get("/user/:_id", getUserPersonalData);
app.post("/user/:_id", updateUserPersonalData);
app.delete("/user/:_id", deleteUser);
app.post("/get-user-list", getUserList);

app.get("/class/get-active-class-list", getActiveClassList);
app.post("/class/register/:_id", registerClass);

app.post("/course/create-course", createCourse);

app.get("/group/get-group-list", getGroupList);

app.post("/api/jwt-encode", jwtEncodeAPI);
app.post("/api/jwt-decode", jwtDecodeAPI);

app.get("/api/verify-email/:_id", verifyEmail);

/* E X P O R T S */
exports.app = functions.https.onRequest(app);
