/* D E P E N D E N C I E S   &   I N I T I A L I Z E */
const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const app = express();

const { signin, signup } = require("./handler/user")
app.use(cors());

/* R O U T E */
app.post("/signin", signin);
app.post("/signup", signup);

/* E X P O R T S */
exports.app = functions.https.onRequest(app)