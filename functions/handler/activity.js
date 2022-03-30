const { firebaseDatabase } = require("../utils/admin");
const { getCompoundID } = require("../utils/method");

exports.logActivity = function(userID, timeStamp, method, severity, message) {
  // 1. generate logActivity id for each activity
  let activityCompoundID = getCompoundID(userID);
  // 2. get user classID
  return firebaseDatabase
    .ref("users/" + userID)
    .child("classID")
    .get()
    .then((readedData) => {
      const classID = readedData.val();
      // 3. define payload data for activity logging
      const payloadData = {
        timeStamp: timeStamp,
        userID: userID,
        classID: classID,
        method: method,
        severity: severity,
        message: message,
      };
      // 4. WRITE payload to activity
      firebaseDatabase
        .ref("activities/")
        .child(activityCompoundID)
        .set(payloadData)
        .then(() => {
          console.log("success write activity log");
        })
        .catch((err) => {
          console.log("internal server error, write database");
          console.log(err);
        });
    })
    .catch((err) => {
      console.log("internal server error, read database");
      console.log(err);
    });
};
