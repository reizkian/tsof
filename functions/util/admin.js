const admin = require("firebase-admin");
admin.initializeApp({
    databaseURL: "https://the-school-of-fire.firebaseio.com/"
});

/* D A T A  B A S E */
const realTimeDataBase = admin.database();

module.exports = { admin, realTimeDataBase}