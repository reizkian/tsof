/* D E P E N D E N C I E S   &   I N I T I A L I Z E */
const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const app = express();

const {
  routeAuth,
  routeClass,
  routeCourse,
  routeGroup,
  routeLog,
  routeNotification,
  routeUser,
} = require("./route");

app.use(cors());

/* R O U T E */
app.use(routeAuth);
app.use(routeClass);
app.use(routeUser);
app.use(routeCourse);
app.use(routeGroup);
app.use(routeLog);
app.use(routeNotification);

/* E X P O R T S */
exports.app = functions.https.onRequest(app);
