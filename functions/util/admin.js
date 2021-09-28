const admin = require("firebase-admin");
admin.initializeApp();

/* D A T A  B A S E */
const realTimeDataBase = admin.database();

module.exports = { admin, realTimeDataBase}