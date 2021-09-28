/* D E P E N D E N C I E S   &   I N I T I A L I Z E */
const functions = require("firebase-functions");
const express = require("express");
const app = express();

const { login, signup } = require("./handler/user")

/* R O U T E */
app.post("/login", login);
app.post("/signup", signup)

/* E X P O R T S */
exports.app = functions.https.onRequest(app)